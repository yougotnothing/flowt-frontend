import {useEffect, useState} from "react";
import { LoginCard, LoginButton, LoginHeader, LoginInput, RegisteredButton, Span, ValidationSpan, InputContainer } from "./login.register.styled";
import { registration } from '../../../api/axiosConfig';

export const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [usernameDirty, setUsernameDirty] = useState(false);
    const [usernameError, setUsernameError] = useState("username is already exist");
    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('email is not valid');
    const [password, setPassword] = useState('');
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState('password is not valid');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('passwords not match');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isUsernameCustomError, setUsernameCustomError] = useState(false);
    const [isEmailCustomError, setEmailCustomError] = useState(false);
    const [isPasswordCustomError, setPasswordCustomError] = useState(false);
    
    function blurHandler(e: any) {
      switch(e.target.name) {
        case "username":
          setUsernameDirty(true);
          break;
        case "email":
          setEmailDirty(true);
          break;
        case "password":
          setPasswordDirty(true);
          break;
        case "confirm password": 
          setConfirmPasswordDirty(true);
          break;
      }
    }

    const emailHandler = (e: any) => {
      setEmail(e.target.value);
      const re:RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(!re.test(String(e.target.value).toLowerCase())) {
        setEmailError("email incorrect");
      }else{
        setEmailError("");
      }
    }

    const usernameHandler = (e: any) => {
      setUsername(e.target.value);
      if(e.target.value.length < 3) {
        setUsernameError("username too short");
      }else if(e.target.value.length > 16) {
        setUsernameError("username too long");
      }else{
        setUsernameError("");
      }
    }

    const passwordHandler = (e: any) => {
      setPassword(e.target.value);

      if(e.target.value.length < 8) {
        setPasswordError("password may be longer than 8 char");
      }else if(e.target.value.length > 16) {
        setPasswordError("password too long");
      }else{
        setPasswordError("");
      }
    }

    const confirmPasswordHandler = (e: any) => {
      setConfirmPassword(e.target.value);

      if(e.target.value !== password) {
        setConfirmPasswordError("password mismatch");
      }else{
        setConfirmPasswordError("");
      }
    }

    async function handleRegister() {
      const registerDto: any = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }
      try {
        await registration(registerDto);
        setErrorMessage(null);
      } catch (error: any) {
        const field = error.response.data.field;

        setUsernameCustomError(false);
        setEmailCustomError(false);
        setPasswordCustomError(false);
        setErrorMessage(error.response.data.message)
        switch(field) {
          case "username":
            setUsernameCustomError(true);
            break;
          case "email":
            setEmailCustomError(true);
            break;
          case "password":
            setPasswordCustomError(true);
            break;
        }
      }
    }

  return (
    <LoginCard>
      <LoginHeader>Welcome<Span>!</Span></LoginHeader>
      <InputContainer>
        <LoginInput
          value={username}
          name="username"
          onBlur={(e: any) => blurHandler(e)}
          onChange={(e: any) => usernameHandler(e)}
          placeholder="username"
        />
        {(usernameDirty && usernameError) && <ValidationSpan>{usernameError}</ValidationSpan>}
        {errorMessage && isUsernameCustomError && <ValidationSpan>{errorMessage}</ValidationSpan>}
          <LoginInput
            value={email}
            name="email"
            onBlur={(e: any) => blurHandler(e)}
            onChange={(e: any) => emailHandler(e)} 
            placeholder="email"
          />
            {(emailDirty && emailError) && <ValidationSpan>{emailError}</ValidationSpan>}
            {errorMessage && isEmailCustomError && <ValidationSpan>{errorMessage}</ValidationSpan>}
          <LoginInput
            name="password"
            type="password"
            value={password}
            onBlur={(e: any) => blurHandler(e)}
            onChange={(e: any) => passwordHandler(e)} 
            placeholder="password" 
          />
            {((passwordDirty || isPasswordCustomError) && passwordError) && <ValidationSpan>{passwordError}</ValidationSpan>}
            {errorMessage && isPasswordCustomError && <ValidationSpan>{errorMessage}</ValidationSpan>}
          <LoginInput
            name="confirm password"
            type="password"
            value={confirmPassword} 
            onBlur={(e: any) => blurHandler(e)}
            onChange={(e: any) => confirmPasswordHandler(e)}  
            placeholder="repeat password" 
          />
            {(confirmPasswordDirty && confirmPasswordError) && <ValidationSpan>{confirmPasswordError}</ValidationSpan>}
        </InputContainer>
      <LoginButton onClick={handleRegister}>
          register
        </LoginButton>
        <RegisteredButton>Registered?</RegisteredButton>
      </LoginCard>
    );
};