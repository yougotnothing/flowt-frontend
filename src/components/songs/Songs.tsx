import React, { useEffect, useState } from "react";

import { useNavigate, generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { SongContainer, SongImage, SongData, SongTitle, SongButton } from "./Songs.styled";
import { userSongsStore as songs } from "../../store/toSongs";
import { useUserContext } from "../../contexts/UserContext";
import { ISongData } from "../../types/types";
import { api, API_URL } from "../../api/axiosConfig";

export const Songs: React.FC = observer(() => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const getSong = async () => {
    try {
      const response = await api.get(`/users/songs`);
      songs.getInfo(response.data.songs);
      console.log(songs.container);
    }catch(error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSong();
  }, []);

  return (
    <>
      {user ? songs.container.map((song: ISongData, index: number) => {
      return (
        <SongContainer key={index}>
          <SongImage style={{backgroundImage: `url(${API_URL}/images/song/${user.username}/${song.name})`}}>
            <SongButton onClick={() => songs.setSong(index, user.username)} />
          </SongImage>
          <SongData>
            <SongTitle>{user.username}</SongTitle>
            <SongTitle>{song.name}</SongTitle>
          </SongData>
        </SongContainer>
      )}) : null}
    </>
  )
});