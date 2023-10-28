import { useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../loader/Loader";
import { API_URL } from "../../../api/axiosConfig";

export const Verify = () => {
  const[searchParams] = useSearchParams();
  const verifyCode = searchParams.get('code');
  const navigate = useNavigate();

  const verifyStatus = async () => {
    try {
      await axios.get(`${API_URL}/verify/email`, {
        params: { code: verifyCode },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.setItem('success', 'email  verified');
    } catch (e) {
      localStorage.setItem('warning', 'email already verified');
    }
  }

  useEffect(() => {
    verifyStatus();
    navigate('/home');
    console.log(verifyCode);
  }, []);
  
  return (
    <Loader />
  );
}