import { observer } from "mobx-react-lite";
import { Container, LikedSongs, Song, SongIcon, SongInfo, SongInfoContainer, Span, Title } from "../../Home.styled";
import { useEffect } from "react";
import { likedSongs } from "../../../../../stores/toLiked-songs.mobx";
import { useNavigate, generatePath } from "react-router-dom";

export const LastListened = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    likedSongs.setSongs();
  }, []);

  return (
    <Container>
      <Title>Last listened</Title>
      <LikedSongs>
        {likedSongs.songs.length ? likedSongs.songs.map((song, index) => (
          <Song key={index}>
            <SongIcon
              $author={song.author}
              $name={song.name}
            />
            <SongInfoContainer>
              <SongInfo 
                $type="name"
                onClick={() => navigate(generatePath('/song/:id', { id: song.name }))}
              >{song.name}</SongInfo>
              <SongInfo $type="author">{song.author}</SongInfo>
            </SongInfoContainer>
          </Song>
        )) : (
          <Span>This will be your last listened songs</Span>
        )}
      </LikedSongs>
    </Container>
  );
});