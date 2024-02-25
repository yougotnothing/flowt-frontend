import React, { useEffect, useLayoutEffect, useState } from "react";

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
import { api } from "../../../api/axiosConfig";
import { user } from "../../../stores/toUser.mobx";
import { searchStore } from "../../../stores/toSearch.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { ISongData } from "../../../types/types";

export const Songs: React.FC = observer(() => {
  const navigate = useNavigate();
  const isLikedSong = songs.container.some(existingSong => 
    likedSongs.songs.some(likedSong => 
      likedSong.songId === existingSong.songId
    )
  );
  

  const handleLikedSong = async (song: ISongData) => {
    try {
      const { name, author } = song as ISongData;
      if(!isLikedSong) {
        await api.post(`/liked/${author}/${name}`);
        
        console.log('song disliked');
      }else{
        await api.delete(`/liked/${author}/${name}`);
        
        console.log('song liked');
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    likedSongs.setSongs();
  }, []);

  return (
    <>
      {user.username ? songs.container.map((song, index) => (
        <SongContainer key={index}>
          <SongImage $song={song}>
            <SongButton onClick={() => {
              if(user.username) {
                songs.patchSong(song);
                songs.setSong(index)}
              }}
            />
          </SongImage>
          <SongData>
            <SongTitle
              onClick={() => navigate(generatePath('/profile/:id', { id: user.username }))}
            >{song.author}</SongTitle>
            <SongTitle
              onClick={() => {
                searchStore.setSong(song);
                localStorage.setItem('song', JSON.stringify(song));
                navigate(generatePath('/song/:id', { id: song.name }));
              }}
            >{song.name}</SongTitle>
            <SongStatsContainer>
              <Stats>
                <SongListensIcon />
                <StatsTitle>{song.listens}</StatsTitle>
              </Stats>
              <Stats>
                <SongLikedIcon />
                <StatsTitle>{song.likes}</StatsTitle>
              </Stats>
            </SongStatsContainer>
          </SongData>
          <LikeSongButton
            disabled={song.author === user.username}
            $isLiked={likedSongs.songs.length > 0 ? isLikedSong : false}
            onClick={() => handleLikedSong(song)}
          />
        </SongContainer>
      )) : null}
    </>
  )
});