import { FC } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  PlaylistInfo,
  PlaylistInfoContainer,
  PlaylistButton,
  PlaylistIcon,
  ContentContainer,
  Header,
  PlaylistDataContainer
} from "./Playlist.styled";
import { playlistsStore as playlists } from "../../../../stores/toPlaylists.mobx";
import { user } from "../../../../stores/toUser.mobx";
import { userSongsStore as songs } from "../../../../stores/toSongs.mobx";
import { Title as Helmet } from "../../../../helmet";

export const Playlist: FC = observer(() => {
  return (
    <ContentContainer>
      <Helmet title={`Playlist: ${playlists.container?.name}`} />
      <Header>Playlist: </Header>
      {playlists.container && (
        <Container $isEditing>
          <PlaylistIcon
            $username={playlists.container.username}
            $name={playlists.container.name}
          />
          <PlaylistInfoContainer>
            <PlaylistInfo $type="name">{playlists.container.name}</PlaylistInfo>
            <PlaylistInfo $type="username">{user.username}</PlaylistInfo>
          </PlaylistInfoContainer>
          <PlaylistButton onClick={() => songs.setSong(0, playlists.container?.songs)}>listen</PlaylistButton>
        </Container>
      )}
    </ContentContainer>
  );
});