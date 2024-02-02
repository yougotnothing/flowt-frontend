import React, { useEffect, useState, useCallback } from "react";

import { observer } from "mobx-react-lite";
import {
  Border,
  Container,
  Header,
  Song,
  SongData,
  SongDataButton,
  SongDataContainer,
  SongImage,
  SongLikeButton,
  SongLikeData,
  SongLikesContainer
} from "./Liked-songs.styled";
import { likedSongs } from "../../../../stores/toLiked-songs.mobx";
import { userSongsStore as songs } from "../../../../stores/toSongs.mobx";
import { ISongData } from "../../../../types/types";

export const LikedSongs = observer(() => {
  const [isLiked, setIsLiked] = useState<boolean[]>([]);
  const [isLikedContainer, setIsLikedContainer] = useState<boolean>(false);

  useEffect(() => {
    likedSongs.setSongs();
  }, []);

  const handleSetLikedSong = useCallback((container: ISongData[], index: number) => {
    if(!isLikedContainer) {
      setIsLikedContainer(true);
      songs.getInfo(container);
    }

    songs.setSong(index, likedSongs.songs);
  }, [isLikedContainer]);

  useEffect(() => {
    setIsLiked(Array(likedSongs.songs.length).fill(true));
  }, [likedSongs.songs]);

  return (
    <Container>
      <Header>Liked songs:</Header>
      {likedSongs.songs.map((song, index) => (
        <React.Fragment key={index}>
          <Song onDoubleClick={() => handleSetLikedSong(likedSongs.songs, index)}>
            <SongDataContainer>
              <SongImage
                $song={song}
                onClick={() => handleSetLikedSong(likedSongs.songs, index)}
              />
              <SongData>
                <SongDataButton>{song.author}</SongDataButton>
                <SongDataButton>{song.name}</SongDataButton>
              </SongData>
            </SongDataContainer>
            <SongLikeData>genre: {song.genre.toLowerCase()}</SongLikeData>
            <SongLikeData>posted at: {song.issueYear.replaceAll('/', '.')}</SongLikeData>
            <SongLikesContainer>
              <SongLikeData>listens: {song.listens}</SongLikeData>
              <SongLikeData>likes: {song.likes}</SongLikeData>
              <SongLikeButton
                $isLiked={isLiked[index]}
                onClick={() => likedSongs.deleteSong(song, index)}
              />
            </SongLikesContainer>
          </Song>
          <Border />
        </React.Fragment>
      ))}
    </Container>
  );
});