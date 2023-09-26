import React from "react";

import { useNavigate, generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userRegionStore } from "../../../../store/toChangeRegion"

import { A, AContainer } from "../../MainPage.styled";
import { Account } from "../Account";
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
import { useContextValues } from "../../../../contexts/Context";

export const AccountInfo: React.FC = observer(() => {
  const { userAvatar, user, followers, subscribes, userRegionStore, userUsernameStore } = useContextValues();
  const navigate = useNavigate();

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      <Account />
      <InfoContainer>
        <Title>Your info</Title>
        {user && followers && subscribes && (
          <UserContainer>
            {user.username ? (
              <UserAvatar style={{backgroundImage: `url(${userAvatar})`}} />
            ) : (
              <UserAvatar style={{backgroundImage: 'url(/defaultAvatar.png)'}} />
            )}
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