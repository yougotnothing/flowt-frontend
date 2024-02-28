import { FC, useCallback, useEffect, useState } from "react";

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
  Line
} from "./Songs.styled";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as Helmet } from "../../../helmet";
import { user } from "../../../stores/toUser.mobx";
import { ISongData } from "../../../types/types";
import {
  Border,
  SongImage,
  Song as RandomSong,
  SongDataButton,
  SongData as RandomSongData,
  SongLikeData,
  SongLikeButton,
  SongLikesContainer,
  SongDataContainer as RandomSongDataContainer
} from "../../mainPage/liked/liked-songs/Liked-songs.styled";
import { api } from "../../../api/axiosConfig";

export const BrowseSongs: FC = observer(() => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikedRandom, setIsLikedRandom] = useState<boolean>(false);
  const [randomSongs, setRandomSongs] = useState<ISongData>();

  const handleLikeSong = async (song: ISongData | null) => {
    if(!isLiked) {
      likedSongs.likeSong(song);
      setIsLiked(true);
    }else{
      likedSongs.dislikeSong(song);
      setIsLiked(false);
    }
  }

  const handleSetLikedSong = useCallback((song: ISongData) => {
    if(!isLikedRandom) {
      setIsLikedRandom(true);
    }

    randomSongs && songs.setSongObject_(randomSongs);
  }, [isLikedRandom]);

  useEffect(() => {
    setIsLikedRandom(likedSongs.songs.some(existingSong => existingSong.songId === randomSongs?.songId));
  }, [likedSongs.songs]);

  const getRandomByGenre = async (genre?: string): Promise<void> => {
    try {
      const response = await api.get<ISongData>(`/songs/random/${genre}`);

      console.log(response.data);
      setRandomSongs(response.data);
    }catch(error: any) {
      console.error(error);
      return;
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

      songs.getSongs(user.username);
      getRandomByGenre(search.song.genre);
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
          <Line />
          <SongInfo $type="name">Might like: </SongInfo>
          {randomSongs && (
            <>
              <RandomSong onDoubleClick={() => handleSetLikedSong(randomSongs)}>
                <RandomSongDataContainer>
                  <SongImage
                    $song={randomSongs}
                    onClick={() => handleSetLikedSong(randomSongs)}
                  />
                  <RandomSongData>
                    <SongDataButton>{randomSongs.author}</SongDataButton>
                    <SongDataButton>{randomSongs.name}</SongDataButton>
                  </RandomSongData>
                </RandomSongDataContainer>
                <SongLikeData>genre: {randomSongs.genre.toLowerCase()}</SongLikeData>
                <SongLikeData>posted at: {randomSongs.issueYear.replaceAll('/', '.')}</SongLikeData>
                <SongLikesContainer>
                  <SongLikeData>listens: {randomSongs.listens}</SongLikeData>
                  <SongLikeData>likes: {randomSongs.likes}</SongLikeData>
                  <SongLikeButton
                    $isLiked={isLikedRandom}
                    onClick={() => randomSongs && likedSongs.dislikeSong(randomSongs)}
                  />
                </SongLikesContainer>
              </RandomSong>
              <Border />
            </>
          )}
        </>
      )}
    </Container>
  );
});