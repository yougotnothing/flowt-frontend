import { observer } from "mobx-react-lite"
import { ChangeAvatarButton, Input, Modal, ModalWindow, SetAvatarButton } from "./Change-playlist-avatar.styled";
import { modalStore } from "../../../stores/toModal.mobx";
import { changePlaylistAvatar } from "../../../stores/toChange-playlist-avatar.mobx";
import { editPlaylistStore } from "../../../stores/toEditPlaylist.mobx";
import { useEffect, useState } from "react";

export const ChangePlaylistAvatar = observer(() => {
  const [file, setFile] = useState<Blob | null>(null);

  useEffect(() => {
    if(file) changePlaylistAvatar.changeAvatar(URL.createObjectURL(file));
  }, [file]);

  return (
    <Modal $isOpen={modalStore.changeAvatar}>
      <ModalWindow>
        <Input 
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(e: any) => setFile(e.target.files[0])}
        />
        <ChangeAvatarButton $isChanged={changePlaylistAvatar.isChanged} $image={changePlaylistAvatar.avatar} htmlFor="avatar" />
        <SetAvatarButton 
          disabled={!changePlaylistAvatar.isChanged} 
          onClick={() => {
            changePlaylistAvatar.postAvatar(file, editPlaylistStore.name);
            modalStore.setChangeAvatar(false);
          }}
        >Set new avatar</SetAvatarButton>
      </ModalWindow>
    </Modal>
  );
});