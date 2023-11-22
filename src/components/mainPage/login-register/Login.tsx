import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {
  LoginHeader, 
  LoginButton, 
  LoginCard, 
  LoginInput, 
  Span, 
  ValidationSpan,
  RegisteredButton,
  HelpButtons,
  InputContainer 
} from "./Login.register.styled";
import { loginValidationSchema } from "../../../validation/yup.config";
import { Loader } from "../../loader/Loader";
import { api, login } from "../../../api/axiosConfig";
import { FacebookButton, GoogleButton } from "../../OAuth2/OAuthButtons";
import { OAuthButtonsContainer } from "../../OAuth2/OAuthButtons.styled";
import { useUserContext } from "../../../contexts/UserContext";
import { observer } from "mobx-react-lite";
import { OAuth } from "../../../stores/toOAuthButtons.mobx";
import { userAvatarStore } from "../../../stores/toChangeAvatar.mobx";

export const Login: React.FC = observer(() => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const[errorMessage, setErrorMessage] = useState<string | null>(null);
  const[isError, setIsError] = useState<boolean>(false);
  const[isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if(!user && window.location.pathname === '/login') {
      return;
    }else if(!user && window.location.pathname === '/register') {
      return;
    }else{
      navigate('/login');
    }
  }, [user, window.location.pathname]);

  useEffect(() => {
    if(OAuth.backendData?.imageUrl) {
      localStorage.setItem('Google image', OAuth.backendData.imageUrl);
    }
  }, []);

  useEffect(() => {
    OAuth.setWhereUsing('Sign in');
  }, []);

  useEffect(() => {
    if(user) {
      navigate('/home');
    }
  }, [user]);

  const formik = useFormik<{
    username: string,
    password: string
  }>({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {}
  });
  const field = formik.values;
  const touched = formik.touched;
  const errors = formik.errors;

  async function handleLogin() {
    const loginDto: { username: string, password: string } = {
      username: field.username,
      password: field.password
    }

    try {
      setIsError(false);
      setIsLoading(true);
      setErrorMessage(null);
      await login(loginDto);
      window.location.reload();
      navigate('/home');
    }catch(error: any) {
      setIsLoading(false);
      setIsError(true);
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
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {errors.username && touched.username ? <ValidationSpan>{errors.username}</ValidationSpan> : null}
      <LoginInput
        name="password"
        type="password"
        placeholder="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {errors.password && touched.password ? <ValidationSpan>{errors.password}</ValidationSpan> : null}
      {errorMessage && <ValidationSpan>{errorMessage}</ValidationSpan>}
      </InputContainer>
      <LoginButton
        onClick={async () => {
          await handleLogin();
        }}
        disabled={isLoading}
      >
        { isLoading ? <Loader /> : "Login" }
      </LoginButton>
      <OAuthButtonsContainer>
        <GoogleButton />
        <FacebookButton />
      </OAuthButtonsContainer>
      <HelpButtons>
        <RegisteredButton onClick={() => navigate("/verify/restore-password")}>
          Forgot password?
        </RegisteredButton>
        <RegisteredButton onClick={() => navigate('/register')}>Not register?</RegisteredButton>
      </HelpButtons>
    </LoginCard>
  );
});