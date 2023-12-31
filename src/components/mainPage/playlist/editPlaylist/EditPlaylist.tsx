import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import {
  AddSongs, 
  Container, 
  InputContainer, 
  NavItem, 
  NavItemContainer, 
  SearchSongs, 
  SearchSongsContainer, 
  SearchSongsNav 
} from "../Playlist.styled";
import {
  PlaylistInfoContainer,
  PlaylistButton,
  PlaylistInfo as Info,
  Container as PlaylistContainer,
  PlaylistIcon as Icon
} from "../large/Playlist.styled";
import { userUsernameStore as usernameStore } from "../../../../stores/toChangeUsername.mobx";
import { PlaylistItems } from "../Playlist-Items";
import { editPlaylistStore as editPlaylist } from "../../../../stores/toEditPlaylist.mobx";
import settings from "../../../../json/playlistSettings.json";
import { playlistsStore as playlist } from "../../../../stores/toPlaylists.mobx";
import { userSongsStore as songs } from "../../../../stores/toSongs.mobx";
import { user } from "../../../../stores/toUser.mobx";

export const EditPlaylist: React.FC = observer(() => {

  useEffect(() => {
    playlist.search('All');
    editPlaylist.setEditing(true);
    
    const playlistName = sessionStorage.getItem('name');
    const playlistUsername = sessionStorage.getItem('username');

    if(playlistName) playlist.setInput(playlistName);
    editPlaylist.setData(playlistName, playlistUsername);
  }, []);

  return (
    <Container>
      <PlaylistContainer $isEditing={editPlaylist.isEditing}>
        <Icon
          $isEditing={editPlaylist.isEditing}
          $username={editPlaylist.username}
          $name={editPlaylist.name}
        />
        <PlaylistInfoContainer>
          <Info $type="name">{editPlaylist.name}</Info>
          <Info $type="username">{usernameStore.username}</Info>
        </PlaylistInfoContainer>
        <PlaylistButton
          onClick={() => {
            songs.getInfo(playlist.songs);
            songs.setSong(0, playlist.songs[0].author);
          }}
        >Play</PlaylistButton>
      </PlaylistContainer>
      <SearchSongsContainer>
        <SearchSongsNav>
          <NavItemContainer>
            {settings.map((setting, index) => (
              <NavItem key={index}>
                {setting}
              </NavItem>
            ))}
          </NavItemContainer>
          <InputContainer>
            <SearchSongs placeholder="Search" />
            <AddSongs className="addSongs" />
          </InputContainer>
        </SearchSongsNav>
        <PlaylistItems />
      </SearchSongsContainer>
    </Container>
  )
});