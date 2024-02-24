import { FC, useEffect } from "react";

import { OAuthButton, OAuthText, OAuthIcon } from "./OAuthButtons.styled";
import { OAuth } from "../../stores/toOAuthButtons.mobx";
import { useLocation } from "react-router-dom";

export const GoogleButton: FC = () => {
  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== '/login') {
      OAuth.setWhereUsing('Sign up');
    }else{  
      OAuth.setWhereUsing('Sign in');
    }
  }, [location.pathname]);

  return (
    <OAuthButton $type="google" href={process.env.REACT_APP_GOOGLE_REDIRECT_URI}>
      <OAuthIcon $type="google" />
      <OAuthText
        $type="google"
        $whereUsing={OAuth.whereUsing}
      >{OAuth.whereUsing} with Google</OAuthText>
    </OAuthButton>
  );
}

export const FacebookButton: FC = () => {
  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== '/login') {
      OAuth.setWhereUsing('Sign up');
    }else{  
      OAuth.setWhereUsing('Sign in');
    }
  }, [location.pathname]);

  return (
    <OAuthButton $type="facebook" href={process.env.REACT_APP_FACEBOOK_REDIRECT_URI}>
      <OAuthIcon $type="facebook" />
      <OAuthText
        $type="facebook"
        $whereUsing={OAuth.whereUsing}
      >{OAuth.whereUsing} with Facebook</OAuthText>
    </OAuthButton>
  );
}