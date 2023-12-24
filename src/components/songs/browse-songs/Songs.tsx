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
  SongDataSpan
} from "./Songs.styled";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { API_URL } from "../../../api/axiosConfig";

export const BrowseSongs: FC = observer(() => {
  const [author, setAuthor] = useState<string | null>(null);

  useEffect(() => {
    if(search.song) {
      setAuthor(search.song.author);
      console.log(author);
    }
  }, [search.song]);

  useEffect(() => {
    if(search.song) {
      const songArray = [];
      songArray.push(search.song)
      songs.getInfo(songArray);
    }
  }, []);

  return (
    <Container>
        <>
          <Song>
            {search.song && (
              <>
            <SongAvatar src={`${API_URL}/images/song/${search.song?.author}/${search.song?.name}`} />
            <SongInfoContainer>
              <SongInfo $type="name">{search.song?.name}</SongInfo>
              <SongInfo $type="else">{search.song?.author}</SongInfo>
            </SongInfoContainer>
            <SongButton onClick={() => songs.setSong(0, author)}>Listen</SongButton>
              </>
            )}
          </Song>
          <SongInfo $type="name">Song info:</SongInfo>
          <SongDataContainer>
            <SongData><SongDataSpan>Author: </SongDataSpan>{search.song?.author}</SongData>
            <SongData><SongDataSpan>Genre: </SongDataSpan>{search.song?.genre && search.song?.genre.toLowerCase()}</SongData>
            <SongData><SongDataSpan>Listens: </SongDataSpan>{search.song?.listens}</SongData>
            <SongData><SongDataSpan>Likes: </SongDataSpan>{search.song?.likes}</SongData>
            <SongData><SongDataSpan>Year of issue: </SongDataSpan>{search.song?.issueYear && search.song?.issueYear.replaceAll('/', '.')}</SongData>
          </SongDataContainer>
        </>
    </Container>
  );
});