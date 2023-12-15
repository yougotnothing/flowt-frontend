import React, { useState, useEffect } from "react";
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
import { OAuthButtonsContainer } from "../../OAuth2/OAuthButtons.styled";
import { FacebookButton, GoogleButton } from "../../OAuth2/OAuthButtons";
import { observer } from "mobx-react-lite";
import { OAuth } from "../../../stores/toOAuthButtons.mobx";

export const Register: React.FC = observer(() => { 
  const[isLoading, setIsLoading] = useState(false);
  const[usernameError, setUsernameError] = useState(false);
  const[emailError, setEmailError] = useState(false);
  const[passwordError, setPasswordError] = useState(false);
  const[errorMessage, setErrorMessage] = useState<any>(null);
  const navigate = useNavigate();
  
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

  useEffect(() => {
    OAuth.setWhereUsing('Sign up');

    if(OAuth.email) {
      formik.setFieldValue("email", OAuth.email);
    }
  }, [OAuth.email]);

  const field = formik.values;
  const errors = formik.errors;
  const touched = formik.touched;

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
    }catch(error: any) {
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
        {errors.username && touched.username ? <ValidationSpan>{errors.username}</ValidationSpan> : null}
        { errorMessage && usernameError && <ValidationSpan>{errorMessage}</ValidationSpan> }
        <LoginInput
          name="email"
          placeholder="email"
          defaultValue={field.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {errors.email && touched.email ? <ValidationSpan>{errors.email}</ValidationSpan> : null}
        { errorMessage && emailError && <ValidationSpan>{errorMessage}</ValidationSpan> }
        <LoginInput
          name="password"
          type="password"
          placeholder="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {errors.password && touched.password ? <ValidationSpan>{errors.password}</ValidationSpan> : null}
        { errorMessage && passwordError && <ValidationSpan>{errorMessage}</ValidationSpan> }
        <LoginInput
          name="confirmPassword"
          type="password"
          placeholder="confirm password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {errors.confirmPassword && touched.password ? <ValidationSpan>{errors.confirmPassword}</ValidationSpan> : null}
      </InputContainer>
      <LoginButton
        onClick={async () => await handleRegister()}
        disabled={isLoading}
      >
        { isLoading ? <Loader /> : "register" }
      </LoginButton>
      <OAuthButtonsContainer>
        <GoogleButton />
        <FacebookButton />
      </OAuthButtonsContainer>
      <RegisteredButton>Registered?</RegisteredButton>
    </LoginCard>
  );
});