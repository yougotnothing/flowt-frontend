import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Loader } from "../../loader/loader";
import { 
  RegisteredButton, 
  LoginButton, 
  LoginInput, 
  LoginHeader, 
  LoginCard,
  Span,
  ValidationSpan,
  InputContainer
} from "./login.register.styled";
import { changePasswordSchema } from "../../../validation/yup.config";

export const ChangePassword: React.FC = () => {
  const[password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik<{
    password: "",
    confirmPassword: ""
  }>({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: changePasswordSchema,
    onSubmit: () => {}
  });

  const handleChangedPassword = () => {
    const { password, confirmPassword } = formik.values;
    
    setIsLoading(true);
    if(password && confirmPassword) {
      setIsLoading(false);
      navigate('/home');
    }
  }

  return (
    <LoginCard>
      <LoginHeader><Span>Change</Span> password</LoginHeader>
      <InputContainer>
      <LoginInput 
        placeholder="new password"
        type="password" 
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors.password && formik.touched.password
        && 
        <ValidationSpan>{formik.errors.password}</ValidationSpan>}
      <LoginInput 
        placeholder="confirm new password"
        type="password"
        name="confirmPassword"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors.confirmPassword && formik.touched.confirmPassword
        &&
        <ValidationSpan>{formik.errors.confirmPassword}</ValidationSpan>}
      </InputContainer>
      <LoginButton>submit</LoginButton>
      <RegisteredButton 
        onClick={() => handleChangedPassword()}
        disabled={isLoading}
      > 
        { isLoading ? <Loader /> : "return to home" }
      </RegisteredButton>
    </LoginCard>
  );
}