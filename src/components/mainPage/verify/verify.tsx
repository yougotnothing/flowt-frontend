import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { verifyEmail } from "../../../api/axiosConfig";
import { Loader } from "../../loader/loader";

export const Verify = () => {
  const[searchParams] = useSearchParams();
  const verifyCode = searchParams.get('code');
  const navigate = useNavigate();

  const didi = {
    username: "",
    password: ""
  };

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
      }catch (e) {
        localStorage.setItem('warning', 'false');
      }
    }
    verifyStatus();
  }, []);
  
  return (
    <>
      {/* {setTimeout(() => navigate("/home"), 5000)} */}
      <Loader />
    </>
  );
}