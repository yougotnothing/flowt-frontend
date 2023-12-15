import { useEffect, FC } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axiosConfig";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { OAuth } from "../../stores/toOAuthButtons.mobx";
import { observer } from "mobx-react-lite";
import { user } from "../../stores/toUser.mobx";

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
        if(token) {
          user.setUser();
        }
      }
    }catch(error: any) {
      if(error.response.status === 409) {
        OAuth.setOAuthData(error.response.data);
        console.log(OAuth.email);
      }else{
        console.error(error.response.data);
      }
    }
  }

  useEffect(() => {
    if(OAuth.imageUrl) {
      navigate('/register');
      localStorage.setItem('Google image', OAuth.imageUrl);
    }
  }, [OAuth.imageUrl]);

  useEffect(() => {
    exchangeCodeOnJWT();
  }, []);

  return (
    <PageLoader />
  )
});