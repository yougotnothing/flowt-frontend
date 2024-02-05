import { FC, useState, useEffect } from "react";
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
import { login } from "../../../api/axiosConfig";
import { FacebookButton, GoogleButton } from "../../OAuth2/OAuthButtons";
import { OAuthButtonsContainer } from "../../OAuth2/OAuthButtons.styled";
import { observer } from "mobx-react-lite";
import { OAuth } from "../../../stores/toOAuthButtons.mobx";
import { user as $ } from "../../../stores/toUser.mobx";
import { ILoginDTO } from "./types";
import { Title as Helmet } from "../../../helmet";

export const Login: FC = observer(() => {
  const navigate = useNavigate();
  const[errorMessage, setErrorMessage] = useState<string>('');
  const[isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if(!$.isUserAuthenticated && window.location.pathname === '/login') {
      return;
    }else if(!$.isUserAuthenticated && window.location.pathname === '/register') {
      return;
    }else{
      navigate('/login');
    }
  }, [$.isUserAuthenticated, window.location.pathname]);

  useEffect(() => {
    OAuth.setWhereUsing('Sign in');
  }, []);

  useEffect(() => {
    if($.isUserAuthenticated) {
      navigate('/home');
    }
  }, [$.isUserAuthenticated]);

  const formik = useFormik<{
    login: string,
    password: string
  }>({
    initialValues: {
      login: "",
      password: ""
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {}
  });
  const touched = formik.touched;
  const errors = formik.errors;

  const handleLogin = async () => {
    const loginDto: ILoginDTO = formik.values;
    await login(loginDto, navigate, setErrorMessage);
  }

  return (
    <LoginCard>
      <Helmet title="Login" />
      <LoginHeader>Welcome<Span>!</Span></LoginHeader>
      <InputContainer>
      <LoginInput
        name="login"
        type="username"
        placeholder="username"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {errors.login && touched.login && <ValidationSpan>{errors.login}</ValidationSpan>}
      <LoginInput
        name="password"
        type="password"
        placeholder="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {errors.password && touched.password && <ValidationSpan>{errors.password}</ValidationSpan>}
      {errorMessage && <ValidationSpan>{errorMessage}</ValidationSpan>}
      </InputContainer>
      <LoginButton onClick={handleLogin} disabled={isLoading}>
        {isLoading ? <Loader /> : "Login"}
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