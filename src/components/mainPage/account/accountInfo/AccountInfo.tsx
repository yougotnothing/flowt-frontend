import React, { useEffect } from "react";

import { useNavigate, generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { A, AContainer } from "../../MainPage.styled";
import { AccountSettings } from "../AccountSettings";
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
  AccountContainer,
  PlaylistContainer,
} from "../Account.styled";
import {
  Container,
  PlaylistIcon,
  PlaylistButton,
  PlaylistInfo,
  PlaylistInfoContainer
} from "../../playlist/large/Playlist.styled";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../../contexts/UserContext";
import { userDescriptionStore as descriptionStore } from "../../../../stores/toChangeDescription.mobx";
import { userUsernameStore as usernameStore } from "../../../../stores/toChangeUsername.mobx";
import { userAvatarStore as avatarStore } from "../../../../stores/toChangeAvatar.mobx";
import { userRegionStore as regionStore } from "../../../../stores/toChangeRegion.mobx";
import { userEmailStore as emailStore } from "../../../../stores/toChangeEmail.mobx";
import { FullsizeSongs } from "../../../songs/fullsizeSongs/FullsizeSongs";
import { playlistsStore as playlists } from "../../../../stores/toPlaylists.mobx";
import { editPlaylistStore as editPlaylist } from "../../../../stores/toEditPlaylist.mobx";
import { searchUsersStore } from "../../../../stores/toSearchUsers.mobx";

export const AccountInfo: React.FC = observer(() => {
  const navigate = useNavigate();
  const { user, followers, subscribes } = useUserContext();

  useEffect(() => {
    playlists.getPlaylists();
    editPlaylist.setEditing(false);
  }, []);

  const handleRedirectToEditPlalist = (name: string | null, username: string | null) => {
    if(username && name) {
      editPlaylist.setEditing(true);
      editPlaylist.setData(name, username);

      sessionStorage.setItem('name', name);
      sessionStorage.setItem('username', username);
      
      navigate(generatePath('/:u/playlist/:n/edit-playlist', {
        u: username,
        n: name
      }));
    }
  }

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      <AccountSettings />
      <InfoContainer>
        <Title>Your info</Title>
        {user && followers && subscribes && (
          <UserContainer>
            <UserAvatar style={{ backgroundImage: `url(${avatarStore.avatar})` }}/>
            <UserInfo>
              <Username>{usernameStore.username}</Username>
              <StatsContainer>
                <Email>{emailStore.email && emailStore.email.trim()}</Email>
                <Region>{regionStore.region}</Region>
              </StatsContainer>
              <ButtonsContainer>
                <AContainer>
                  <A
                    onClick={() => navigate(generatePath("/profile/:id/followers", {id: user.username}))}>
                    followers: {followers.length}
                  </A>
                </AContainer>
                <AContainer>
                  <A
                    onClick={() => navigate(generatePath("/profile/:id/subscribes", {id: user.username,}))}>
                    subscribes: {subscribes.length}
                  </A>
                </AContainer>
              </ButtonsContainer>
            </UserInfo>
          </UserContainer>
        )}
        <DescriptionTitle>Your description</DescriptionTitle>
        <DescriptionContainer>
          {user && descriptionStore.description ? (
            <Description>{descriptionStore.description}</Description>
          ) :
            <Description>No description</Description>
          }
        </DescriptionContainer>
        {user && (
          <PlaylistContainer>
            <FullsizeSongs />
          </PlaylistContainer>
        )}
        {playlists.self.map((item, index) => (
          <Container $isEditing={editPlaylist.isEditing} key={index}>
            <PlaylistIcon
              $isEditing={editPlaylist.isEditing} 
              $username={usernameStore.username} 
              $name={item.name}
            />
            <PlaylistInfoContainer>
              <PlaylistInfo $type="name">{item.name}</PlaylistInfo>
              <PlaylistInfo $type="username">{usernameStore.username}</PlaylistInfo>
            </PlaylistInfoContainer>
            <PlaylistButton onClick={() => handleRedirectToEditPlalist(item.name, usernameStore.username)}>
              Open
            </PlaylistButton>
          </Container>
        ))}
      </InfoContainer>
    </AccountContainer>
  );
});