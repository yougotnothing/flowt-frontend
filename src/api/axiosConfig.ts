import axios from "axios";
 
export const API_URL = 'http://localhost:8080';
let isRetry = false;
 
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});
 
api.interceptors.request.use((config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = API_URL;
    return config;
}));
 
api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            if (!isRetry && !originalRequest.url.includes('/auth/')) {
                isRetry = true;
                try {
                    await refreshToken();
                    return api.request(originalRequest);
                } catch (e) {
                    console.log(error.response.data);
                    throw error;
                }
            } else if (originalRequest.url.includes('/auth/')) {
                return Promise.reject(error);
            }
            throw error;
        }
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
 
export const login = async (loginDto: any) => {
    const response = await api.post('/auth/login', {
        username: loginDto.username,
        password: loginDto.password
    });
    console.log(response.data);
    if (response) {
        const json = response.data;
        const token = json.token;
        console.log(token);
        localStorage.setItem('token', token);
    }
}
 
export const refreshToken = async () => {
    const response = await api.get('/auth/refresh');
    if (response) {
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
 
export const getUser = async () => await api.get('/secured/auth');
 
export default api;