import React from "react";
import { useNavigate, generatePath } from "react-router-dom";

import {
  A,
  Title,
  UserSettings,
  AContainer, 
  UserSettingsContainer,
} from "./Account.styled";
import { PageLoader } from "../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../contexts/UserContext";

export const Account: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <UserSettingsContainer>
      {!user && <PageLoader />}
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