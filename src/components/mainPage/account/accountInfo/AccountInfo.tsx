import React, { useEffect, useState } from "react";

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
  PlaylistContainer
} from "../Account.styled";
import { Playlist } from "../../playlist/Playlist";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../../contexts/UserContext";
import { userAvatarStore } from "../../../../store/toChangeAvatar";
import { userUsernameStore } from "../../../../store/toChangeUsername";
import { userRegionStore } from "../../../../store/toChangeRegion";
import { userEmailStore } from "../../../../store/toChangeEmail";

export const AccountInfo: React.FC = observer(() => {
  const { user, followers, subscribes } = useUserContext();
  const navigate = useNavigate();

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      <AccountSettings />
      <InfoContainer>
        <Title>Your info</Title>
        {user && followers && subscribes && (
          <UserContainer>
            <UserAvatar style={{backgroundImage: `url(${userAvatarStore.avatar})`}} >
            </UserAvatar>
            <UserInfo>
              <Username>{userUsernameStore.Username}</Username>
              <StatsContainer>
                <Email>{userEmailStore.email}</Email>
                <Region>{userRegionStore.region}</Region>
              </StatsContainer>
              <ButtonsContainer>
                <AContainer>
                  <A onClick={() => navigate(generatePath('/profile/:id/followers', { id: user.username }))}>
                    followers: {followers.length}
                  </A>
                </AContainer>
                <AContainer>
                  <A onClick={() => navigate(generatePath('/profile/:id/subscribes', { id: user.username }))}>
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
            <DescriptionContainer>
              <Description>{user.description}</Description>
            </DescriptionContainer>
          </>
        )}
        {user &&
          <PlaylistContainer>
            <Playlist />
          </PlaylistContainer>
        }
      </InfoContainer>
    </AccountContainer>
  );
});
