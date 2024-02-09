import { observer } from "mobx-react-lite";
import { Container, LikedSongs, Song, SongIcon, SongInfo, SongInfoContainer, Span, Title } from "../../Home.styled";
import { useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { userSongsStore } from "../../../../../stores/toSongs.mobx";

export const LastListened = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    userSongsStore.getLastListened();
  }, []);

  return (
    <Container>
      <Title>Last listened</Title>
      <LikedSongs>
        {userSongsStore.lastListened.length ? userSongsStore.lastListened.map((song, index) => (
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
          <Span $size="16">This will be your last listened songs</Span>
        )}
      </LikedSongs>
    </Container>
  );
});