import React, { useEffect, useState } from "react";

import {
  ListenButton,
  Container,
  DataContainer,
  DataInfo,
  SongAvatar,
  UserName,
  StatsIcon,
  StatsInfo,
  StatsInfoContainer,
  StatsContainer
} from "./FullsizeSongs.styled";
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { api, API_URL } from "../../../api/axiosConfig";
import { URLS } from "../../../constants/urls.const";
import { observer } from "mobx-react-lite";
import { generatePath, useNavigate } from "react-router-dom";
import { user } from "../../../stores/toUser.mobx";
import { searchStore } from "../../../stores/toSearch.mobx";

export const FullsizeSongs: React.FC = observer(() => {
  const navigate = useNavigate();
  const url = new URLS();

  const getSong = async () => {
    try {
      const response = await api.get(url.songs);
      songs.getInfo(response.data.songs);
      console.log(response.data);
    }catch(error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSong();
  }, []);

  return (
    <>
      {songs.container.map((song, index) => (
        <Container key={index}>
          <SongAvatar style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${user.username}/${song.name}`)})`}} />
          <DataContainer>
            <UserName onClick={() => navigate(generatePath('/profile/:id', {id: user.username}))}>
              {user.username}
            </UserName>
            <DataInfo onClick={() => {
                searchStore.setSong(song);
                localStorage.setItem('song', JSON.stringify(song));
                navigate(generatePath('/song/:id', { id: song.name }));
              }}
            >{song.name}</DataInfo>
            <StatsContainer>
              <StatsInfoContainer>
                <StatsIcon style={{backgroundImage: 'url(/play.png)'}} />
                <StatsInfo>{song.listens}</StatsInfo>
              </StatsInfoContainer>
              <StatsInfoContainer>
                <StatsIcon style={{backgroundImage: 'url(/like.png)'}} />
                <StatsInfo>liked</StatsInfo>
              </StatsInfoContainer>
            </StatsContainer>
          </DataContainer>
          <ListenButton onClick={() => songs.setSong(index)} />
        </Container>
      ))}
    </>
  );
});