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
import { useUserContext } from "../../../contexts/UserContext";
import { userSongsStore as songs } from "../../../store/toSongs";
import { ISongData } from "../../../types/types";
import { observer } from "mobx-react-lite";
import { URLS } from "../../../constants/urls.const";

export const Playlist: React.FC = observer(() => {
  const { user } = useUserContext();
  const url = new URLS();

  const getUserSongs = async () => {
    try {
      const response = await api.get(url.songs);
      songs.getInfo(response.data.songs);
      console.log(songs.container);
    }catch(error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserSongs();
  }, []);

  return (
    <>
      {user ? songs.container.map((song: ISongData, index: number) => {
        return (
          <PlaylistContainer key={index}>
            <TitleImage style={{backgroundImage: `url(${API_URL}/images/song/${user.username}/${song.name})`}}/>
            <TextContainer>
              <PlaylistName>{user.username}</PlaylistName>
              <PlaylistText>{song.name}</PlaylistText>
            </TextContainer>
            <OpenPlaylistContainer>
              <OpenPlaylistButton
                onClick={() => songs.setSong(index, user.username)}>
                Listen
              </OpenPlaylistButton>
            </OpenPlaylistContainer>
          </PlaylistContainer>
        )}
      ) : null}
    </>
  );
});