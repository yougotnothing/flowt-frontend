import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { savedPlaylists } from "../../../../../stores/toSaved-playlists.mobx";
import { Container, LikedSongs, Song, SongIcon, SongInfo, SongInfoContainer, Span, Title } from "../../Home.styled";
import { useNavigate, generatePath } from "react-router-dom";


export const LikedPlaylists: FC<{ size: 'big' | 'small' }> = observer(({ size }) => {
  const navigate = useNavigate();

  useEffect(() => {
    savedPlaylists.getSaved();
  }, []);

  return (
    <Container $size={size}>
      <Title>Playlists</Title>
      <LikedSongs>
        {savedPlaylists.playlists.length ? savedPlaylists.playlists.map((playlist, index) => (
          <Song key={index}>
            <SongIcon
              $author={playlist.author}
              $name={playlist.name}
              $playlist
            />
            <SongInfoContainer>
              <SongInfo 
                $type="name"
                onClick={() => navigate(generatePath('/song/:id', { id: playlist.name }))}
              >{playlist.name}</SongInfo>
              <SongInfo $type="author">{playlist.author}</SongInfo>
            </SongInfoContainer>
          </Song>
        )) : (
          <Span $size="16">This will be your liked playlists</Span>
        )}
      </LikedSongs>
    </Container>
  );
});