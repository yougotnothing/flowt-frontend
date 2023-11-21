import { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../api/axiosConfig";
import { PageLoader } from "../loader/pageLoader/PageLoader";

export const FacebookAuth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parsedUrl = new URL(window.location.href);
  const hashParams = new URLSearchParams(parsedUrl.hash.slice(1));
  const accessToken = hashParams.get("access_token");
  console.log(accessToken);

  const exchangeCodeToJWT = async () => {
    try {
      const response = await api.post('/auth/oauth/facebook', {
        accessToken: accessToken
      });
      if (response) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/home');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      console.log(location.search);
    }
  }

  useEffect(() => {
    exchangeCodeToJWT();
  }, []);

  return (
    <PageLoader />
  )
}
