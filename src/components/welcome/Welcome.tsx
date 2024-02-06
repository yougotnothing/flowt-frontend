import { FC, useState } from "react";

import { useFormik } from "formik";
import {
  Button,
  ButtonsWrapper,
  Content,
  Input,
  InputWrapper,
  LoginButton,
  LoginWrapper,
  RowWrapper,
  Span,
  Strong,
  Title,
  TitleWrapper,
  Error,
  MainInfoWrapper,
  LinkWrapper,
  Link,
  TextWrapper,
  Icon
} from "./Welcome.styled";
import { loginValidationSchema } from "../../validation/yup.config";
import { useNavigate } from "react-router-dom";
import { FacebookButton, GoogleButton } from "../OAuth2/OAuthButtons";
import { login } from "../../api/axiosConfig";

export const Welcome: FC = () => {
  const[errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const formik = useFormik<{
    username: string,
    password: string
  }>({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {}
  });

  const handleLogin = async () => {
    await login({
        login: formik.values.username,
        password: formik.values.password
      },
      navigate,
      setErrorMessage
    );
  }

  return (
    <Content>
      <RowWrapper>
        <MainInfoWrapper>
          <TitleWrapper>
            <Span>Welcome to</Span>
            <Title>FLOWT</Title>
          </TitleWrapper>
          <TextWrapper>
            <Span $color="white">Dive into an</Span>
            <Strong>ocean <Span $color="white">of </Span>music</Strong>
          </TextWrapper>
          <LinkWrapper $direction="column">
            <Icon
              $url="/github-logo.png"
              target="_blank"
              href="https://github.com/yougotnothing/flowt-frontend"
            />
            <LinkWrapper $direction="row">
              <Strong>
                <Link
                  $strong
                  target="_blank"
                  href="https://github.com/vilsoncake"
                >VilsonCake</Link>
                <Link
                  $strong
                  target="_blank"
                  href="https://github.com/yougotnothing"
                >yougotnothing</Link>
              </Strong>
            </LinkWrapper>
          </LinkWrapper>
        </MainInfoWrapper>
        <LoginWrapper>
          <Strong>Login</Strong>
          <InputWrapper>
            <Input
              $isError={!!formik.errors.username} 
              type="username"
              name="username"
              placeholder="login"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              $isError={!!formik.errors.password}
              type="password"
              name="password"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Error>{errorMessage}</Error>
          </InputWrapper>
          <LoginButton onClick={handleLogin}>Submit</LoginButton>
          <ButtonsWrapper>
            <GoogleButton />
            <FacebookButton />
          </ButtonsWrapper>
          <Button
            onClick={() => navigate('/register')}
          >Not registered?</Button>
        </LoginWrapper>
      </RowWrapper>
    </Content>
  );
}