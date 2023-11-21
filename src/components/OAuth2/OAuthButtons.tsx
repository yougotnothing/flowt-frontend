import { useEffect } from "react";

import { OAuthButton, OAuthText, OAuthIcon } from "./OAuthButtons.styled";
import { OAuth } from "../../stores/toOAuthButtons.mobx";
import { useLocation } from "react-router-dom";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../constants/urls.const";

export const GoogleButton: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== '/login') {
      OAuth.setWhereUsing('Sign up');
    }

    OAuth.setWhereUsing('Sign in');
  }, [location.pathname]);
  
  return (
    <OAuthButton $type="google" href={GOOGLE_AUTH_URL}>
      <OAuthIcon $type="google" />
      <OAuthText
        $type="google"
        $whereUsing={OAuth.whereUsing}
      >
        {OAuth.whereUsing} with Google
      </OAuthText>
    </OAuthButton>
  );
}

export const FacebookButton: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== '/login') {
      OAuth.setWhereUsing('Sign up');
    }

    OAuth.setWhereUsing('Sign in');
  }, [location.pathname]);

  return (
    <OAuthButton $type="facebook" href={FACEBOOK_AUTH_URL}>
      <OAuthIcon $type="facebook" />
      <OAuthText $type="facebook" $whereUsing={OAuth.whereUsing}>
        {OAuth.whereUsing} with Facebook
      </OAuthText>
    </OAuthButton>
  );
}