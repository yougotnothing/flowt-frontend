import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

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
  LikedTrackIcon,
  Description,
  DescriptionContainer,
  DescriptionTitle,
  BorderContainer,
  FooterContainer,
  SongContainer,
  SongsTitle,
  SongMainContainer, SubscribeButton
} from "./Profile.styled";

import { Options } from "./options/Options";
import { PageLoader } from "../../loader/pageLoader/PageLoader";
import { observer } from "mobx-react-lite";
import { userUsernameStore as usernameStore } from "../../../stores/toChangeUsername";
import { useUserContext } from "../../../contexts/UserContext";
import { Songs } from "../../songs/smallsizeSongs/Songs";
import { searchUsersStore as searchUsers } from "../../../stores/toSearchUsers";

export const Profile: React.FC = observer(() => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const[isOpen, setIsOpen] = useState(true);
  const[isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, followers, subscribes } = useUserContext();
  let counter: number = 0;

  useEffect(() => {
    setIsOpen(!isVisible);
  }, [isVisible, isOpen]);

  useEffect(() => {
    if(user && user.username !== searchUsers.username) {
      setIsCurrentUser(true);
    }else{
      setIsCurrentUser(false);
    }
  }, [searchUsers.username]);

  const handleSubscribe = async () => {
    try {
      if(user && user.username !== searchUsers.username) {
        const response = await api.post(`/users/subscribe/${searchUsers.username}`);

        if(response.status === 200) {
          console.log(`successfully subscribed to ${searchUsers.username}`);
        }
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  return (
    <UserContainer>
      {!user && <PageLoader />}
        {isVisible
          ? <Options $isVisible={isVisible} />
          : <Settings $isVisible={isOpen} onClick={() => setIsVisible(true)} />
        }
        {user && followers && subscribes && (
          <>
          <HeadContainer>
            <UserParams>
              {user.username 
                ? <UserAvatar style={{backgroundImage: `url(${searchUsers.avatar})`}} />
                : <UserAvatar style={{backgroundImage: 'url(/defaultAvatar.png)'}} />}
              <ProfileTextContainer>
                <ProfileTitle>Profile</ProfileTitle>
                <UserNickname onClick={() =>
                  navigate(generatePath('/account/:id/change-username', { id: usernameStore.username }))
                }>
                  {searchUsers.username}
                </UserNickname>
                <ProfileTitle>{searchUsers.region}</ProfileTitle>
                <LinksContainer>
                  <FollowsSubscribes onClick={() =>
                    navigate(generatePath('/profile/:id/followers', { id: usernameStore.username }))
                  }>
                    Followers: {followers.length}
                  </FollowsSubscribes>
                  <FollowsSubscribes onClick={() =>
                    navigate(generatePath('/profile/:id/subscribes', { id: usernameStore.username }))
                  }>
                    Subscribes: {subscribes.length}
                  </FollowsSubscribes>
                </LinksContainer>
              </ProfileTextContainer>
              <SubscribeButton $isVisible={isCurrentUser} onClick={handleSubscribe}>
                subscribe
              </SubscribeButton>
            </UserParams>
          </HeadContainer>
          <BorderContainer> </BorderContainer>
          <FooterContainer>
            <DescriptionContainer>
              <DescriptionTitle>Description</DescriptionTitle>
              <Description>{searchUsers.description}</Description>
            </DescriptionContainer>
            <SongMainContainer>
              <SongsTitle>Songs</SongsTitle>
              <SongContainer>
                <Songs />
              </SongContainer>
            </SongMainContainer>
          </FooterContainer>
          <LikedText>Favorite</LikedText>
          <LikedContainer>
            {subscribes.map((subscribe: string) => (
              <LikedTrackContainer key={++counter}>
                {subscribe ?
                  <LikedTrackIcon style={{backgroundImage: `url(${API_URL}/images/user/${subscribe})`}} />
                  :
                  <LikedTrackIcon style={{backgroundImage: 'url(defaultAvatar.png)'}} />
                }
                {subscribe}
              </LikedTrackContainer>
            ))}
          </LikedContainer>
        </>
      )}
    </UserContainer>
  );
});