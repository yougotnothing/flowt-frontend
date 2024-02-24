import React, { useEffect, useRef, useState } from "react";

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
import { useNavigate, generatePath, useLocation } from "react-router-dom";
import { Options } from "./options/Options";
import { PageLoader } from "../../loader/pageLoader/PageLoader";
import { observer } from "mobx-react-lite";
import { Songs } from "../../songs/smallsizeSongs/Songs";
import { searchUsersStore as searchUsers } from "../../../stores/toSearchUsers.mobx";
import { IUserProps } from "../../../types/props";
import { playlistsStore } from "../../../stores/toPlaylists.mobx";
import { user } from "../../../stores/toUser.mobx";
import { Title as Helmet } from "../../../helmet";
import { userSongsStore } from "../../../stores/toSongs.mobx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Breakpoints } from "./swiper-breakpoints";
import { formatNumbers } from "../functions";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";

export const Profile: React.FC = observer(() => {
  const[isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const[isFetching, setIsFetching] = useState<boolean>(true);
  const[isLiked, setIsLiked] = useState<Array<boolean>>(Array(userSongsStore.getSongs.length).fill(false));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    playlistsStore.getPlaylists();
    searchUsers.getData();
  }, []);

  useEffect(() => {
    if(location.pathname === `/profile/${user.username}`) searchUsers.setUser(user.user);
  }, [location.pathname]);

  useEffect(() => {
    if(searchUsers.username === user.username) {
      setIsCurrentUser(true);
    }else{
      setIsCurrentUser(false);
    }
  }, [searchUsers.username, user.username]);

  useEffect(() => {
    userSongsStore.getSongs(searchUsers.username);

    if(searchUsers.username !== user.username) {
      user.getSubscribes(searchUsers.username);
      user.getFollowers(searchUsers.username);
    }else{
      user.getFollowers();
      user.getSubscribes();
    }
    setIsFetching(false);
  }, [searchUsers.username]);

  useEffect(() => {
    likedSongs.setSongs();
  }, []);
  

  return (
    <>
      {isFetching ? <PageLoader /> : (
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
                        Followers: {formatNumbers(user.followers.length.toString())}
                      </FollowsSubscribes>
                      <FollowsSubscribes onClick={() =>
                        navigate(generatePath('/profile/:id/subscribes', { id: searchUsers.username }))
                      }>
                        Subscribes: {formatNumbers(user.subscribes.length.toString())}
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
                {userSongsStore.container.length ? (
                  <SongMainContainer>
                    <SongsTitle>Songs</SongsTitle>
                    <SongContainer>
                      <Songs />
                    </SongContainer>
                  </SongMainContainer>
                ) : null}
              </FooterContainer>
              {user.subscribes.length ? (
                <>
                  <LikedText>Favorite</LikedText>
                  <LikedContainer>
                    <Swiper
                      className="swiper-wrapper"
                      slidesPerView={4}
                      spaceBetween={60}
                      breakpoints={Breakpoints}
                      direction="horizontal"
                      navigation
                      modules={[Navigation]}
                      >
                      {user.subscribes.map((subscribe: IUserProps, index: number) => (
                        <SwiperSlide key={index}>
                          <LikedTrackContainer
                            onClick={() => {
                              searchUsers.setUser(subscribe);
                              user.getFollowers(subscribe.username);
                              user.getSubscribes(subscribe.username);
                              navigate(generatePath('/profile/:id', { id: subscribe.username }));
                            }}
                          >
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
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </LikedContainer>
                </>
              ) : null}
            </>
          )}
        </UserContainer>
      )}
    </>
  );
});