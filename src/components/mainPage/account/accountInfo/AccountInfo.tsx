import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { getUser, getFollowers, getSubscribes } from "../../../../api/axiosConfig";
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
  AccountContainer
} from "../Account.styled";
import { Playlist } from "../../playlist/Playlist";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useSongURL } from "../../../../contexts/SongsContext";

export const AccountInfo: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[followers, setFollowers] = useState<any>(null);
  const[subscribes, setSubscribes] = useState<any>(null);
  const { userAvatar } = useSongURL();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(setUser);
    getFollowers(setFollowers);
    getSubscribes(setSubscribes);
  }, []);

  if(user) {
    console.log(user.region);
  }


  return (
    <AccountContainer>
      {!user && <PageLoader />}
      {user && <Account />}
      <InfoContainer>
        <Title>Your info</Title>
        {user && followers && subscribes && (
          <UserContainer>
            {user.username ? (
              <UserAvatar style={{
                backgroundImage: `url(${userAvatar})`
              }} />
              ) : (
                <UserAvatar style={{
                  backgroundImage: 'url(/defaultAvatar.png)'
                }} />
                )}
            <UserInfo>
              <Username>{user.username}</Username>
              <StatsContainer>
                <Email>{user.email}</Email>
                <Region>{user.region}</Region>
              </StatsContainer>
              <ButtonsContainer>
                <AContainer>
                  <A onClick={() => navigate(generatePath('/profile/:id/followers', { id: user.username }))}>
                    followers {followers.length}
                  </A>
                </AContainer>
                <AContainer>
                  <A onClick={() => navigate(generatePath('/profile/:id/subscribes', { id: user.username }))}>
                    subscribes {subscribes.length}
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
        {user && <Playlist/>}
      </InfoContainer>
    </AccountContainer>
  );
}