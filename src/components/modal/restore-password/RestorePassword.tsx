import { observer } from "mobx-react-lite";
import { Button, CloseModal, ModalWindow, Wrapper, Text } from "../change-password/Change-password.styled";
import { modalStore } from "../../../stores/toModal.mobx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { emailSchema } from "../../../validation/yup.config";
import { Input } from "../change-playlist-name/Change-playlist-name.styled";
import { api } from "../../../api/axiosConfig";
import { Loader } from "../../loader/Loader";

export const RestorePasswordModal = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const formik = useFormik<{
    email: string
  }>({
    initialValues: {
      email: ""
    },
    validationSchema: emailSchema,
    onSubmit: () => {}
  });

  const handleSendCode = async () => {
    try {
      setIsLoading(true);

      await api.post('/verify/restore-password', {
        email: formik.values.email
      });

      setMessage(`Code sended to ${formik.values.email}`);
      setIsLoading(false);
    }catch(error: any) {
      console.error(error);
      setMessage('An error occurred');
      setIsLoading(false);
      return;
    }
  }

  return (
    <Wrapper $isOpen={modalStore.restorePassword}>
      <ModalWindow>
        <CloseModal onClick={() => modalStore.setIsOpen(false, 'restore password')} />
        <Text>Enter email to send restore code</Text>
        <Input
          $error={!!formik.errors.email}
          placeholder="Email"
          name="email"
          type="email"
          onChange={(e) => {
            formik.handleChange(e);
            modalStore.setRestoreEmail(e.target.value);
          }}
          onBlur={formik.handleBlur}
        />
        <Button onClick={handleSendCode}>{isLoading ? <Loader /> : "Submit"}</Button>
        <Text $message>{message}</Text>
      </ModalWindow>
    </Wrapper>
  )
});