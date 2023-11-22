import React, { useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axiosConfig";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { OAuth } from "../../stores/toOAuthButtons.mobx";
import { observer } from "mobx-react-lite";
import { userAvatarStore } from "../../stores/toChangeAvatar.mobx";

export const GoogleAuth = observer(() => {
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
        OAuth.setOAuthData(error.response.data);
        userAvatarStore.setAvatar(error.response.data.imageUrl);
        userAvatarStore.setAvatarURL(error.response.data.imageUrl);
        console.log(OAuth.backendData);
      }
      console.error(error);
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