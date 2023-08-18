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

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const registrationMutation = useRegistration(); 
  const[isLoading, setIsLoading] = useState(false);

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

    const handleAuthorized = async (route: string) => {
      const { email, username, password } = formik.values;
      setIsLoading(true);
  
      if (email && password && username) {
        const user = await registrationMutation.mutateAsync({
          username,
          email,
          password,
        });
      }
  
      setIsLoading(false);
  
      if (isValid) {
        navigate(route);
      } else {
        console.log(formik.errors)
        setIsLoading(false);
      }
    };

    return (
      <LoginCard>
        <LoginHeader>Welcome<Span>!</Span></LoginHeader>
        <InputContainer>
          <LoginInput 
            name="username" 
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          { formik.errors.username && formik.touched.username ? (
             <ValidationSpan>{formik.errors.username}</ValidationSpan>
           ) : null }
          <LoginInput
            name="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          { formik.errors.email && formik.touched.email ? (
             <ValidationSpan>{formik.errors.email}</ValidationSpan>
           ) : null }
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
          <LoginInput
            name="confirm password"
            type="password"
            placeholder="confirm password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          { formik.errors.confirmPassword && formik.touched.confirmPassword ? (
             <ValidationSpan>{formik.errors.confirmPassword}</ValidationSpan>
          ) : null }
        </InputContainer>
        <LoginButton
          onClick={() => handleAuthorized("/home")}
          disabled={isLoading}
        >
          {
            isLoading ? <Loader /> :  "register"
          }
        </LoginButton>
        <RegisteredButton>Registered?</RegisteredButton>
      </LoginCard>
    );
};