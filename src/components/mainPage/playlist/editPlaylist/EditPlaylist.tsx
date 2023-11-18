import React from "react";

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
import { PlaylistItems } from "../playlistItems";
import { editPlaylistStore as editPlaylist } from "../../../../stores/toEditPlaylist.mobx";
import settings from "../../../../json/playlistSettings.json";

export const EditPlaylist: React.FC = observer(() => {

  return (
    <Container>
      <PlaylistContainer $isEditing>
        <Icon $isEditing $username={editPlaylist.username} $name={editPlaylist.name} />
        <PlaylistInfoContainer>
          <Info $type="name">{editPlaylist.name}</Info>
          <Info $type="username">{usernameStore.username}</Info>
        </PlaylistInfoContainer>
        <PlaylistButton>Play</PlaylistButton>
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