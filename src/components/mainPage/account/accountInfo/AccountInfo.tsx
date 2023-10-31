import React, { useEffect } from "react";

import { useNavigate, generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { A, AContainer } from "../../MainPage.styled";
import { AccountSettings } from "../AccountSettings";
import {
  Title,
  InfoContainer,
  UserAvatar,
  UserContainer,
  UserInfo,
  Username,
  ButtonsContainer,
  Region,
  Description,
  DescriptionContainer,
  DescriptionTitle,
  Email,
  StatsContainer,
  AccountContainer,
  PlaylistContainer,
} from "../Account.styled";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../../contexts/UserContext";
import { userDescriptionStore as descriptionStore } from "../../../../stores/toChangeDescription";
import { userUsernameStore as usernameStore } from "../../../../stores/toChangeUsername";
import { userAvatarStore as avatarStore } from "../../../../stores/toChangeAvatar";
import { userRegionStore as regionStore } from "../../../../stores/toChangeRegion";
import { userEmailStore as emailStore } from "../../../../stores/toChangeEmail";
import { FullsizeSongs } from "../../../songs/fullsizeSongs/FullsizeSongs";
import { URLS } from "../../../../constants/urls.const";

export const AccountInfo: React.FC = observer(() => {
  const navigate = useNavigate();
  const url = new URLS();
  const { user, followers, subscribes } = useUserContext();

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      <AccountSettings />
      <InfoContainer>
        <Title>Your info</Title>
        {user && followers && subscribes && (
          <UserContainer>
            <UserAvatar style={{ backgroundImage: `url(${avatarStore.avatar})` }}/>
            <UserInfo>
              <Username>{usernameStore.username}</Username>
              <StatsContainer>
                <Email>{emailStore.email}</Email>
                <Region>{regionStore.region}</Region>
              </StatsContainer>
              <ButtonsContainer>
                <AContainer>
                  <A
                    onClick={() => navigate(generatePath("/profile/:id/followers", {id: user.username}))}>
                    followers: {followers.length}
                  </A>
                </AContainer>
                <AContainer>
                  <A
                    onClick={() => navigate(generatePath("/profile/:id/subscribes", {id: user.username,}))}>
                    subscribes: {subscribes.length}
                  </A>
                </AContainer>
              </ButtonsContainer>
            </UserInfo>
          </UserContainer>
        )}
        {user && user.description && (
          <>
            <DescriptionTitle>Your description</DescriptionTitle>
            {descriptionStore.description && (
              <DescriptionContainer>
                <Description>{descriptionStore.description}</Description>
              </DescriptionContainer>
            )}
          </>
        )}
        {user && (
          <PlaylistContainer>
            <FullsizeSongs />
          </PlaylistContainer>
        )}
      </InfoContainer>
    </AccountContainer>
  );
});
