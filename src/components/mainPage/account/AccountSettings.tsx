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
import settings from "../../../json/accountSettings.json";
import { user } from "../../../stores/toUser.mobx";

export const AccountSettings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <UserSettingsContainer>
      {!user.isUserAuthenticated && <PageLoader />}
      <Title>Account</Title>
      <UserSettings>
        {settings.map((setting, index) => (
          <AContainer key={index}>
            <A className='a-link'
              onClick={() => navigate(generatePath(`/account/:id/change-${setting}`, { id: user.username }))}>
              Change {setting}
            </A>
          </AContainer>
        ))}
      </UserSettings>
    </UserSettingsContainer>
  )
}