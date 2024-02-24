import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { exchangeCodeToJWT } from "./functions";

export const FacebookAuth: React.FC = () => {
  const navigate = useNavigate();
  const parsedUrl = new URL(window.location.href);
  const hashParams = new URLSearchParams(parsedUrl.hash.slice(1));
  const accessToken = hashParams.get("access_token");
  console.log(accessToken);

  useEffect(() => {
    exchangeCodeToJWT('facebook', accessToken, navigate);
  }, []);

  return (
    <PageLoader />
  )
}
