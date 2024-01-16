import { observer } from "mobx-react-lite";
import { deletePlaylistStore } from "../../../stores/toDelete-playlist.mobx";
import { editPlaylistStore } from "../../../stores/toEditPlaylist.mobx";
import { CloseButton, Modal, ModalWindow, Text, ConfirmButton } from "./Delete-playlist.styled";
import { useNavigate } from "react-router-dom";

export const DeletePlaylistModal = observer(() => {
  const navigate = useNavigate();

  return (
    <Modal $isOpen={deletePlaylistStore.isOpen}>
      <ModalWindow>
        <CloseButton onClick={() => deletePlaylistStore.setIsOpen(false)} />
        <Text>Are you sure you want to delete the playlist {editPlaylistStore.name}?</Text>
        <ConfirmButton 
          onClick={() => deletePlaylistStore.deletePlaylist(editPlaylistStore.name, navigate)}
        >Delete playlist</ConfirmButton>
      </ModalWindow>
    </Modal>
  );
});