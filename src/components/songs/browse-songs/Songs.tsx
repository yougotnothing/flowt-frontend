import { FC, useEffect } from "react";

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
  Line,
  RandomSong,
  RandomSongsWrapper,
  RandomSongAvatar,
  RandomSongButton,
  RandomSongData,
  RandomSongDataWrapper,
  RandomSongWrapper,
} from "./Songs.styled";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { Title as Helmet } from "../../../helmet";

export const BrowseSongs: FC = observer(() => {
  useEffect(() => {
    if(search.song) {
      const searchSong = localStorage.getItem('song');
      const songArray = [];

      searchSong && songArray.push(JSON.parse(searchSong));
      songs.getInfo(songArray);
      songs.getRandomByGenre(search.song.genre);
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
              <LikeButton $isLiked onClick={() => likedSongs.likeSong(search.song)} />
              <SongButton onClick={() => songs.setSong(0)}>Listen</SongButton>
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
          <Line> </Line>
          <RandomSongsWrapper>
            <RandomSong>
              {songs.randomByGenre && (
                <>
                  <RandomSongWrapper>
                    <RandomSongAvatar $src={songs.randomByGenre} />
                    <RandomSongDataWrapper>
                      <RandomSongData>{songs.randomByGenre.author}</RandomSongData>
                      <RandomSongData $name>{songs.randomByGenre.name}</RandomSongData>
                    </RandomSongDataWrapper>
                  </RandomSongWrapper>
                  <RandomSongWrapper>
                    <RandomSongButton />
                    <RandomSongButton $like />
                  </RandomSongWrapper>
                </>
              )}
            </RandomSong>
          </RandomSongsWrapper>
        </>
      )}
    </Container>
  );
});