import { observer } from "mobx-react-lite";
import { CloseModal, ContentContainer, ModalContainer, ModalText, ModalWindow } from "./Modal.styled";
import { modalStore as modal } from "../../stores/toModal.mobx";
import { Container, Info, InfoContainer, PlaylistImage } from "../mainPage/playlist/small/Playlist.styled";
import { searchUsersStore } from "../../stores/toSearchUsers.mobx";
import { playlistsStore as playlist } from "../../stores/toPlaylists.mobx";

export const Modal = observer(() => (
    <ModalContainer $isOpen={modal.isOpen}>
      <ModalWindow>
        <ModalText>
          Add to Playlist
          <CloseModal onClick={() => modal.setIsOpen(false)} />
        </ModalText>
        <ContentContainer>
        {playlist.self.map((item, index) => (
          <Container key={index} onClick={() => playlist.addSong(item.name)}>
            <PlaylistImage $name={item.name} $username={searchUsersStore.username} />
            <InfoContainer>
              <Info $type="playlist name">{item.name}</Info>
            </InfoContainer>
          </Container>
        ))}
        </ContentContainer>
      </ModalWindow>
    </ModalContainer>
  )
);