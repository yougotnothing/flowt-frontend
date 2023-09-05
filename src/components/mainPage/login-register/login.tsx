import { useState } from "react";
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
} from "./login.register.styled";
import { loginValidationSchema } from "../../../validation/yup.config";
import { Loader } from "../../loader/loader";
import { login } from "../../../api/axiosConfig";

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const[errorMessage, setErrorMessage] = useState(null);
    const[isLoading, setIsLoading] = useState(false);

    const formik = useFormik<{
      username: "",
      password: ""
    }>({
      initialValues: {
        username: "",
        password: ""
      },
      validationSchema: loginValidationSchema,
      onSubmit: () => {}
    });
    const field = formik.values;

    async function handleLogin() {
      const loginDto: { username: string, password: string } = {
        username: field.username,
        password: field.password
      }

      try {
        setErrorMessage(null);
        await login(loginDto);
        window.location.reload();
      } catch (error: any) {
        setIsLoading(false);
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
        {formik.errors.username && formik.touched.username ? (
          <ValidationSpan>{formik.errors.username}</ValidationSpan>
        ) : null}
        <LoginInput
          name="password"
          type="password"
          placeholder="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} 
        />
        {formik.errors.password && formik.touched.password ? (
          <ValidationSpan>{formik.errors.password}</ValidationSpan>
        ) : null}
          { errorMessage && <ValidationSpan>{errorMessage}</ValidationSpan> }
        </InputContainer>
        <LoginButton
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              handleLogin();
              navigate("/home");
            }, 500);
          }}
          disabled={isLoading}
        >
          { isLoading ? <Loader /> : "Login" }
        </LoginButton>
        <HelpButtons>
          <RegisteredButton onClick={() => navigate("/verify/restore-password")}>
            Forgot password?
          </RegisteredButton>
          <RegisteredButton>Not register?</RegisteredButton>
        </HelpButtons>
      </LoginCard>
    );
};