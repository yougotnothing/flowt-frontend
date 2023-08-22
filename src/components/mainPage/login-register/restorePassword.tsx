import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { 
  LoginInput, 
  LoginButton, 
  LoginCard, 
  LoginHeader, 
  Span, 
  RegisteredButton 
} from "./login.register.styled";

export const RestorePassword: React.FC = () => {
  const navigate = useNavigate();  

  return (
    <LoginCard>
      <LoginHeader><Span>Restore</Span> password</LoginHeader>
      <LoginInput placeholder="enter code" name="code" />
      <LoginButton>send code</LoginButton>
      <RegisteredButton></RegisteredButton>
    </LoginCard>
  );
}