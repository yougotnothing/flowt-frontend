import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { ModalWindow, Wrapper, Text, CloseModal, Button } from "./Change-password.styled";
import { user } from "../../../stores/toUser.mobx";
import { modalStore } from "../../../stores/toModal.mobx";
import { api } from "../../../api/axiosConfig";
import { Loader } from "../../loader/Loader";

export const ChangePasswordModal: FC = observer(() => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[message, setMessage] = useState<string>('');

  const handleGetCode = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/verify/password');

      setMessage(`Code sended to email ${user.email}`);
      setIsLoading(false);
      console.log(response.data);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  return (
    <Wrapper $isOpen={modalStore.changePassword}>
      <ModalWindow>
        <CloseModal onClick={() => modalStore.setIsOpen(false, 'change password')} />
        <Text>Send code to {user.email}?</Text>
        <Button disabled={isLoading} onClick={handleGetCode}>{isLoading ? <Loader /> : 'Submit'}</Button>
        <Text $message>{message}</Text>
      </ModalWindow>
    </Wrapper>
  )
});