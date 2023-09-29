import React, { useState, useEffect } from "react";

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
import { userUsernameStore } from "../../../../store/toChangeUsername";
import { userRegionStore } from "../../../../store/toChangeRegion";
import { userAvatarStore } from "../../../../store/toChangeAvatar";

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
            <UserAvatar style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
            <UserInfo>
              <Username>{userUsernameStore.Username}</Username>
              <StatsContainer>
                <Email>{user.email}</Email>
                <Region>{userRegionStore.userRegion}</Region>
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
        {user.description && (
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