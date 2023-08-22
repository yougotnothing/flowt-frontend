import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Loader } from "../../loader/loader";

export const Verify = () => {
  const[searchParams] = useSearchParams();
  const verifyCode = searchParams.get('code');
  const navigate = useNavigate();
  console.log(verifyCode);

  useEffect(() => {
    const verifyStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/verify?code=${verifyCode}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        localStorage.setItem('success', 'true');
        console.log(response);
      } catch (e) {
        localStorage.setItem('warning', 'false');
      }
      navigate("/home");
    }
    
    setTimeout(verifyStatus, 1000);
  }, [navigate]);
  
  return (
    <Loader />
  );
}