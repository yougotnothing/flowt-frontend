import { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api, API_URL, getUser, getFollowers, getSubscribes } from "../../../../api/axiosConfig";
import { A, AContainer, GoBackContainer } from "../../mainPage.styled";
import { Account } from "../account";
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
} from "../account.styled";

export const AccountInfo: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[followers, setFollowers] = useState<any>(null);
  const[subscribes, setSibscribes] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(setUser);
    getFollowers(setFollowers);
    getSubscribes(setSibscribes);
  }, []);

  if(user) {
    console.log(user.region);
  }


  return (
    <AccountContainer>
      {user && <Account />}
      <InfoContainer>
        <Title>Your info</Title>
        {user && followers && subscribes && (
          <UserContainer>
            {user.username ? (
              <UserAvatar style={{
                backgroundImage: `url(${API_URL}/images/user/${user.username})`
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
      </InfoContainer>
    </AccountContainer>
  );
}