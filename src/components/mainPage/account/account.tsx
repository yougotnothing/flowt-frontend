import { useEffect, useState } from "react";
import { useNavigate, generatePath, NavigateFunction } from "react-router-dom";

import { getUser } from "../../../api/axiosConfig";
import { 
  A,
  Title,
  UserSettings,
  AContainer, 
  UserSettingsContainer,
} from "./account.styled";

export const Account: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => { 
    getUser(setUser);
  }, []);

  return (
    <UserSettingsContainer>
      <Title>Account</Title>
      <UserSettings>
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id/change-avatar', { id: user.username }))}>
            Change avatar
          </A>
        </AContainer>
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id/change-username', { id: user.username }))}>
            Change username
          </A>
        </AContainer>
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id/change-password', { id: user.username }))}>
            Change password
          </A>
        </AContainer>
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id/change-region', { id: user.username }))}>
            Change region
          </A>
        </AContainer>
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id/change-description', { id: user.username }))}>
            Change description
          </A>
        </AContainer>
        <AContainer>
          <A onClick={() => navigate(generatePath('/account/:id/change-email', { id: user.username }))}>
            Change email
          </A>
        </AContainer>
      </UserSettings>
    </UserSettingsContainer>
  )
}