import { SetStateAction, useState } from "react";
import { LoginCard, LoginButton, LoginHeader, LoginInput, RegisteredButton, Span } from "./login.register.styled";
import { registration } from '../../../api/axiosConfig';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleRegister(): any {
      const registerDto: any = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }
      registration(registerDto);
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
          value={email} 
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setEmail(event.target.value)} 
          placeholder="email"
        />
        <LoginInput 
          value={password} 
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setPassword(event.target.value)} 
          placeholder="password" 
        />
        <LoginInput 
          value={confirmPassword} 
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setConfirmPassword(event.target.value)} 
          placeholder="repeat password" 
        />
        <LoginButton onClick={handleRegister}>register</LoginButton>
        <RegisteredButton>Registered?</RegisteredButton>
      </LoginCard>
    );
};