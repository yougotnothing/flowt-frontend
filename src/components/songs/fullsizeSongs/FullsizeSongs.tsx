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
import { useUserContext } from "../../../contexts/UserContext";
import { userSongsStore as songs } from "../../../store/toSongs";
import { ISongData } from "../../../types/types";
import { api, API_URL } from "../../../api/axiosConfig";
import { URLS } from "../../../constants/urls.const";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const FullsizeSongs: React.FC = observer(() => {
  const[isLiked, setIsLiked] = useState<boolean[]>(
    Array(songs.container.length).fill(false)
  );
  const navigate = useNavigate();
  const url = new URLS();
  const { user } = useUserContext();

  const getSong = async () => {
    try {
      const response = await api.get(url.songs);
      songs.getInfo(response.data.songs);
      console.log(songs.container);
    }catch(error: any) {
      console.log(error);
    }
  }

  const handleLikedSong = async (song_name: string | null, username: string | null, index: number) => {
    try {
      if(!isLiked[index]) {
        await api.post( `/liked/${username}/${song_name}`);
        setIsLiked((prevState) => {
          const updatedStates = [...prevState];
          updatedStates[index] = true;
          return updatedStates;
        });
      }else{
        await api.delete(`/liked/${username}/${song_name}`);
        setIsLiked((prevState) => {
          const updatedStates = [...prevState];
          updatedStates[index] = false;
          return updatedStates;
        });
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSong();
  }, []);

  return (
    <>
      {songs.container.map((song: ISongData, index: number) => (
        <Container key={index}>
          <SongAvatar style={{backgroundImage: `url(${API_URL}/images/song/${user.username}/${song.name})`}} />
          <DataContainer>
            <UserName>{user.username}</UserName>
            <DataInfo>{song.name}</DataInfo>
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
          <ListenButton onClick={() => songs.setSong(index, song.name)} />
        </Container>
      ))}
    </>
  );
});