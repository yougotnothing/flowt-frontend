import { FC, useState } from "react";

import { useNavigate, generatePath} from "react-router-dom";
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
import { Title as Helmet } from "../../helmet";
import { postSongAudio, postSongAvatar, postSongInfo, handleChoseAvatar, handleChoseSong } from "./functions";

export const Upload: FC = () => {
  const[songGenre, setSongGenre] = useState<string | null>(null);
  const[isLoading, setIsLoading] = useState(false);
  const[song, setSong] = useState<Blob>();
  const[avatar, setAvatar] = useState<Blob>();
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

  const postSong = async () => {
    try {
      setIsLoading(true);

      await postSongInfo(formik, songGenre);
      await postSongAudio(formik, setIsLoading, song, navigate);
      await postSongAvatar(formik, avatar);
      navigate(generatePath('/account/:id', { id: user.username }));
    }catch(error: any) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const avatarURL = avatar && URL.createObjectURL(avatar);

  return (
    <>
      {!user && <PageLoader />}
      {user && (
        <>
          <Helmet title="Upload song" />
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
                  onChange={(event: any) => handleChoseSong(event, setSong)}
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
                        onChange={(event: any) => handleChoseAvatar(event, setAvatar)}
                      />
                      <SongAvatar $image={avatarURL} />
                      <SetAvatarLabelContainer>
                        <SetAvatarLabel htmlFor="setAvatar">{avatar ? "Chose another" : "Set avatar"}</SetAvatarLabel>
                      </SetAvatarLabelContainer>
                      </AvatarContainer>
                      <Genres>
                        {genresData.map((genre, index) => (
                          <GenresItem
                            key={index}
                            onClick={() => setSongGenre(genre)}
                          >{genre}</GenresItem>
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
                    onClick={postSong}
                  >{isLoading ? <Loader /> : "submit" }</UploadButton>
                </SubmitContainer>
              </ButtonsContainer>
            </Container>
          </UploadContainer>
        </>
      )}
    </>
  );
};