import { useMutation } from '@tanstack/react-query';

type RegistrationFormValues = {
  username: string;
  email: string;
  password: string;
};

type LoginFormValues = {
  username: string;
  password: string;
};

const BASE_URL = 'http://localhost:8080';

const registration = async (registerDto: RegistrationFormValues) => {
  console.log('sign up service');
  const response = await fetch(`${BASE_URL}/auth/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerDto)
  });
  console.log('sign up res', response);
  const responseData = await response.json();

  return responseData;
};

const login = async (loginDto: LoginFormValues) => {
  console.log('sign in service');
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginDto)
  });
  console.log('sign in service res', response);
  const responseData = await response.json();
  console.log('res data', responseData);
  return responseData;
};

export const useRegistration = () => useMutation(registration);
export const useLogin = () => useMutation(login);