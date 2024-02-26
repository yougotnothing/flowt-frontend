import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { useFormik } from "formik";
import { api } from "../../../../api/axiosConfig";
import { AccountSettings } from "../AccountSettings";
import { AccountContainer } from "../Account.styled";
import { restorePasswordSchema } from "../../../../validation/yup.config";
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
import { URLS } from "../../../../constants/urls.const";
import { user } from "../../../../stores/toUser.mobx";
import { Title as Helmet } from "../../../../helmet";
import { modalStore } from "../../../../stores/toModal.mobx";

export const ChangePassword: React.FC = () => {
  const[errorMessage, setErrorMessage] = useState<any>('');
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

  const handleChangePassword = async () => {
    try{
      setIsLoading(true);
      await api.post('/users/change-password', {
        newPassword: formik.values.password,
        code: formik.values.code
      });

      console.log('password changed');
      user.login();
      setIsLoading(false);
      navigate(`/account/${user.username}`);
    }catch(error: any) {
      setErrorMessage("Incorrect restore code");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    modalStore.setIsOpen(true, 'change password');
  }, []);

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
      <Helmet title={`${user.username}: change password`} />
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
          </InputContainer>
          <LoginButton onClick={handleChangePassword} disabled={isLoading}>
            {isLoading ? <Loader /> : "Send code"}
          </LoginButton>
          <ValidationSpan>{errorMessage}</ValidationSpan>
        </LoginCard>
      </Container>
    </AccountContainer>
  );
}