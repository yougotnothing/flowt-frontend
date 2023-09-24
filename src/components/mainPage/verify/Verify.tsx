import { useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Loader } from "../../loader/Loader";

export const Verify = () => {
  const[searchParams] = useSearchParams();
  const verifyCode = searchParams.get('code');
  const navigate = useNavigate();

  const verifyStatus = async () => {
    try {
      await axios.get(`http://localhost:8080/verify?code=${verifyCode}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.setItem('success', 'true');
    } catch (e) {
      localStorage.setItem('warning', 'true');
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