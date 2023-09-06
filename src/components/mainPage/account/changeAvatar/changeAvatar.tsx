import { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api, getUser } from "../../../../api/axiosConfig";
import { AccountContainer } from "../account.styled";
import { Account } from "../account";
import { Span } from "../../login-register/login.register.styled";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../mainPage.styled";
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
    <AccountContainer>
      {user && 
      <GlobalContainer>
        <GoBackContainer>
          <AContainer>
            <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
              Go back
            </A>
          </AContainer>
        </GoBackContainer>
      <Account />
      <ChangeAvatarContainer>
        <InputWrapper>
          <Title>Change <Span>avatar</Span></Title>
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
        </GlobalContainer>
      }
    </AccountContainer>
  )
}