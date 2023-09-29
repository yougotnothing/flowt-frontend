import React, { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { useFormik } from "formik";
import { api } from "../../../../api/axiosConfig";
import { AccountSettings } from "../AccountSettings";
import { AccountContainer } from "../Account.styled";
import { restorePasswordSchema } from "../../../../validation/yup.config";
import { Span } from "../../login-register/Login.register.styled";
import {
  LoginInput,
  LoginButton, 
  LoginCard, 
  LoginHeader, 
  ValidationSpan,
  InputContainer,
  A,
  AContainer,
  Container
} from "../../login-register/Login.register.styled";
import { Loader } from "../../../loader/Loader";
import { useUserContext } from "../../../../contexts/UserContext";

export const ChangePassword: React.FC = () => {
  const[errorMessage, setErrorMessage] = useState<any>('');
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[isVerify, setIsVerify] = useState<boolean>(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const formik = useFormik<{
    password: string,
    confirmPassword: "",
    code: ""
  }>({
    initialValues: {
      password: "",
      confirmPassword: "",
      code: ""
    },
    validationSchema: restorePasswordSchema,
    onSubmit: () => {}
  });

  const handleChangePassword = async () => {
    try{
      setIsLoading(true);
      if(localStorage.getItem('email') === null) {
        await api.post('/users/change-password', {
          newPassword: formik.values.password,
          code: formik.values.code
        });
      }else{
        await api.post('/users/restore-password', {
          email: localStorage.getItem('email'),
          newPassword: formik.values.password,
          code: formik.values.code
        });
        localStorage.removeItem('email');
      }
        if(isVerify) {
          navigate('/home');
          setIsLoading(false);
        }
    }catch(error: any){
      if(error) {
        setErrorMessage("Incorrect restore code");
        setIsVerify(false);
      }
    }
  }

  const passwordError = (
      formik.errors.password && formik.touched.password &&
      <ValidationSpan>{formik.errors.password}</ValidationSpan>
  );
  const confirmPasswordError = (
      formik.errors.confirmPassword && formik.touched.confirmPassword &&
      <ValidationSpan>{formik.errors.confirmPassword}</ValidationSpan>
  );
  const codeError = (
    formik.errors.code && formik.touched.code &&
      <ValidationSpan>{formik.errors.code}</ValidationSpan>
  );

  return (
    <AccountContainer>
      <AccountSettings />
      <Container>
        {localStorage.getItem('token') ? (
          <AContainer>
            <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
              Go back
            </A>
          </AContainer>
        ) : null}
        <LoginCard>
          <LoginHeader>Change password</LoginHeader>
          <InputContainer>
          <LoginInput 
            placeholder="password"
            name="password"
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            autoComplete="new-password"
            />
          {passwordError}
          <LoginInput 
            placeholder="confirm password"
            name="confirmPassword"
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            />
          {confirmPasswordError}
          <LoginInput 
            placeholder="Enter code" 
            name="code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            />
          {codeError}
          <ValidationSpan>{errorMessage}</ValidationSpan>
          </InputContainer>
          <LoginButton
            onClick={() => handleChangePassword()}
            disabled={isLoading}
            >
            {isLoading ? <Loader /> : "Send code"}
          </LoginButton>
        </LoginCard>
      </Container>
    </AccountContainer>
  );
}