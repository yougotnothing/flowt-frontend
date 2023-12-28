import { useState } from "react";

import { observer } from "mobx-react-lite";
import { CloseModal, ContentContainer, ModalContainer, ModalStatus, ModalText, ModalWindow } from "./Modal.styled";
import { modalStore as modal } from "../../../stores/toModal.mobx";
import { Container, Info, InfoContainer, PlaylistImage } from "../../mainPage/playlist/small/Playlist.styled";
import { searchUsersStore } from "../../../stores/toSearchUsers.mobx";
import { playlistsStore as playlist } from "../../../stores/toPlaylists.mobx";

export const Modal = observer(() => {
  const [isSongAdded, setIsSongAdded] = useState<boolean[]>(Array(playlist.self.length).fill(false));

  const handleSongAdded = (index: number, name: string) => {
    playlist.addSong(name);
    setIsSongAdded((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  }

  const handleCloseModal = (isOpen: boolean, message: string) => {
    modal.setIsOpen(isOpen);
    playlist.setMessage(message);
  }
  
  return (
    <ModalContainer $isOpen={modal.isOpen}>
      <ModalWindow>
        <ModalText>
          Add to Playlist
          <CloseModal onClick={() => handleCloseModal(false, '')} />
        </ModalText>
        <ModalStatus>{playlist.message}</ModalStatus>
        <ContentContainer>
        {Array.isArray(playlist.self) && playlist.self.map((item, index) => (
          <Container
            disabled={isSongAdded[index]}
            key={index}
            onClick={() => handleSongAdded(index, item.name)}
          >
            <PlaylistImage $name={item.name} $username={searchUsersStore.username} />
            <InfoContainer>
              <Info $type="playlist name">{item.name}</Info>
            </InfoContainer>
          </Container>
        ))}
        </ContentContainer>
      </ModalWindow>
    </ModalContainer>
  );
});