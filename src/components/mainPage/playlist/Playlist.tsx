import React, { useState, useEffect } from "react";

import { api, API_URL } from "../../../api/axiosConfig";
import {
  PlaylistContainer,
  PlaylistName,
  PlaylistText,
  TitleImage,
  TextContainer,
  OpenPlaylistButton,
  OpenPlaylistContainer
} from "./Playlist.styled";
import { useSongContext } from "../../../contexts/SongContext";
import { useUserContext } from "../../../contexts/UserContext";

export const Playlist: React.FC = () => {
  const[songs, setSongs] = useState<any>(null);
  const[songAvatar, setSongAvatar] = useState<string | null>(null);
  const { setSongURL, setSongName } = useSongContext();
  const { user } = useUserContext();
  let counter: number = 0;

  const getUserSongs = async () => {
    const response = await api.get(`/users/songs`);
    setSongs(response.data.songs);
  }

  useEffect(() => {
    getUserSongs();
  }, []);

  return (
    <>
      {user && songs ? songs.map((song: any) => {
        return (
          <PlaylistContainer key={++counter}>
            <TitleImage style={{backgroundImage: `url(${API_URL}/images/song/${user.username}/${song.name})`}}/>
            <TextContainer>
              <PlaylistName>{user.username}</PlaylistName>
              <PlaylistText>{song.name}</PlaylistText>
            </TextContainer>
            <OpenPlaylistContainer>
              <OpenPlaylistButton
                onClick={() => {
                  setSongURL && setSongURL(`${API_URL}/songs/audio/${user.username}/${song.name}`);
                  setSongName && setSongName(song.name);
                }}>
                Listen
              </OpenPlaylistButton>
            </OpenPlaylistContainer>
          </PlaylistContainer>
        )}
      ) : null}
    </>
  );
}