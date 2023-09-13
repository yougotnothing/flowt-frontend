import React, { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api, getUser } from "../../../../api/axiosConfig";
import { AccountContainer } from "../Account.styled";
import { Account } from "../Account";
import { Span } from "../../login-register/Login.register.styled";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../MainPage.styled";
import { ChangeAvatarContainer, Title, InputWrapper, Input, Label, NewAvatar, SetNewAvatarButton, ButtonContainer } from "./ChangeAvatar.styled";
import {PageLoader} from "../../../loader/pageLoader/PageLoader";

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

      navigate(generatePath('/account/:id', { id: user.username }));
      window.location.reload();
    }catch(error: any) {
      console.log('an error occurred');
    }
  }
  
  const isFileChosen = (event: any) => {
    const chosenFile = event.target.files[0];
    setFile(chosenFile);
  }

  return (
    <AccountContainer>
      {!user && <PageLoader />}
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
                onChange={(event: any) => isFileChosen(event)}
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