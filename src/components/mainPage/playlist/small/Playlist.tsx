import { observer } from "mobx-react-lite";
import React from "react";

import { 
  Container,
  PlaylistImage,
  InfoContainer,
  Info
} from "./Playlist.styled";
import { playlistsStore as playlist } from "../../../../stores/toPlaylists.mobx";
import { searchUsersStore } from "../../../../stores/toSearchUsers.mobx";

export const Playlist: React.FC = observer(() => {

  return (
    <>
      {playlist.self.map((item, index) => (
        <Container key={index}>
          <PlaylistImage $name={item.name} $username={searchUsersStore.username} />
          <InfoContainer>
            <Info $type="playlist name">{item.name}</Info>
          </InfoContainer>
        </Container>
      ))}
    </>
  )
});