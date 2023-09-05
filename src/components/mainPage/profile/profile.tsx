import { useState, useEffect } from "react";
import { useNavigate, generatePath, useLocation } from "react-router-dom";

import toVerify from "../../../consts/toVerify";
import { api, API_URL, getUser, getFollowers, getSubscribes } from "../../../api/axiosConfig";
import { 
  UserContainer,
  Settings,
  UserAvatar,
  UserNickname,
  HeadContainer,
  UserParams,
  ProfileTitle,
  ProfileTextContainer,
  LinksContainer,
  FollowsSubscribes,
  LikedContainer,
  LikedText,
  LikedTrackContainer,
  LikedTrackIcon,
  Description,
} from "./profile.styled";

import { Options } from "./options/options";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const[user, setUser] = useState<any>('');
  const[subscribes, setSubscribes] = useState<any>([]);
  const[followers, setFollowers] = useState<any>([]);
  const[isOpen, setIsOpen] = useState<boolean>(false);
  const[isVisible, setIsVisible] = useState<boolean>(false);
  let counter: number = 0;
  
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      toVerify.alreadyVerify();
      getUser(setUser);
      getSubscribes(setSubscribes);
      getFollowers(setFollowers);
    }
  }, []);

  return (
    <UserContainer>
      {isVisible ? <Options $isVisible={isVisible} /> :
        <Settings onClick={() => setIsVisible(true) } />}
        <HeadContainer>
          { user && (
          <UserParams>
            {user.username ?
              <UserAvatar style={{
                backgroundImage: `url(${API_URL}/images/user/${user.username})`
              }} />
              : 
              <UserAvatar style={{
                backgroundImage: 'url(/defaultAvatar.png)'
              }} />}
            <ProfileTextContainer>
              <ProfileTitle>Profile</ProfileTitle>
              <UserNickname
                onClick={() => navigate("/home")}
              >
                {user.username}
              </UserNickname>
              <ProfileTitle>{user.region}</ProfileTitle>
              <LinksContainer>
                <FollowsSubscribes 
                  onClick={() => navigate(generatePath('/profile/:id/followers', { id: user.username }))}
                >
                  Followers {followers.length}
                </FollowsSubscribes>
                <FollowsSubscribes
                  onClick={() => navigate(generatePath('/profile/:id/subscribes', { id: user.username }))}
                >
                  Subscribes {subscribes.length}
                </FollowsSubscribes>
              </LinksContainer>
            </ProfileTextContainer>
          </UserParams>
          )}
        </HeadContainer>
        <Description>{user.description}</Description>
      <LikedText>Favorite</LikedText>
      <LikedContainer>
        {subscribes.map((subscribe: any) => (
          <LikedTrackContainer key={++counter}>
            {subscribe ?
              <LikedTrackIcon style={{
                backgroundImage: `url(${API_URL}/images/user/${subscribe})`
              }} /> 
              : 
              <LikedTrackIcon style={{
                backgroundImage: 'url(defaultAvatar.png)'
              }} />
            }
          {subscribe}
        </LikedTrackContainer>
        ))}
      </LikedContainer>
    </UserContainer>
  );
};  