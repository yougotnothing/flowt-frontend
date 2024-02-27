import { FC, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import {
  Song, 
  SongInfo, 
  SongAvatar, 
  SongInfoContainer, 
  SongButton, 
  Container,
  SongDataContainer,
  SongData,
  SongDataSpan,
  ButtonsWrapper,
  SongDataWrapper,
  LikeButton,
} from "./Songs.styled";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { userSongsStore as songs, userSongsStore } from "../../../stores/toSongs.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as Helmet } from "../../../helmet";
import { user } from "../../../stores/toUser.mobx";
import { ISongData } from "../../../types/types";

export const BrowseSongs: FC = observer(() => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeSong = async (song: ISongData | null) => {
    if(!isLiked) {
      likedSongs.likeSong(song);
      setIsLiked(true);
    }else{
      likedSongs.dislikeSong(song);
      setIsLiked(false);
    }
  }

  useEffect(() => {
    likedSongs.setSongs();
  
    setIsLiked(likedSongs.songs.some(existingSong => search.song && existingSong.songId === search.song.songId));
  }, []);
  

  useEffect(() => {
    if(search.song) {
      const searchSong = localStorage.getItem('song');
      const songArray = [];

      searchSong && songArray.push(JSON.parse(searchSong));
      songs.getInfo(songArray);

      userSongsStore.getSongs(user.username);
    }
  }, []);

  return (
    <Container>
      {search.song && (
        <>
          <Helmet title={`Song: ${search.song.name}`} />
          <Song>
            <SongDataWrapper>
              <SongAvatar $src={search.song} />
              <SongInfoContainer>
                <SongInfo $type="name">{search.song.name}</SongInfo>
                <SongInfo $type="else">{search.song.author}</SongInfo>
              </SongInfoContainer>
            </SongDataWrapper>
            <ButtonsWrapper>
              <LikeButton $isLiked={isLiked} onClick={() => handleLikeSong(search.song)} />
              <SongButton onClick={() => songs.setSongObject_(search.song)}>Listen</SongButton>
            </ButtonsWrapper>
          </Song>
          <SongInfo $type="name">Song info:</SongInfo>
          <SongDataContainer>
            <SongData><SongDataSpan>Author: </SongDataSpan>{search.song.author}</SongData>
            <SongData><SongDataSpan>Genre: </SongDataSpan>{search.song.genre.toLowerCase()}</SongData>
            <SongData><SongDataSpan>Listens: </SongDataSpan>{search.song.listens}</SongData>
            <SongData><SongDataSpan>Likes: </SongDataSpan>{search.song.likes}</SongData>
            <SongData><SongDataSpan>Year of issue: </SongDataSpan>{search.song.issueYear.replaceAll('/', '.')}</SongData>
          </SongDataContainer>
        </>
      )}
    </Container>
  );
});