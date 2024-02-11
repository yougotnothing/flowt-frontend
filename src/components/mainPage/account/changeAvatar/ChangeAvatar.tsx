import React, { useEffect, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { observer } from "mobx-react-lite";
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
import { userAvatarStore as avatarStore } from "../../../../stores/toChangeAvatar.mobx";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../avatar/canvas";
import { api } from "../../../../api/axiosConfig";
import { user } from "../../../../stores/toUser.mobx";
import { Title as Helmet } from "../../../../helmet";

export const ChangeAvatar: React.FC = observer(() => {
  const[isFileChosen, setIsFileChosen] = useState<boolean>(false);
  const[file, setFile] = useState<Blob | any>(null);
  const[crop, setCrop] = useState({ x: 0, y: 0 });
  const[zoom, setZoom] = useState<number>(1.1);
  const[croppedAvatarBlob, setCroppedAvatarBlob] = useState<any>(null);
  const googleAvatar = localStorage.getItem('image');
  const navigate = useNavigate();

  useEffect(() => {
    avatarStore.setAvatarURL(user.avatar);
  }, []);

  useEffect(() => {
    if(file) {
      avatarStore.setAvatarURL(URL.createObjectURL(file));
    }
  }, [file]);

  const handleChangeAvatar = async () => {
    try {
      const formData = new FormData();

      formData.append('file', croppedAvatarBlob)
      await api.post('/users/avatar', formData, {
        headers: {
          'Content-type': 'image/jpeg'
        }
      });
      
      avatarStore.setAvatar(URL.createObjectURL(croppedAvatarBlob));

      if(googleAvatar) {
        localStorage.removeItem('image');
      }

      navigate(generatePath('/account/:id', { id: user.username }));
    }catch(error: any) {
      console.log(error);
    }
  }

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
      <Helmet title="Change avatar" />
      {!user.isUserAuthenticated && <PageLoader />}
      {user.isUserAuthenticated && (
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
                      image={avatarStore.avatarURL}
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
                      <SetNewAvatarButton onClick={() => handleChangeAvatar().then(() => user.setAvatar(avatarStore.avatar))}>
                        Set avatar
                      </SetNewAvatarButton>
                    </ButtonContainer>
                  </>
                ) : (
                  <NewAvatar style={{backgroundImage: `url(${user.avatar})`}} />
                )}
              <Label htmlFor="avatarInput">{isFileChosen ? 'select another' : 'select avatar'}</Label>
            </InputWrapper>
          </ChangeAvatarContainer>
        </GlobalContainer>
      )}
    </AccountContainer>
  );
});