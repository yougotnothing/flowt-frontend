import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { LoginHeader, LoginButton, LoginCard, LoginInput, Span, ValidationSpan } from "./login.register.styled";
import { login } from "../../../api/axiosConfig";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let errorMessage: string = "";
    let isErrorOccurred: boolean = false;

    async function handleLogin() {
      const loginDto: { username: string, password: string } = {
        username: username,
        password: password
      }

      try {
        await login(loginDto);
      } catch (error: any) {
        errorMessage = error.response.data;
        isErrorOccurred = true;
      }
    }

    const ValidationError = (
      <>
        { isErrorOccurred ? <ValidationSpan>{errorMessage}</ValidationSpan> : null }
      </>
    );

    return (
      <LoginCard>
        <LoginHeader>Welcome<Span>!</Span></LoginHeader>
        <LoginInput
          value={username}
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setUsername(event.target.value)}
          placeholder="username"
        />
          {ValidationError}
        <LoginInput
          value={password} 
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setPassword(event.target.value)} 
          placeholder="password"
        />
          {ValidationError}
        <LoginButton onClick={handleLogin}>
          <Link to={`/home`} className="link"/>
            login
          </LoginButton>
      </LoginCard>
    );
};