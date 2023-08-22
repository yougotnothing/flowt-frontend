import { useState } from "react";
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
} from "./login.register.styled";
import { useRegistration } from "../../../auth/authService";
import { useFormik } from "formik";
import { registrationValidationSchema } from "../../../validation/yup.config";
import { Loader } from "../../loader/loader";
import { registration } from "../../../api/axiosConfig";

export const Register: React.FC = () => { 
    const registrationMutation = useRegistration();
    const navigate = useNavigate();
    const[isLoading, setIsLoading] = useState(false);
    const[usernameError, setUsernameError] = useState(false);
    const[emailError, setEmailError] = useState(false);
    const[passwordError, setPasswordError] = useState(false);
    const[errorMessage, setErrorMessage] = useState(null);
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");

    const formik = useFormik<{
      username: "";
      email: "";
      password: "";
      confirmPassword: ""
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

    const isValid =
      !isLoading &&
      !formik.errors.email &&
      !formik.errors.password &&
      formik.touched.password &&
      !formik.errors.username &&
      formik.touched.username &&
      !formik.errors.confirmPassword &&
      formik.touched.confirmPassword;

    async function handleRegister() {
      const registerDto: any = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }
      try {
        await registration(registerDto);
        navigate("login");
        setErrorMessage(null);
      } catch (error: any) {
        const field = error.response.data.field;
    
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

    const handleAuthorized = async () => {
      const { email, username, password, confirmPassword } = formik.values;
      
      setIsLoading(true);
      if (email && password && username && confirmPassword) {
        const user = await registrationMutation.mutateAsync({
          username,
          email,
          password,
        });
      }
      handleRegister();
    };

    return (
      <LoginCard>
        <LoginHeader>Welcome<Span>!</Span></LoginHeader>
        <InputContainer>
          <LoginInput
            name="username" 
            placeholder="username"
            onBlur={formik.handleBlur}
            onChange={(e: any) => {
              formik.handleChange(e);
              setUsername(e.target.value);
            }}
          />
          { formik.errors.username && formik.touched.username ? (
             <ValidationSpan>{formik.errors.username}</ValidationSpan>
           ) : null }
          { errorMessage && usernameError && <ValidationSpan>{errorMessage}</ValidationSpan> }
          <LoginInput
            name="email"
            placeholder="email"
            onBlur={formik.handleBlur}
            onChange={(e: any) => {
              formik.handleChange(e);
              setEmail(e.target.value);
            }}
          />
          { formik.errors.email && formik.touched.email ? (
             <ValidationSpan>{formik.errors.email}</ValidationSpan>
           ) : null }
          { errorMessage && emailError && <ValidationSpan>{errorMessage}</ValidationSpan> }
          <LoginInput
            name="password"
            type="password"
            placeholder="password"
            onChange={(e: any) => {
              formik.handleChange(e);
              setPassword(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
          { formik.errors.password && formik.touched.password ? (
             <ValidationSpan>{formik.errors.password}</ValidationSpan>
           ) : null }
          { errorMessage && passwordError && <ValidationSpan>{errorMessage}</ValidationSpan> }
          <LoginInput
            name="confirm password"
            type="password"
            placeholder="confirm password"
            onChange={(e: any) => {
              formik.handleChange(e);
              setConfirmPassword(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
        </InputContainer>
        <LoginButton
          onClick={() => handleAuthorized()}
          disabled={isLoading}
        >
          { isLoading ? <Loader /> : "register" }
        </LoginButton>
        <RegisteredButton>Registered?</RegisteredButton>
      </LoginCard>
    );
};