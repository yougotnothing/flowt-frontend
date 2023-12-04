import { observer } from "mobx-react-lite";
import { FC } from "react";
import { 
  Container,
  PlaylistInfo,
  PlaylistInfoContainer,
  PlaylistButton,
  PlaylistIcon
} from "./Playlist.styled";

export const Playlist: FC = observer(() => {
  return (
    <Container>
      <PlaylistIcon $isEditing={false} $username='xuesos' $name='ANGELZ' />
      <PlaylistInfoContainer>
        <PlaylistInfo $type="username">username</PlaylistInfo>
        <PlaylistInfo $type="name">name</PlaylistInfo>
      </PlaylistInfoContainer>
      <PlaylistButton>click</PlaylistButton>
      <PlaylistButton>shuffle</PlaylistButton>
    </Container>
  );
})