import { observer } from "mobx-react-lite";
import { Container, LikedSongs, Song, SongIcon, SongInfo, SongInfoContainer, Span, Title } from "../../Home.styled";
import { useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { userSongsStore } from "../../../../../stores/toSongs.mobx";
import { searchStore } from "../../../../../stores/toSearch.mobx";
import { searchUsersStore } from "../../../../../stores/toSearchUsers.mobx";

export const LastListened: React.FC<{ size: 'big' | 'small' }> = observer(({ size }) => {
  const navigate = useNavigate();

  useEffect(() => {
    userSongsStore.getLastListened();
  }, []);

  return (
    <Container $size={size}>
      <Title>Last listened</Title>
      <LikedSongs>
        {userSongsStore.lastListened.length ? userSongsStore.lastListened.map((song, index) => (
          <Song key={index}>
            <SongIcon
              onClick={() => {
                userSongsStore.getInfo(userSongsStore.lastListened);
                userSongsStore.setSong(index);
              }}
              $author={song.author}
              $name={song.name}
            />
            <SongInfoContainer>
              <SongInfo 
                $type="name"
                onClick={() => {
                  searchStore.setSong(song);
                  navigate(generatePath('/song/:id', { id: song.name }));
                }}
              >{song.name}</SongInfo>
              <SongInfo
                $type="author"
                onClick={() => searchUsersStore.getPublicUser(song.author, navigate)}
              >{song.author}</SongInfo>
            </SongInfoContainer>
          </Song>
        )) : (
          <Span $size="16">This will be your last listened songs</Span>
        )}
      </LikedSongs>
    </Container>
  );
});