import { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";

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

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const[user, setUser] = useState<any>(null);
  const[subscribes, setSubscribes] = useState<any>([]);
  const[followers, setFollowers] = useState<any>([]);
  let followersURL: string;
  let subscribersURL: string;
  
  if(user) {
    followersURL = generatePath('/profile/:id/followers', { id: `${user.username}` });
    subscribersURL = generatePath('/profile/:id/subscribes', { id: `${user.username}` })
  };

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
    if(user !== null) {
      if(user.status === 401) window.location.reload();
    }
  }, []);

  return (
    <UserContainer>
        <HeadContainer>
          <Settings />
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
                <FollowsSubscribes onClick={() => navigate(followersURL)}>
                  Followers {followers.length}
                </FollowsSubscribes>
                <FollowsSubscribes onClick={() => navigate(subscribersURL)}>
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
            <LikedTrackContainer key={subscribe.id}>
              <LikedTrackIcon style={{
                  backgroundImage: `url(${API_URL}/images/user/${subscribe})`
                }} 
              />
            {subscribes}
          </LikedTrackContainer>
          ))}
      </LikedContainer>
    </UserContainer>
  );
};  