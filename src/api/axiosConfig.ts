import axios from "axios";
import { user } from "../stores/toUser.mobx";
import { NavigateFunction } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { LoginDto, SetState } from "../types/props";

export const API_URL = process.env.REACT_APP_API_URL;
let failedRequestsQueue: any = [];
let isRefreshing = false;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.request.use((config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  config.headers['Access-Control-Allow-Origin'] = API_URL;
  return config;
}));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
  const originalRequest = error.config;

  if(error.response.status === 401 && error.response.data === 'Token not found') return Promise.reject(error);

  if(error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/')) {
    if(isRefreshing) {
      return new Promise((resolve: any) => {
        failedRequestsQueue.push(() => {
          originalRequest._retry = true;
          resolve(api(originalRequest));
        });
      });
    }

      isRefreshing = true;

      await refreshToken();

      isRefreshing = false;

      failedRequestsQueue.forEach((callback: any) => callback());
      failedRequestsQueue = [];

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const registration = async (registerDto: any) => {
  const response = await api.post('/auth/registration', {
    username: registerDto.username,
    email: registerDto.email,
    password: registerDto.password,
    confirmPassword: registerDto.confirmPassword
  });
  console.log(response.data);
}

export const login = async (loginDto: LoginDto, navigate: NavigateFunction, set?: SetState<string>) => {
  try {
    const response = await api.post('/auth/login', {
      login: loginDto.login,
      password: loginDto.password
    });
    
    if(response) {
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      await user.setUser();
      navigate('/home');
      console.log(user);
      set && set('');
    }

    console.log(response.data);
  }catch(error: any) {
    set && set('incorrect login or password');
    console.log(error);
  }
}

export const refreshToken = async () => {
  const response = await api.get('/auth/refresh');
  if(response) {
    const json = response.data;
    const token = json.token;
    console.log(token);
    localStorage.setItem('token', token);
  }
}

export const verifyEmail = async (code: any) => {
  const response = await api.get('/verify', {
    params: {
      code: code
    }
  });
  return response;
}