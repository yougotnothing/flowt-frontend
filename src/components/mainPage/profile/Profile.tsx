import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import {
  UserContainer,
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
  SongMainContainer,
  SubscribeText,
  SubscribeTextContainer
} from "./Profile.styled";

import { Options } from "./options/Options";
import { PageLoader } from "../../loader/pageLoader/PageLoader";
import { observer } from "mobx-react-lite";
import { Songs } from "../../songs/smallsizeSongs/Songs";
import { searchUsersStore as searchUsers } from "../../../stores/toSearchUsers.mobx";
import { IUserProps } from "../../../types/props";
import { playlistsStore } from "../../../stores/toPlaylists.mobx";
import { user } from "../../../stores/toUser.mobx";
import { Title as Helmet } from "../../../helmet";

export const Profile: React.FC = observer(() => {
  const[isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    playlistsStore.getPlaylists();
    searchUsers.getData();
    
    if(searchUsers.username !== user.username) {
      user.getSubscribes(searchUsers.username);
      user.getFollowers(searchUsers.username);
    }else{
      user.getFollowers();
      user.getSubscribes();
    }
  }, []);

  useEffect(() => {
    if(searchUsers.username === user.username) {
      setIsCurrentUser(true);
    }else{
      setIsCurrentUser(false);
    }
  }, [searchUsers.username, user.username]);

  return (
    <UserContainer>
      <Helmet title={`Profile: ${searchUsers.username}`} />
      {!user.isUserAuthenticated && <PageLoader />}
        <Options isCurrentUser={isCurrentUser} />
        {user.user && user.followers && user.subscribes && (
        <>
          <HeadContainer>
            <UserParams>
              <UserAvatar $isHaveAvatar={searchUsers.userHaveAvatar} $avatar={searchUsers.avatar} />
              <ProfileTextContainer>
                <ProfileTitle>Profile</ProfileTitle>
                <UserNickname onClick={() =>
                  navigate(generatePath('/account/:id/change-username', { id: searchUsers.username }))
                }>
                  {searchUsers.username}
                </UserNickname>
                <ProfileTitle>{searchUsers.region}</ProfileTitle>
                <LinksContainer>
                  <FollowsSubscribes onClick={() =>
                    navigate(generatePath('/profile/:id/followers', { id: searchUsers.username }))
                  }>
                    Followers: {user.followers.length}
                  </FollowsSubscribes>
                  <FollowsSubscribes onClick={() =>
                    navigate(generatePath('/profile/:id/subscribes', { id: searchUsers.username }))
                  }>
                    Subscribes: {user.subscribes.length}
                  </FollowsSubscribes>
                </LinksContainer>
              </ProfileTextContainer>
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
            {user.subscribes.map((subscribe: IUserProps, index: number) => (
              <LikedTrackContainer key={index}>
                {subscribe.userHaveAvatar ?
                  <LikedTrackIcon style={{backgroundImage: `url(${subscribe.avatar})`}} />
                  :
                  <LikedTrackIcon style={{backgroundImage: 'url(/defaultAvatar.png)'}} />
                }
                <SubscribeTextContainer>
                  <SubscribeText $type="Username">{subscribe.username}</SubscribeText>
                  <SubscribeText $type="Region">{subscribe.region}</SubscribeText>
                </SubscribeTextContainer>
              </LikedTrackContainer>
            ))}
          </LikedContainer>
        </>
      )}
    </UserContainer>
  );
});