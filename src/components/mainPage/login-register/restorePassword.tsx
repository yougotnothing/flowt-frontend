import { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api, getUser } from "../../../api/axiosConfig";
import { useFormik } from "formik";
import { restorePasswordSchema } from "../../../validation/yup.config";
import { 
  LoginInput, 
  LoginButton, 
  LoginCard, 
  LoginHeader, 
  Span, 
  RegisteredButton,
  ValidationSpan,
  InputContainer,
  A,
  AContainer,
  Container
} from "./login.register.styled";
import { Loader } from "../../loader/loader";

export const RestorePassword: React.FC = () => {
  const[errorMessage, setErrorMessage] = useState<any>('');
  const[user, setUser] = useState<any>(null);
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[isVerify, setIsVerify] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik<{
    password: "",
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

  useEffect(() => { getUser(setUser) }, []);

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

  const passwordError = (formik.errors.password && formik.touched.password && <ValidationSpan>{formik.errors.password}</ValidationSpan>);
  const confirmPasswordError = (formik.errors.confirmPassword && formik.touched.confirmPassword && <ValidationSpan>{formik.errors.confirmPassword}</ValidationSpan>);
  const codeError = (formik.errors.code && formik.touched.code && <ValidationSpan>{formik.errors.code}</ValidationSpan>);

  return (
    <Container>
      {localStorage.getItem('token') ? (
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
            Go back
          </A>
        </AContainer>
      ) : (
        <A></A> 
        )}
      <LoginCard>
        <LoginHeader><Span>Restore/Change</Span> password</LoginHeader>
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
          {isLoading ? <Loader /> : "Send code"}
        </LoginButton>
        <RegisteredButton>go back</RegisteredButton>
      </LoginCard>
    </Container>
  );
}