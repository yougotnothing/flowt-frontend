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
  BorderContainer,
  FooterContainer,
  SongContainer,
  SongsTitle,
  SongMainContainer
} from "./Profile.styled";

import { Options } from "./options/Options";
import { PageLoader } from "../../loader/pageLoader/PageLoader";
import { observer } from "mobx-react-lite";
import { userAvatarStore } from "../../../store/toChangeAvatar";
import { userUsernameStore } from "../../../store/toChangeUsername";
import { useUserContext } from "../../../contexts/UserContext";
import { Songs } from "../../songs/smallsizeSongs/Songs";

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
          {user && followers && subscribes && (
            <>
            <HeadContainer>
              <UserParams>
                {user.username ?
                  <UserAvatar style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
                    :
                  <UserAvatar style={{backgroundImage: 'url(/defaultAvatar.png)'}} />}
                <ProfileTextContainer>
                  <ProfileTitle>Profile</ProfileTitle>
                  <UserNickname onClick={() =>
                    navigate(generatePath('/account/:id/change-username', { id: userUsernameStore.username }))
                  }>
                    {user.username}
                  </UserNickname>
                  <ProfileTitle>{user.region}</ProfileTitle>
                  <LinksContainer>
                    <FollowsSubscribes onClick={() =>
                      navigate(generatePath('/profile/:id/followers', { id: userUsernameStore.username }))
                    }>
                      Followers: {followers.length}
                    </FollowsSubscribes>
                    <FollowsSubscribes onClick={() =>
                      navigate(generatePath('/profile/:id/subscribes', { id: userUsernameStore.username }))
                    }>
                      Subscribes: {subscribes.length}
                    </FollowsSubscribes>
                  </LinksContainer>
                </ProfileTextContainer>
              </UserParams>
            </HeadContainer>
            <BorderContainer> </BorderContainer>
            <FooterContainer>
              <DescriptionContainer>
                <DescriptionTitle>Description</DescriptionTitle>
                <Description>{user.description}</Description>
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