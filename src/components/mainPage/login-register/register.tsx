import { useState } from "react";
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
    const [error1, setError] = useState(null);
    
    let errorMessage: any = "";
    let isErrorOccurred: boolean = false;

    let isUsernameError: boolean = false;
    let isEmailError: boolean = false;
    let isPasswordError: boolean = false;

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
      const registerDto: { username: string, email: string, password: string, confirmPassword: string } = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }
      try {
        await registration(registerDto);
      } catch (error: any) {
        const field = error.response.data.field;
        console.log(field);
        switch(field) {
          case "username":
            isUsernameError = true;
            console.log(isUsernameError);
            break;
          case "email":
            isEmailError = true;
            break;
          case "password": 
            isPasswordError = true;
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
            {(usernameDirty && usernameError && isUsernameError) && <ValidationSpan>{usernameError}</ValidationSpan>}
            {isUsernameError ? <ValidationSpan>{usernameError}</ValidationSpan> : null}
          <LoginInput
            value={email}
            name="email"
            onBlur={(e: any) => blurHandler(e)}
            onChange={(e: any) => emailHandler(e)} 
            placeholder="email"
          />
            {(emailDirty && emailError) && <ValidationSpan>{emailError}</ValidationSpan>}
            {(isEmailError) && <ValidationSpan>{emailError}</ValidationSpan>}
          <LoginInput
            name="password"
            type="password"
            value={password}
            onBlur={(e: any) => blurHandler(e)}
            onChange={(e: any) => passwordHandler(e)} 
            placeholder="password" 
          />
            {(passwordDirty && passwordError) && <ValidationSpan>{passwordError}</ValidationSpan>}
            {(isPasswordError) && <ValidationSpan>{passwordError}</ValidationSpan>}
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