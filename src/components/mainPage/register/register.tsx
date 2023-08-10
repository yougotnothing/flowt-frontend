import { LoginCard, LoginButton, LoginHeader, LoginInput, RegisteredButton, Span } from "../login-register/login.register.styled";

export const Register = () => (
    <LoginCard>
      <LoginHeader>Welcome<Span>!</Span></LoginHeader>
      <LoginInput placeholder="username" />
      <LoginInput type="email" placeholder="email" />
      <LoginInput type="password" placeholder="password" />
      <LoginInput type="password" placeholder="repeat password" />
      <LoginButton>register</LoginButton>
      <RegisteredButton>Registered?</RegisteredButton>
    </LoginCard>
);