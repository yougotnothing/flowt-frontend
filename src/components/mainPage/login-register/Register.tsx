import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
  LoginCard, 
  LoginButton, 
  LoginHeader, 
  LoginInput, 
  RegisteredButton, 
  Span,
  ValidationSpan,
  InputContainer
} from "./Login.register.styled";
import { useFormik } from "formik";
import { registrationValidationSchema } from "../../../validation/yup.config";
import { Loader } from "../../loader/Loader";
import { api, registration } from "../../../api/axiosConfig";

export const Register: React.FC = () => { 
  const navigate = useNavigate();
  const[isLoading, setIsLoading] = useState(false);
  const[usernameError, setUsernameError] = useState(false);
  const[emailError, setEmailError] = useState(false);
  const[passwordError, setPasswordError] = useState(false);
  const[errorMessage, setErrorMessage] = useState<any>(null);

  const formik = useFormik<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string
  }>({
    initialValues:{
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: registrationValidationSchema,
    onSubmit: () => {}
  });
  const field = formik.values;

  async function handleRegister() {
    const registerDto: any = {
      username: field.username,
      email: field.email,
      password: field.password,
      confirmPassword: field.confirmPassword
    }

    setIsLoading(true);

    try {
      await registration(registerDto);
      navigate("/login");
      setErrorMessage(null);
    } catch (error: any) {
      const field = error.response.data.field;

      setIsLoading(false);
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
      setErrorMessage(error.response.data.message);

      switch(field) {
        case "username":
          setUsernameError(true);
          break;
        case "email":
          setEmailError(true);
          break;
        case "password":
          setPasswordError(true);
          break;
      }
    }
  }

    return (
      <LoginCard>
        <LoginHeader>Welcome<Span>!</Span></LoginHeader>
        <InputContainer>
          <LoginInput
            name="username" 
            placeholder="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          { formik.errors.username && formik.touched.username ? (
             <ValidationSpan>{formik.errors.username}</ValidationSpan>
           ) : null }
          { errorMessage && usernameError && <ValidationSpan>{errorMessage}</ValidationSpan> }
          <LoginInput
            name="email"
            placeholder="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          { formik.errors.email && formik.touched.email ? (
             <ValidationSpan>{formik.errors.email}</ValidationSpan>
           ) : null }
          { errorMessage && emailError && <ValidationSpan>{errorMessage}</ValidationSpan> }
          <LoginInput
            name="password"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          { formik.errors.password && formik.touched.password ? (
             <ValidationSpan>{formik.errors.password}</ValidationSpan>
           ) : null }
          { errorMessage && passwordError && <ValidationSpan>{errorMessage}</ValidationSpan> }
          <LoginInput
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmPassword && formik.touched.password ? (
            <ValidationSpan>{formik.errors.confirmPassword}</ValidationSpan>
          ) : null}
        </InputContainer>
        <LoginButton
          onClick={() => handleRegister()}
          disabled={isLoading}
        >
          { isLoading ? <Loader /> : "register" }
        </LoginButton>
        <RegisteredButton>Registered?</RegisteredButton>
      </LoginCard>
    );
};