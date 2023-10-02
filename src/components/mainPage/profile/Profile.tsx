import React, { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { API_URL } from "../../../api/axiosConfig";
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
  BorderContainer
} from "./Profile.styled";

import { Options } from "./options/Options";
import { PageLoader } from "../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../contexts/UserContext";
import { observer } from "mobx-react-lite";
import { userStore } from "../../../store/toUserParams";

export const Profile: React.FC = observer(() => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, followers, subscribes } = useUserContext();
  let counter: number = 0;

  return (
    <UserContainer>
      {!user && <PageLoader />}
      {isVisible ? <Options $isVisible={isVisible} /> :
        <Settings onClick={() => setIsVisible(true) } />}
        <HeadContainer>
          {user && (
            <UserParams>
              {user.username ?
                <UserAvatar style={{backgroundImage: `url(${userStore.avatar})`}} />
                  :
                <UserAvatar style={{backgroundImage: 'url(/defaultAvatar.png)'}} />}
              <ProfileTextContainer>
                <ProfileTitle>Profile</ProfileTitle>
                <UserNickname onClick={() =>
                  navigate(generatePath('/account/:id/change-username', { id: user.username }))
                }>
                  {user.username}
                </UserNickname>
                <ProfileTitle>{user.region}</ProfileTitle>
                <LinksContainer>
                  <FollowsSubscribes onClick={() =>
                    navigate(generatePath('/profile/:id/followers', { id: user.username }))
                  }>
                    Followers: {followers.length}
                  </FollowsSubscribes>
                  <FollowsSubscribes onClick={() =>
                    navigate(generatePath('/profile/:id/subscribes', { id: user.username }))
                  }>
                    Subscribes: {subscribes.length}
                  </FollowsSubscribes>
                </LinksContainer>
              </ProfileTextContainer>
            </UserParams>
          )}
        </HeadContainer>
        <BorderContainer> </BorderContainer>
        <DescriptionContainer>
          <DescriptionTitle>Description</DescriptionTitle>
          <Description>{user.description}</Description>
        </DescriptionContainer>
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
    </UserContainer>
  );
});