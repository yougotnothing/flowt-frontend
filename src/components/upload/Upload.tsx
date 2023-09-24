import React, { useEffect, useState } from "react";

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
import { Account } from "../mainPage/account/Account";
import { useFormik } from "formik";
import { songNameSchema } from "../../validation/yup.config";
import { Loader } from "../loader/Loader";
import genresData from "../../consts/genres.json";
import { useContextValues } from "../../contexts/Context";

export const Upload = () => {
  const[songGenre, setSongGenre] = useState<string | null>(null);
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[song, setSong] = useState<any | Blob>(null);
  const[avatar, setAvatar] = useState<any | Blob>(null);
  const navigate = useNavigate();
  const { user } = useContextValues();
  let counter: number = 0;

  const formik = useFormik<{
    songName: ""
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

  const postSongInfo = async () => {
    try {
      const date = new Date().toLocaleDateString('en-GB');
      setIsLoading(true);
      const avatarData = new FormData();
      const songData = new FormData();
      songData.append('file', song);
      avatarData.append('file', avatar);

      await api.post('/songs', {name: formik.values.songName, issueYear: date, genre: songGenre});
      await api.post(`/songs/avatar/${formik.values.songName}`, avatarData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      await api.post(`/songs/audio/${formik.values.songName}`, songData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(generatePath('/account/:id', { id: user.username }))
    }catch(error: any) {
      console.log('an error occurred');
      setIsLoading(false);
    }
  }

  return (
    <>
      {!user && <PageLoader />}
      {user && (
        <>
          <Account />
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
                  <SongInfoText>Genre: {songGenre}</SongInfoText>
                  <SongInfoText>Song name: {formik.values.songName}</SongInfoText>
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
                      <SongAvatar style={{
                        display: "flex",
                        backgroundImage: `url(${URL.createObjectURL(avatar)})`
                      }} />
                    ) : (
                      <SongAvatar style={{display: "none"}} />
                    )}
                    <SetAvatarLabelContainer>
                      <SetAvatarLabel htmlFor="setAvatar">{avatar ? "Chose another" : "Set avatar"}</SetAvatarLabel>
                    </SetAvatarLabelContainer>
                    </AvatarContainer>
                    <Genres>
                      {genresData.map((genre: any) => (
                        <GenresItem
                          key={++counter}
                          onClick={() => setSongGenre(genre)}
                        >
                          {genre}</GenresItem>
                      ))}
                    </Genres>
                  </AvatarAndGenre>
                </Header>
              </DataContainer>
              <ButtonsContainer>
                <Label htmlFor="uploadAudio">{song ? "Chose another" : "Chose song"}</Label>
                <SubmitContainer>
                  <UploadButton
                    onClick={() => postSongInfo()}>{isLoading ? <Loader /> : "submit" }</UploadButton>
                </SubmitContainer>
              </ButtonsContainer>
            </Container>
          </UploadContainer>
        </>
      )}
    </>
  );
};
