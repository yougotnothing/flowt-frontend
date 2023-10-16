import React, { useEffect, useState } from "react";

import { generatePath, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  SongContainer,
  SongImage,
  SongData,
  SongTitle,
  SongButton,
  SongListensIcon,
  SongLikedIcon,
  SongStatsContainer,
  Stats,
  StatsTitle,
  LikeSongButton
} from "./Songs.styled";
import { userSongsStore as songs } from "../../../store/toSongs";
import { useUserContext } from "../../../contexts/UserContext";
import { ISongData } from "../../../types/types";
import { api, API_URL } from "../../../api/axiosConfig";

export const Songs: React.FC = observer(() => {
  const[isLiked, setIsLiked] = useState<boolean[]>(
    Array(songs.container.length).fill(false)
  );
  const { user } = useUserContext();
  const navigate = useNavigate();

  const getSong = async () => {
    try {
      const response = await api.get(`/users/songs`);
      songs.getInfo(response.data.songs);
      console.log(songs.container);
    }catch(error: any) {
      console.log(error);
    }
  }

  const handleLikedSong = async (SONG_NAME: string | null, USERNAME: string | null, index: number) => {
    try {
      if(!isLiked[index]) {
        await api.post( `/liked/${USERNAME}/${SONG_NAME}`);
        setIsLiked((prevState) => {
          const updatedStates = [...prevState];
          updatedStates[index] = true;
          return updatedStates;
        });
      }else{
        await api.delete(`/liked/${USERNAME}/${SONG_NAME}`);
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
      {user ? songs.container.map((song: ISongData, index: number) => (
        <SongContainer key={index}>
          <SongImage style={{backgroundImage: `url(${API_URL}/images/song/${user.username}/${song.name})`}}>
            <SongButton onClick={() => songs.setSong(index, user.username)} />
          </SongImage>
          <SongData>
            <SongTitle
              onClick={() => navigate(generatePath('/profile/:id', { id: user.username }))}
            >
              {user.username}
            </SongTitle>
            <SongTitle
              onClick={() => navigate(generatePath('/song/:id', { id: song.name }))}
            >
              {song.name}
            </SongTitle>
            <SongStatsContainer>
              <Stats>
                <SongListensIcon />
                <StatsTitle>{song.listens}</StatsTitle>
              </Stats>
              <Stats>
                <SongLikedIcon />
                <StatsTitle>liked</StatsTitle>
              </Stats>
            </SongStatsContainer>
          </SongData>
          <LikeSongButton
            style={{backgroundImage: isLiked[index] ? 'url(/like_hover.png)' : 'url(/like.png)'}}
            onClick={() => handleLikedSong(song.name, user.username, index)} />
        </SongContainer>
      )) : null}
    </>
  )
});