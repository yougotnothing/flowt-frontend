import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LoginHeader, 
  LoginButton, 
  LoginCard, 
  LoginInput, 
  Span, 
  ValidationSpan,
  RegisteredButton,
  HelpButtons,
  InputContainer } from "./login.register.styled";
import { Loader } from "../../loader/loader";
import { login } from "../../../api/axiosConfig";

export const Login = () => {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState(null);
    const[isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
      const loginDto: { username: string, password: string } = {
        username: username,
        password: password
      }

      try {
        await login(loginDto);
        setErrorMessage(null);
        setIsLoading(true);
        setTimeout(() => navigate("/home"), 300);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    }

    return (
      <LoginCard>
        <LoginHeader>Welcome<Span>!</Span></LoginHeader>
        <InputContainer>
        <LoginInput
          name="username"
          type="username"
          placeholder="username"
          onChange={(e: any) => setUsername(e.target.value)}
          />
        <LoginInput
          name="password"
          type="password"
          placeholder="password"
          onChange={(e: any) => setPassword(e.target.value)} 
          />
          { errorMessage && <ValidationSpan>{errorMessage}</ValidationSpan> }
        </InputContainer>
        <LoginButton
          onClick={handleLogin}
          disabled={isLoading}
          >
          { isLoading ? <Loader /> :  "register" }
        </LoginButton>
        <HelpButtons>
          <RegisteredButton 
            onClick={() => navigate("/login/restore-password")}
          >
            Forgot password?
          </RegisteredButton>
          <RegisteredButton>Not register?</RegisteredButton>
        </HelpButtons>
      </LoginCard>
    );
};