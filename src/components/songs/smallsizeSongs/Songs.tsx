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
import { searchUsersStore } from "../../../stores/toSearchUsers.mobx";

export const Songs: React.FC = observer(() => {
  const [isLiked, setIsLiked] = useState<boolean[]>(Array(songs.container.length).fill(false));
  const navigate = useNavigate();

  const isLikedSong = songs.container.some(existingSong => 
    likedSongs.songs.some(likedSong => 
      likedSong.songId === existingSong.songId
    )
  );

  const handleLikedSong = async (song: ISongData) => {
    try {
      if(!isLikedSong) {
        await likedSongs.like(song)
        
        console.log('song disliked');
      }else{
        await likedSongs.dislike(song);
        
        console.log('song liked');
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    likedSongs.setSongs();
    songs.getSongs(searchUsersStore.username, true);
  }, []);

  useEffect(() => {
    songs.container.map((existingSong, index) =>
      setIsLiked(prevState => {
        const newState = [...prevState];
        newState[index] = likedSongs.songs.some(song => existingSong.songId === song.songId);
        return newState;
      })
    );
  }, [likedSongs.songs]);

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
            $isLiked={isLiked[index]}
            onClick={() => handleLikedSong(song)}
          />
        </SongContainer>
      )) : null}
    </>
  )
});