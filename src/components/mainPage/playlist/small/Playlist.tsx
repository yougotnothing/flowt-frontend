import { observer } from "mobx-react-lite";
import React from "react";

import { 
  Container,
  PlaylistImage,
  InfoContainer,
  Info
} from "./Playlist.styled";

export const Playlist: React.FC = observer(() => {

  return (
    <Container>
      <PlaylistImage style={{backgroundImage: 'url(/defaultAvatar.png)'}} />
      <InfoContainer>
        <Info $type="playlist name">Playlist</Info>
        <Info $type="username">username</Info>
      </InfoContainer>
    </Container>
  )
});