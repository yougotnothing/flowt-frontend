import { FC, useState } from "react";

import { useNavigate, generatePath} from "react-router-dom";
import { api } from "../../api/axiosConfig";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import {
  UploadContainer,
  UploadButton,
  Title,
  Input,
  Label,
  Container,
  AvatarInput,
  SongName,
  SetAvatarLabel,
  Validation,
  SongNameContainer,
  Header,
  SongAvatar,
  AvatarContainer,
  ButtonsContainer,
  SubmitContainer,
  DataContainer,
  Genres,
  GenresItem,
  AvatarAndGenre,
  SongInfoContainer,
  SongInfoText,
  SetAvatarLabelContainer
} from "./Upload.styled";
import { AccountSettings } from "../mainPage/account/AccountSettings";
import { useFormik } from "formik";
import { songNameSchema } from "../../validation/yup.config";
import { Loader } from "../loader/Loader";
import genresData from "../../json/genres.json";
import { user } from "../../stores/toUser.mobx";

export const Upload: FC = () => {
  const[songGenre, setSongGenre] = useState<string | null>(null);
  const[isLoading, setIsLoading] = useState(false);
  const[song, setSong] = useState<any | Blob>(null);
  const[avatar, setAvatar] = useState<any | Blob>(null);
  const navigate = useNavigate();

  const formik = useFormik<{
    songName: string
  }>({
    initialValues: {
      songName: ""
    },
    validationSchema: songNameSchema,
    onSubmit: () => {}
  });

  const handleChoseSong = (event: any) => {
    const chosenSong = event.target.files[0];
    setSong(chosenSong);
  }

  const handleChoseAvatar = (event: any) => {
    const chosenAvatar = event.target.files[0];
    setAvatar(chosenAvatar);
  }

  const postSong = async () => {
    try {
      setIsLoading(true);

      await postSongInfo();
      await postSongAudio();
      await postSongAvatar();
      navigate(generatePath('/account/:id', { id: user.username }));
    }catch(error: any) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const postSongInfo = async () => {
    try {
      const date = new Date().toLocaleDateString('en-GB');

      await api.post('/songs', {
        name: formik.values.songName, 
        issueYear: date, 
        genre: songGenre 
      });

      console.log('everything is ok!');
    }catch(error: any) {
      console.log('response error:', error);
    }
  }

  const postSongAvatar = async () => {
    try {
      const avatarData = new FormData();
      avatarData.append('file', avatar);

      await api.post(`/songs/avatar/${formik.values.songName}`,
        avatarData, {
          headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('response is ok!');
    }catch(error: any) {
      console.log('response error');
    }
  }

  const postSongAudio = async () => {
    try {
      const songData = new FormData();
      songData.append('file', song);

      if(!songData.get('file')) {
        setIsLoading(false);
        console.log('No file selected');
        return;
      }else if(!song) {
        setIsLoading(false);
        return;
      }

      const response = await api.post(`/songs/audio/${formik.values.songName}`,
        songData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if(response.status === 200) {
        console.log('Response is ok!');
        navigate(generatePath('/account/:id', { id: user.username }));
      }else{
        setIsLoading(false);
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Response error:', error);
    }
  };

  return (
    <>
      {!user && <PageLoader />}
      {user && (
        <>
          <AccountSettings />
          <UploadContainer>
            <Container>
              <Title>Upload song</Title>
              <DataContainer>
              <Input
                type="file"
                id="uploadAudio"
                name="audio"
                accept="audio/*"
                onChange={(event: any) => handleChoseSong(event)}
              />
              <Header>
              <SongNameContainer>
                <SongName
                  name="songName"
                  type="text"
                  placeholder="song name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.songName && formik.touched.songName && <Validation>{formik.errors.songName}</Validation>}
                <SongInfoContainer>
                  <SongInfoText>Song name: {formik.values.songName}</SongInfoText>
                  <SongInfoText>Genre: {songGenre}</SongInfoText>
                </SongInfoContainer>
              </SongNameContainer>
                <AvatarAndGenre>
                  <AvatarContainer>
                    <AvatarInput
                      type="file"
                      id="setAvatar"
                      name="setAvatar"
                      accept="image/*"
                      onChange={(event: any) => handleChoseAvatar(event)}
                    />
                    {avatar ? (
                      <SongAvatar style={{display: "flex", backgroundImage: `url(${URL.createObjectURL(avatar)})`}} />
                    ) : (
                      <SongAvatar style={{display: "none"}} />
                    )}
                    <SetAvatarLabelContainer>
                      <SetAvatarLabel htmlFor="setAvatar">{avatar ? "Chose another" : "Set avatar"}</SetAvatarLabel>
                    </SetAvatarLabelContainer>
                    </AvatarContainer>
                    <Genres>
                      {genresData.map((genre, index) => (
                        <GenresItem
                          key={index}
                          onClick={() => setSongGenre(genre)}
                        >
                          {genre}
                        </GenresItem>
                      ))}
                    </Genres>
                  </AvatarAndGenre>
                </Header>
              </DataContainer>
              <ButtonsContainer>
                <Label htmlFor="uploadAudio">{song ? "Chose another" : "Chose song"}</Label>
                <SubmitContainer>
                  <UploadButton
                    disabled={user.emailVerified ? isLoading : true}
                    onClick={() => postSong()}>
                    {isLoading ? <Loader /> : "submit" }
                  </UploadButton>
                </SubmitContainer>
              </ButtonsContainer>
            </Container>
          </UploadContainer>
        </>
      )}
    </>
  );
};