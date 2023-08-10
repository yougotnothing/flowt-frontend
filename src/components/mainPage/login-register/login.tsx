import { LoginHeader, LoginButton, LoginCard, LoginInput, Span } from "./login.register.styled";

export const Login = () => (
    <LoginCard>
      <LoginHeader>Welcome<Span>!</Span></LoginHeader>
      <LoginInput placeholder="username" />
      <LoginInput placeholder="password" />
      <LoginButton>login</LoginButton>
    </LoginCard>
);