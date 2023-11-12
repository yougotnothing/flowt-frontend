import React, { useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axiosConfig";

export const GoogleAuth: React.FC = () => {
  const[searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();

  const exchangeCodeOnJWT = async () => {
    try {
      const response = await api.post('/auth/oauth/google', {
        authorizationCode: code
      });
      if(response) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/home');
      }
    }catch(error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    exchangeCodeOnJWT();
  }, []);

  return (
    <>hello</>
  )
}