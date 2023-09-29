import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { api } from "../../../../api/axiosConfig";
import { AccountContainer } from "../Account.styled";
import { AccountSettings } from "../AccountSettings";
import {
  A,
  AContainer,
  GoBackContainer,
  GlobalContainer
} from "../../MainPage.styled";
import {
  ChangeAvatarContainer,
  Title,
  InputWrapper,
  Input,
  Label,
  NewAvatar,
  SetNewAvatarButton,
  ButtonContainer
} from "./ChangeAvatar.styled";
import { PageLoader } from "../../../loader/pageLoader/PageLoader";
import { useUserContext } from "../../../../contexts/UserContext";
import { userAvatarStore } from "../../../../store/toChangeAvatar";

export const ChangeAvatar: React.FC = observer(() => {
  const [isFileChosen, setIsFileChosen] = useState<boolean>(false);
  const [file, setFile] = useState<Blob | any>(null);
  const { user } = useUserContext();
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

      userAvatarStore.setAvatar(URL.createObjectURL(file));

      navigate(generatePath('/account/:id', { id: user.username }));
    }catch(error: any) {
      console.log('an error occurred');
    }
  }
  
  const handleFileChosen = (event: any) => {
    const chosenFile = event.target.files[0];
    setFile(chosenFile);
    console.log(file);
    setIsFileChosen(true);
  }

  return (
    <AccountContainer>
      {!user && <PageLoader />}
      {user && (
        <GlobalContainer>
          <AccountSettings />
          <GoBackContainer>
            <AContainer>
              <A onClick={() => navigate(generatePath('/account/:id', { id: user.username }))}>
                Go back
              </A>
            </AContainer>
          </GoBackContainer>
          <ChangeAvatarContainer>
            <InputWrapper>
              <Title>Change avatar</Title>
                <Input
                  type='file'
                  id="avatarInput"
                  accept="image/*"
                  onChange={(event: any) => handleFileChosen(event)}
                />
                {isFileChosen ? (
                  <>
                    <NewAvatar style={{backgroundImage: `url(${URL.createObjectURL(file)})`}} />
                    <ButtonContainer>
                      <SetNewAvatarButton onClick={handleChangedAvatar}>
                        Set avatar
                      </SetNewAvatarButton>
                    </ButtonContainer>
                  </>
                ) : (
                  <NewAvatar style={{backgroundImage: `url(${userAvatarStore.avatar})`}} />
                )}
              <Label htmlFor="avatarInput">{isFileChosen ? 'select another' : 'select avatar'}</Label>
            </InputWrapper>
          </ChangeAvatarContainer>
        </GlobalContainer>
      )}
    </AccountContainer>
  )
});