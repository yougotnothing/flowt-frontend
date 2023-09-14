import React, { useState, useEffect } from "react";

import { api, API_URL, getUser } from "../../../api/axiosConfig";
import {
  PlaylistContainer,
  PlaylistName,
  PlaylistText,
  TitleImage,
  TextContainer,
  OpenPlaylistButton,
  OpenPlaylistContainer
} from "./Playlist.styled";
import { useSongURL } from "../../../contexts/SongsContext";

export const Playlist: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[songs, setSongs] = useState<any>(null);
  const[songUrl, setSongUrl] = useState<any>(null);
  const { setSongURL, setSongName, songName } = useSongURL();
  const [songAvatar, setSongAvatar] = useState<any>(null);
  let counter: number = 0;

  const getUserSongs = async () => {
    const response = await api.get(`/users/songs`);
    setSongs(response.data.songs);
  }

  useEffect(() => {
    getUser(setUser);
    getUserSongs();
  }, []);

  return (
    <>
      {user && songs ? songs.map((song: any) => (
        <PlaylistContainer key={++counter}>
          <TitleImage style={{backgroundImage: `url(${API_URL}/images/song/${user.username}/${song.name})`}}/>
          <TextContainer>
            <PlaylistName>{user.username}</PlaylistName>
            <PlaylistText>{song.name}</PlaylistText>
          </TextContainer>
          <OpenPlaylistContainer>
            <OpenPlaylistButton onClick={
              () => {
                setSongURL && setSongURL(`${API_URL}/songs/audio/${user.username}/${song.name}`);
                setSongName && setSongName(song.name);
              }}>
              Listen
            </OpenPlaylistButton>
          </OpenPlaylistContainer>
        </PlaylistContainer>
      )) : null}
    </>
  );
}