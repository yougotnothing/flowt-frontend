import { useState, useEffect } from "react";
import { useNavigate, generatePath, useLocation } from "react-router-dom";

import toVerify from "../../../consts/toVerify";
import { api, API_URL } from "../../../api/axiosConfig";
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
  LikedTrackIcon
} from "./profile.styled";
import { Options } from "./options/options";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const[user, setUser] = useState<any>('');
  const[subscribes, setSubscribes] = useState<any>([]);
  const[followers, setFollowers] = useState<any>([]);
  const[isOpen, setIsOpen] = useState<boolean>(false);
  let counter: number = 0;

  const getUser = async () => {
    const response = await api.get('/users/authenticated');
    setUser(response.data);
  };

  const getSubscribes = async () => {
    const response = await api.get('/users/subscribes');
    setSubscribes(response.data.subscribes);
  };

  const getFollowers = async () => {
    const response = await api.get('/users/followers');
    setFollowers(response.data.followers);
  };
  
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      toVerify.alreadyVerify();
      getUser();
      getSubscribes();
      getFollowers();
    }
  }, []);

  return (
    <UserContainer>
      {isOpen ? <Options /> : <Settings onClick={() => setIsOpen(true)} /> }
        <HeadContainer>
          { user && (
          <UserParams>
            <UserAvatar style={{
              backgroundImage: `url(${API_URL}/images/user/${user.username})`
            }}/>
            <ProfileTextContainer>
              <ProfileTitle>Profile</ProfileTitle>
              <UserNickname
                onClick={() => navigate("/home")}
              >
                {user.username}
              </UserNickname>
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
      <LikedText>Favorite</LikedText>
      <LikedContainer>
        {subscribes.map((subscribe: any) => (
          <LikedTrackContainer key={++counter}>
            <LikedTrackIcon style={{
                backgroundImage: `url(${API_URL}/images/user/${subscribe})`
              }} 
            />
          {subscribe}
        </LikedTrackContainer>
        ))}
      </LikedContainer>
    </UserContainer>
  );
};  