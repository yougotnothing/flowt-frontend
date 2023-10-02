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
import { userStore } from "../../../../store/toUserParams";

export const AccountInfo: React.FC = observer(() => {
  const navigate = useNavigate();
  const user = userStore.user;
  const followers = userStore.followers;
  const subscribes = userStore.subscribes;

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      <AccountSettings />
      <InfoContainer>
        <Title>Your info</Title>
        {user && followers && subscribes && (
          <UserContainer>
            <UserAvatar style={{backgroundImage: `url(${userStore.avatar})`}} />
            <UserInfo>
              <Username>{user.username}</Username>
              <StatsContainer>
                <Email>{user.email}</Email>
                <Region>{user.region}</Region>
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