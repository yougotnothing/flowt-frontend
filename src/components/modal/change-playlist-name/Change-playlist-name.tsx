import { observer } from "mobx-react-lite";
import { changePlaylistName } from "../../../stores/toChange-playlist-name.mobx";
import { CloseButton, ConfirmButton, Input, Modal, ModalWindow } from "./Change-playlist-name.styled";
import { editPlaylistStore } from "../../../stores/toEditPlaylist.mobx";

export const ChangePlaylistName = observer(() => {
  return (
    <Modal $isOpen={changePlaylistName.isOpen}>
      <ModalWindow>
        <CloseButton onClick={() => changePlaylistName.setIsOpen(false)} />
        <Input placeholder="new playlist name" onChange={(e: any) => changePlaylistName.changeName(e.target.value)} />
        <ConfirmButton
          disabled={changePlaylistName.name.length > 0 ? false : true}
          onClick={() => {
            changePlaylistName.patchName(editPlaylistStore.name);
            editPlaylistStore.setData(changePlaylistName.name, editPlaylistStore.username);
          }}
        >Change name</ConfirmButton>
      </ModalWindow>
    </Modal>
  );
});