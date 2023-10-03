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
import { userUsernameStore } from "../../../../store/toChangeUsername";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../avatar/canvas";

export const ChangeAvatar: React.FC = observer(() => {
  const[isFileChosen, setIsFileChosen] = useState<boolean>(false);
  const[file, setFile] = useState<Blob | any>(null);
  const[crop, setCrop] = useState({ x: 0, y: 0 });
  const[zoom, setZoom] = useState<number>(1.1);
  const[croppedAvatarBlob, setCroppedAvatarBlob] = useState<any>(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleChangedAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append('file', croppedAvatarBlob);

      await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      userAvatarStore.setAvatar(croppedAvatarBlob);
      console.log(userAvatarStore.avatar);

      navigate(generatePath('/account/:id', { id: userUsernameStore.Username }));
    }catch(error: any) {
      console.log('an error occurred');
    }
  }

  useEffect(() => {
    if(file) userAvatarStore.setAvatarURL(URL.createObjectURL(file));
  }, [file]);
  
  const handleFileChosen = (event: any) => {
    const chosenFile = event.target.files[0];
    setFile(chosenFile);
    setIsFileChosen(true);
  }

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      );

      setCroppedAvatarBlob(croppedImage);
    }catch(error: any) {
      console.log('an error occurred:', error);
    }
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
                    <Cropper
                      style={{
                        containerStyle: {
                          borderRadius: '6px',
                          display: 'flex',
                          position: 'relative',
                          width: '240px',
                          height: '240px',
                          backgroundSize: 'cover'
                        },
                        cropAreaStyle: {
                          transition: '0.3s',
                          borderRadius: '50%'
                        }
                      }}
                      objectFit="cover"
                      cropSize={{width: 240, height: 240}}
                      image={userAvatarStore.avatarURL}
                      crop={crop}
                      zoom={zoom}
                      maxZoom={1.7}
                      minZoom={1}
                      aspect={1}
                      showGrid={false}
                      onCropChange={setCrop}
                      zoomSpeed={0.1}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
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