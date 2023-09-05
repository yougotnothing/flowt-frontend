import { useEffect, useState } from "react";
import { useNavigate, generatePath, NavigateFunction } from "react-router-dom";

import { A as GoBack, AContainer as AGoBackContainer, GoBackContainer } from "../mainPage.styled";
import { API_URL, getUser, getFollowers, getSubscribes } from "../../../api/axiosConfig";
import { 
  AccountContainer,
  A,
  Title,
  UserSettings,
  AContainer, 
  UserSettingsContainer,
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
  Container
} from "./account.styled";

export const Account: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[followers, setFollowers] = useState<any>([]);
  const[subscribes, setSubscribes] = useState<any>([]);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => { 
    getUser(setUser);
    getFollowers(setFollowers);
    getSubscribes(setSubscribes);
    console.log(user);
  }, []);

  return (
    <Container>
      {user && (
        <GoBackContainer> 
          <AGoBackContainer>
            <GoBack onClick={() => navigate(generatePath('/profile/:id', { id: user.username }))}>
              Go back
            </GoBack>
          </AGoBackContainer>
        </GoBackContainer>
      )}
      <AccountContainer>
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
              <A onClick={() => navigate('/verify/restore-password')}>
                Restore/Change password
              </A>
            </AContainer>
            <AContainer>
              <A>
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
    </Container>
  )
}