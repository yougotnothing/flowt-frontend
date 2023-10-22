import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { api } from "../../../api/axiosConfig";

import { putEmailSchema } from "../../../validation/yup.config";
import { Loader } from "../../loader/Loader";
import { 
  LoginInput, 
  LoginButton, 
  LoginCard, 
  LoginHeader, 
  Span, 
  RegisteredButton,
  ValidationSpan,
  InputContainer
} from "./Login.register.styled";
import { URLS } from "../../../constants/urls.const";

export const PutEmail: React.FC = () => {
  const[validationError, setValidationError] = useState<string | null>(null);
  const[isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = new URLS();

  const formik = useFormik<{
    email: string
  }>({
    initialValues: {
      email: ""
    },
    validationSchema: putEmailSchema,
    onSubmit: () => {}
  });

  const handlePutEmail = async () => {
    setIsLoading(true);
    try {
      await api.post(url.restore_pass, { email: formik.values.email });
      localStorage.setItem('email', formik.values.email);
      setTimeout(() => navigate(url.put_email), 300);
    }catch(e) {
      setValidationError('Email invalid');
      setIsLoading(false);
    }
  };

  const emailError = (
    formik.errors.email && formik.touched.email && <ValidationSpan>{formik.errors.email}</ValidationSpan>
  );
      
  return (
    <LoginCard>
      <LoginHeader>Enter <Span>email</Span></LoginHeader>
      <InputContainer>
        <LoginInput
          name="email"
          placeholder="Enter email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <ValidationSpan>{emailError}</ValidationSpan>
        <ValidationSpan>{validationError}</ValidationSpan>
      </InputContainer>
      <LoginButton 
        onClick={handlePutEmail}
        disabled={isLoading}
      >
        { isLoading ? <Loader /> : "Send email" }
      </LoginButton>
      <RegisteredButton>Go back</RegisteredButton>
    </LoginCard>
  )
}
