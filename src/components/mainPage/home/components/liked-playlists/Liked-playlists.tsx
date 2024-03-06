import { FC, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { savedPlaylists } from "../../../../../stores/toSaved-playlists.mobx";
import { Container, LikedSongs, Song, SongIcon, SongInfo, SongInfoContainer, Span, Title } from "../../Home.styled";
import { useNavigate, generatePath } from "react-router-dom";
import { playlistsStore } from "../../../../../stores/toPlaylists.mobx";


export const LikedPlaylists: FC<{ size: 'big' | 'small' }> = observer(({ size }) => {
  const navigate = useNavigate();

  useEffect(() => {
    savedPlaylists.getSaved();
    console.log('playlists: ', savedPlaylists.playlists);
  }, []);

  return (
    <Container $size={size}>
      <Title>Playlists</Title>
      <LikedSongs>
        {savedPlaylists.playlists.length ? savedPlaylists.playlists.map((playlist, index) => (
          <Song key={index}>
            <SongIcon
              $author={playlist.username}
              $name={playlist.name}
              $playlist
              onClick={() => navigate(generatePath('/playlist/:author/:id', { author: playlist.username, id: playlist.name }))}
            />
            <SongInfoContainer>
              <SongInfo 
                $type="name"
                onClick={() => {
                  playlistsStore.setContainer(playlist);
                  navigate(generatePath('/playlist/:author/:id', { author: playlist.username, id: playlist.name }));
                }}
              >{playlist.name}</SongInfo>
              <SongInfo $type="author"
                onClick={() => navigate(generatePath('/profile/:id', { id: playlist.username }))}
              >{playlist.username}</SongInfo>
            </SongInfoContainer>
          </Song>
        )) : (
          <Span $size="16">This will be your liked playlists</Span>
        )}
      </LikedSongs>
    </Container>
  );
});