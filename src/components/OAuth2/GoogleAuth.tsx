import { useEffect, FC } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { OAuth } from "../../stores/toOAuthButtons.mobx";
import { observer } from "mobx-react-lite";
import { exchangeCodeToJWT } from "./functions";

export const GoogleAuth: FC = observer(() => {
  const[searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if(OAuth.imageUrl) {
      navigate('/register');
      localStorage.setItem('Google image', OAuth.imageUrl);
    }
  }, [OAuth.imageUrl]);

  useEffect(() => {
    exchangeCodeToJWT('google', code, navigate);
  }, []);

  return (
    <PageLoader />
  )
});