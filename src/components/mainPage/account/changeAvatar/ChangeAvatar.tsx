import React, {useState, useEffect, useContext} from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { api } from "../../../../api/axiosConfig";
import { AccountContainer } from "../Account.styled";
import { Account } from "../Account";
import { Span } from "../../login-register/Login.register.styled";
import { A, AContainer, GoBackContainer, GlobalContainer } from "../../MainPage.styled";
import { ChangeAvatarContainer, Title, InputWrapper, Input, Label, NewAvatar, SetNewAvatarButton, ButtonContainer } from "./ChangeAvatar.styled";
import {PageLoader} from "../../../loader/pageLoader/PageLoader";
import { useContextValues } from "../../../../contexts/Context";

export const ChangeAvatar: React.FC = () => {
  const[file, setFile] = useState<any>(null);
  const { user } = useContextValues();
  const navigate = useNavigate();

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
      {user && (
        <GlobalContainer>
          <Account />
          <GoBackContainer>
            <AContainer>
              <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
                Go back
              </A>
            </AContainer>
          </GoBackContainer>
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
                        onClick={handleChangedAvatar}
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
      )}
    </AccountContainer>
  )
}
