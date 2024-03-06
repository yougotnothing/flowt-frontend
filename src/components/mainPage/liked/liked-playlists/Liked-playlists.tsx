import { useEffect, useState, Fragment } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  Playlist,
  PlaylistIcon,
  ManagementButtonsContainer,
  ManagementButton,
  DataContainer,
  TextButtonsContainer,
  TextButton,
  LikeButton,
  Header,
  PlaylistsContainer,
  Border
} from "./Liked-playlists.styled";
import { likedPlaylists } from "../../../../stores/toLiked-playlists.mobx";
import { userSongsStore as songs } from "../../../../stores/toSongs.mobx";
import { Title as Helmet } from "../../../../helmet";
import { searchUsersStore } from "../../../../stores/toSearchUsers.mobx";
import { useNavigate } from "react-router-dom";

export const LikedPlaylists = observer(() => {
  const [isLiked, setIsLiked] = useState<boolean[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    likedPlaylists.setLikedPlaylists();
    setIsLiked(Array(likedPlaylists.playlists.length).fill(true));
  }, []);

  return (
    <Container>
      <Helmet title="Saved playlists" />
      <Header>Saved playlists: </Header>
      <PlaylistsContainer>
        {likedPlaylists.playlists && likedPlaylists.playlists.map((playlist, index) => (
          <Fragment key={index}>
            <Playlist>
              <DataContainer>
                <PlaylistIcon $playlist={playlist} />
                <TextButtonsContainer>
                  <TextButton $type="name">{playlist.name}</TextButton>
                  <TextButton $type="author"
                    onClick={() => {
                      searchUsersStore.getPublicUser(playlist.username, navigate);
                    }}
                  >{playlist.username}</TextButton>
                </TextButtonsContainer>
              </DataContainer>
              <ManagementButtonsContainer>
                <LikeButton $isLiked={isLiked[index]} onClick={() => likedPlaylists.dislike(playlist)} />
                <ManagementButton
                  onClick={() => {
                    songs.getInfo(playlist.songs);
                    songs.setSong(0);
                  }}
                >play</ManagementButton>
              </ManagementButtonsContainer>
            </Playlist>
            <Border />
          </Fragment>
        ))}
      </PlaylistsContainer>
    </Container>
  )
});