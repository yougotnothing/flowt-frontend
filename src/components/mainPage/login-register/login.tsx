import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { LoginHeader, LoginButton, LoginCard, LoginInput, Span } from "./login.register.styled";
import { login } from "../../../api/axiosConfig";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
      const loginDto: { username: string, password: string } = {
        username: username,
        password: password
      }
      login(loginDto);
    }

    return (
      <LoginCard>
        <LoginHeader>Welcome<Span>!</Span></LoginHeader>
        <LoginInput
          value={username}
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setUsername(event.target.value)}
          placeholder="username"
        />
        <LoginInput
          value={password} 
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setPassword(event.target.value)} 
          placeholder="password"
        />
        <LoginButton onClick={handleLogin}>
          <Link to={`/home`} className="link"/>
            login
          </LoginButton>
      </LoginCard>
    );
};