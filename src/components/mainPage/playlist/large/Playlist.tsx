import { FC } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  PlaylistInfo,
  PlaylistInfoContainer,
  PlaylistButton,
  PlaylistIcon,
  ContentContainer
} from "./Playlist.styled";
import { playlistsStore as playlists } from "../../../../stores/toPlaylists.mobx";
import { user } from "../../../../stores/toUser.mobx";
import { userSongsStore as songs } from "../../../../stores/toSongs.mobx";

export const Playlist: FC = observer(() => {
  return (
    <ContentContainer>
      {playlists.container && (
        <Container $isEditing>
          <PlaylistIcon
            $isEditing={false}
            $username={user.username}
            $name={playlists.container.name}
          />
          <PlaylistInfoContainer>
            <PlaylistInfo $type="name">{playlists.container.name}</PlaylistInfo>
            <PlaylistInfo $type="username">{user.username}</PlaylistInfo>
          </PlaylistInfoContainer>
          {/* <PlaylistButton onClick={songs.setSong(playlists[0].)}>click</PlaylistButton> */}
        </Container>
      )}
    </ContentContainer>
  );
})