import { useEffect, FC } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axiosConfig";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { OAuth } from "../../stores/toOAuthButtons.mobx";
import { observer } from "mobx-react-lite";

export const GoogleAuth: FC = observer(() => {
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
        window.location.reload();
      }
    }catch(error: any) {
      if(error.response.status === 409) {
        localStorage.setItem('image', error.response.data.imageUrl);
        
        OAuth.setOAuthData(error.response.data);
        console.log(OAuth.backendData);
      }else{
        console.error(error.response.data);
      }
    }
  }

  useEffect(() => {
    if(OAuth.backendData) {
      navigate('/register');
    }
  }, [OAuth.backendData]);

  useEffect(() => {
    exchangeCodeOnJWT();
  }, []);

  return (
    <PageLoader />
  )
})