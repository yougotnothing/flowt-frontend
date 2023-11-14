import React, { useState, useEffect } from "react";

import {
  Container,
  SearchSongs,
  PlaylistInfo,
  PlaylistIcon,
  AddSongs,
  PlaylistContainer,
  InfoContainer,
  CreatorName,
  Input,
  SearchSongsContainer,
  SearchSongsNav,
  InputContainer,
  Navbar,
  NavItem,
  CreatePlaylist, NavItemContainer, Song, SongIcon, SongStats, SongInfo, SongStatsContainer, SongContainer, SongMainInfo
} from "./Playlist.styled";
import { observer } from "mobx-react-lite";
import { userUsernameStore } from "../../../stores/toChangeUsername";
import { playlistsStore as playlist } from "../../../stores/toPlaylists";
import { searchStore as search } from "../../../stores/toSearch";
import settings from "../../../json/playlistSettings.json";
import { API_URL } from "../../../api/axiosConfig";

export const Playlist: React.FC = observer(() => {
  const[isApply, setIsApply] = useState<boolean>(false);
  const[isNull, setIsNull] = useState<boolean>(true);
  const[param, setParam] = useState<string>("All");

  const handleSetAvatar = (e: any) => {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);
    playlist.setAvatar(image);
    setIsApply(true);
  }

  useEffect(() => {
    playlist.search('All');
  }, []);

  return (
    <Container>
      <PlaylistContainer>
        <Input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleSetAvatar}
        />
        <PlaylistIcon $avatar={playlist.avatar} htmlFor="avatar" $isApply={isApply} />
        <InfoContainer>
          <CreatorName>{userUsernameStore.username}</CreatorName>
          <PlaylistInfo
            $isNull={isNull}
            placeholder="Name"
            $type="name"
          />
          <PlaylistInfo
            $isNull={isNull}
            placeholder="Description"
            $type="description"
          />
        </InfoContainer>
        <CreatePlaylist>Create</CreatePlaylist>
      </PlaylistContainer>
      <SearchSongsContainer>
        <SearchSongsNav>
          <NavItemContainer>
            {settings.map((setting, index) => (
              <NavItem key={index} onClick={() => setParam(setting)}>
                {setting}
              </NavItem>
            ))}
          </NavItemContainer>
          <InputContainer>
            <SearchSongs placeholder="Search" />
            <AddSongs />
          </InputContainer>
        </SearchSongsNav>
        <SongContainer>
          {playlist.songs.map((song, index) => (
            <Song key={index}>
              <SongStatsContainer>
                <SongStats>{++index}</SongStats>
                <SongIcon style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${song.author}/${song.name}`)})`}}/>
                <SongMainInfo>
                  <SongInfo>{song.author}</SongInfo>
                  <SongInfo>{song.name}</SongInfo>
                </SongMainInfo>
              </SongStatsContainer>
              <SongInfo>{song.genre}</SongInfo>
              <SongStatsContainer>
                <SongStats>listens: {song.listens}</SongStats>
                <SongStats>liked</SongStats>

              </SongStatsContainer>
            </Song>
          ))}
        </SongContainer>
      </SearchSongsContainer>
    </Container>
  );
});