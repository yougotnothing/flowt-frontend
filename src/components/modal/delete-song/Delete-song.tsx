import { observer } from "mobx-react-lite";
import { ModalWindow, Wrapper } from "./Delete-song.styled";
import { modalStore } from "../../../stores/toModal.mobx";
import { CloseModal } from "../add-to-playlist/Modal.styled";
import { Button, Text } from "../change-password/Change-password.styled";
import { api } from "../../../api/axiosConfig";
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { user } from "../../../stores/toUser.mobx";
import { useEffect, useState } from "react";
import { Loader } from "../../loader/Loader";

export const DeleteSongModal = observer(() => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleDeleteSong = async () => {
    try {
      setIsFetching(true);
      setMessage('');
      await api.delete(`/songs/${modalStore.deleteSong_name}`);
    
      songs.getSongs(user.username);

      setIsFetching(false);
      setMessage(`song ${modalStore.deleteSong_name} deleted`);
      console.log('song deleted');
    }catch(error: any) {
      setIsFetching(false);
      console.error(error.response.data);
      setMessage(`someting went wrong`);
      return;
    }
  }

  useEffect(() => {
    if(!modalStore.deleteSong) setMessage('');
  }, [modalStore.deleteSong]);

  return (
    <Wrapper $isOpen={modalStore.deleteSong}>
      <ModalWindow>
        <CloseModal onClick={() => modalStore.setIsOpen(false, 'delete song')} />
        <Text>are you sure you want to delete the song?</Text>
        <Button
          disabled={isFetching}
          onClick={handleDeleteSong}
        >{isFetching ? <Loader /> : 'submit'}</Button>
        <Text $message>{message}</Text>
      </ModalWindow>
    </Wrapper>
  )
});