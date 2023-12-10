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
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { api, API_URL } from "../../../api/axiosConfig";
import { user } from "../../../stores/toUser.mobx";

export const Songs: React.FC = observer(() => {
  const[isLiked, setIsLiked] = useState<boolean[]>(
    Array(songs.container.length).fill(false)
  );
  const navigate = useNavigate();

  const getSong = async () => {
    try {
      const response = await api.get('/users/songs');
      songs.getInfo(response.data.songs);
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
      {user.username ? songs.container.map((song, index) => (
        <SongContainer key={index}>
          <SongImage style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${user.username}/${song.name}`)})`}}>
            <SongButton onClick={() => {
              if(user.username) {
                songs.patchSong(song);
                songs.setSong(index, encodeURI(user.username))}
              }}
            />
          </SongImage>
          <SongData>
            <SongTitle
              onClick={() => navigate(generatePath('/profile/:id', { id: user.username }))}
            >
              {song.author}
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