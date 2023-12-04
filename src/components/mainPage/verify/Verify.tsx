import { useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader } from "../../loader/Loader";
import { api } from "../../../api/axiosConfig";

export const Verify = () => {
  const[searchParams] = useSearchParams();
  const verifyCode = searchParams.get('code');
  const navigate = useNavigate();

  const verifyStatus = async () => {
    try {
      await api.get('/verify/email', {
        params: {
          code: verifyCode
        }
      });
      
      localStorage.setItem('success', 'email  verified');
    }catch{
      localStorage.setItem('warning', 'email already verified');
    }
  }

  useEffect(() => {
    verifyStatus();
    navigate('/home');
  }, []);
  
  return (
    <Loader />
  );
}