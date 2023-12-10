import React, { useEffect, useState } from "react";

import { useNavigate, generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { A, AContainer } from "../../MainPage.styled";
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
  Droplist,
  DroplistItemsContainer,
  DroplistItem
} from "../Account.styled";
import {
  Container,
  PlaylistIcon,
  PlaylistButton,
  PlaylistInfo,
  PlaylistInfoContainer
} from "../../playlist/large/Playlist.styled";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { userDescriptionStore as descriptionStore } from "../../../../stores/toChangeDescription.mobx";
import { FullsizeSongs } from "../../../songs/fullsizeSongs/FullsizeSongs";
import { playlistsStore as playlists } from "../../../../stores/toPlaylists.mobx";
import { editPlaylistStore as editPlaylist } from "../../../../stores/toEditPlaylist.mobx";
import accountSettingsData from "../../../../json/accountSettingsDroplist.json";
import { user as $ } from "../../../../stores/toUser.mobx";

export const AccountInfo: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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
      {!$.isUserAuthenticated && <PageLoader />}
      <InfoContainer>
        <Title>Your info</Title>
        {$.isUserAuthenticated && (
          <UserContainer>
            <Droplist onClick={() => setIsOpen(!isOpen)} />
            <DroplistItemsContainer $isOpen={isOpen}>
              {accountSettingsData.map((setting, index) => (
                <DroplistItem
                  key={index}
                  $isOpen={isOpen}
                  disabled={!isOpen}
                  onClick={() => navigate(generatePath(`/account/:id/${setting.url}`, { id: $.username }))}
                >{setting.type}</DroplistItem>
              ))}
            </DroplistItemsContainer>
            <UserAvatar style={{backgroundImage: `url(${$.avatar})`}}/>
            <UserInfo>
              <Username>{$.username}</Username>
              <StatsContainer>
                <Email>{$.email && $.email.trim()}</Email>
                <Region>{$.region}</Region>
              </StatsContainer>
              <ButtonsContainer>
                <AContainer>
                  <A
                    onClick={() => navigate(generatePath("/profile/:id/followers", {id: $.username}))}>
                    followers: {$.followers.length}
                  </A>
                </AContainer>
                <AContainer>
                  <A
                    onClick={() => navigate(generatePath("/profile/:id/subscribes", {id: $.username}))}>
                    subscribes: {$.subscribes.length}
                  </A>
                </AContainer>
              </ButtonsContainer>
            </UserInfo>
          </UserContainer>
        )}
        <DescriptionTitle>Your description</DescriptionTitle>
        <DescriptionContainer>
          {$.isUserAuthenticated && descriptionStore.description ? 
            <Description>{descriptionStore.description}</Description>
            :
            <Description>No description</Description>
          }
        </DescriptionContainer>
        {$.isUserAuthenticated && (
          <PlaylistContainer>
            <FullsizeSongs />
          </PlaylistContainer>
        )}
        {playlists.self.map((item, index) => (
          <Container $isEditing={editPlaylist.isEditing} key={index}>
            <PlaylistIcon
              $isEditing={editPlaylist.isEditing} 
              $username={$.username} 
              $name={item.name}
            />
            <PlaylistInfoContainer>
              <PlaylistInfo $type="name">{item.name}</PlaylistInfo>
              <PlaylistInfo $type="username">{$.username}</PlaylistInfo>
            </PlaylistInfoContainer>
            <PlaylistButton onClick={() => handleRedirectToEditPlalist(item.name, $.username)}>
              Open
            </PlaylistButton>
          </Container>
        ))}
      </InfoContainer>
    </AccountContainer>
  );
});