import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api } from "../../../api/axiosConfig";
import { useFormik } from "formik";
import { restorePasswordSchema } from "../../../validation/yup.config";
import {
  LoginInput,
  LoginButton,
  LoginCard,
  LoginHeader,
  RegisteredButton,
  ValidationSpan,
  InputContainer,
  A,
  AContainer,
  Container
} from "./Login.register.styled";
import { Loader } from "../../loader/Loader";
import { URLS } from "../../../constants/urls.const";
import { user } from "../../../stores/toUser.mobx";
import { Title as Helmet } from "../../../helmet";
import { modalStore } from "../../../stores/toModal.mobx";

export const RestorePassword: React.FC = () => {
  const[errorMessage, setErrorMessage] = useState<string | null>(null);
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik<{
    password: string,
    confirmPassword: string,
    code: string
  }>({
    initialValues: {
      password: "",
      confirmPassword: "",
      code: ""
    },
    validationSchema: restorePasswordSchema,
    onSubmit: () => {}
  });

  useEffect(() => {
    modalStore.setIsOpen(true, 'restore password');
  }, []);

  const handleChangePassword = async () => {
    try {
      await api.post('/users/restore-password', {
        email: modalStore.restore_email,
        newPassword: formik.values.password,
        code: parseInt(formik.values.code)
      });

      navigate('/login');
    }catch(error: any) {
      setErrorMessage(error.response.data.message);
      return;
    }
  }

  const passwordError = (formik.errors.password && formik.touched.password && <ValidationSpan>{formik.errors.password}</ValidationSpan>);
  const confirmPasswordError = (formik.errors.confirmPassword && formik.touched.confirmPassword && <ValidationSpan>{formik.errors.confirmPassword}</ValidationSpan>);
  const codeError = (formik.errors.code && formik.touched.code && <ValidationSpan>{formik.errors.code}</ValidationSpan>);

  return (
    <Container>
      <Helmet title="Restore password" />
      {localStorage.getItem('token') ? (
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id', {id: user.username}))}>
            Go back
          </A>
        </AContainer>
      ) : (
        <A></A>
      )}
      <LoginCard>
        <LoginHeader>Restore password</LoginHeader>
        <InputContainer>
          <LoginInput
            placeholder="password"
            name="password"
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
          onClick={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? <Loader/> : "Send code"}
        </LoginButton>
        <RegisteredButton>go back</RegisteredButton>
      </LoginCard>
    </Container>
  );
}