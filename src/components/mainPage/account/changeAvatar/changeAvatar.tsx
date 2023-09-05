import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, getUser } from "../../../../api/axiosConfig";
import { ChangeAvatarContainer, Title, InputWrapper, Input, Label, NewAvatar, SetNewAvatarButton, ButtonContainer } from "./changeAvatar.styled";

export const ChangeAvatar: React.FC = () => {
  const[user, setUser] = useState<any>(null);
  const[file, setFile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(setUser);
    console.log(user);
  }, [])

  const handleChangedAvatar = async () => {
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/home');
      window.location.reload();
    }catch(error: any) {
      return (
        <h1>error occured</h1>
      )
    }
  }
  
  const isFileChoosen = (event: any) => {
    const choosenFile = event.target.files[0];
    setFile(choosenFile);
  }

  return (
    <>
      <ChangeAvatarContainer>
        <Title>Change avatar</Title>
        <InputWrapper>
          <Input
            type='file'
            id="avatarInput" 
            accept="image/*"
            onChange={(event: any) => isFileChoosen(event)}
          />
          {file ? (
            <>
              <NewAvatar style={{
                backgroundImage: `url(${URL.createObjectURL(file)})`
              }} />
              <ButtonContainer>
                <SetNewAvatarButton 
                  onClick={() => handleChangedAvatar()}
                  >
                  Set avatar
                </SetNewAvatarButton>
              </ButtonContainer>
            </>
          ) : (
            <>
              <NewAvatar style={{
                backgroundImage: 'url(/plus.jpg)'
              }} />
            </>
          )}
          <Label htmlFor="avatarInput">{file ? 'select another' : 'select avatar'}</Label>
        </InputWrapper> 
      </ChangeAvatarContainer>
    </>
  )
}