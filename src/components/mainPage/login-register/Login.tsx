import React, { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
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

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const[errorMessage, setErrorMessage] = useState<string | null>(null);
  const[isError, setIsError] = useState<boolean>(false);
  const[isLoading, setIsLoading] = useState<boolean>(false);

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
      navigate('/home');
      window.location.reload();
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
        onClick={async () => await handleLogin()}
        disabled={isLoading}
      >
        { isLoading ? <Loader /> : "Login" }
      </LoginButton>
      <HelpButtons>
        <RegisteredButton onClick={() => navigate("/verify/restore-password")}>
          Forgot password?
        </RegisteredButton>
        <RegisteredButton onClick={() => navigate('/register')}>Not register?</RegisteredButton>
      </HelpButtons>
    </LoginCard>
  );
};