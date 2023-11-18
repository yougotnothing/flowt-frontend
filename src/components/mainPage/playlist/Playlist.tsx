import React, { useState, useEffect } from "react";

import {
  Container,
  SearchSongs,
  PlaylistInfo,
  PlaylistIcon,
  AddSongs,
  PlaylistContainer,
  InfoContainer,
  CreatorName,
  Input,
  SearchSongsContainer,
  SearchSongsNav,
  InputContainer,
  NavItem,
  CreatePlaylist,
  NavItemContainer,
  IsPrivateField,
  PrivacySettings
} from "./Playlist.styled";
import { observer } from "mobx-react-lite";
import { userUsernameStore } from "../../../stores/toChangeUsername.mobx";
import { playlistsStore as playlist } from "../../../stores/toPlaylists.mobx";
import settings from "../../../json/playlistSettings.json";
import { useFormik } from "formik";
import { playlistSchema } from "../../../validation/yup.config";
import { useLocation } from "react-router-dom";
import {
  handleCreatePlaylist,
  handlePostAvatar,
} from "./functions";
import { PlaylistItems } from "./playlistItems";

export const Playlist: React.FC = observer(() => {
  const[isApply, setIsApply] = useState<boolean>(false);
  const[isNull, setIsNull] = useState<boolean>(true);
  const[isPrivate, setIsPrivate] = useState<boolean>(false);
  const[param, setParam] = useState<string>("All");
  const location = useLocation();

  const formik = useFormik<{
    name: string,
    description: string
  }>({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: playlistSchema,
    onSubmit: () => {}
  });

  const handleSetAvatar = (e: any) => {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);
    playlist.setAvatarURL(image);
    playlist.setAvatar(file);
    setIsApply(true);
  }

  useEffect(() => {
    if(location.pathname !== '/:id/playlists') {
      playlist.setAvatarURL(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    playlist.search('All');
  }, []);

  const createPlaylist = async () => {
    try {
      await handleCreatePlaylist(formik.values.name, isPrivate);
      await handlePostAvatar(playlist.avatar, formik.values.name);
      await playlist.addSongs();
    }catch(error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(formik.values.name && playlist.avatar) {
      playlist.addSongs();
      return;
    }
  }, [formik.values.name]);

  useEffect(() => {
    if(formik.values.name && isApply) {
      setIsNull(false);
    }    
  }, [formik.values.name, isApply]);

   return (
    <Container>
      <PlaylistContainer>
        <Input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleSetAvatar}
        />
        <PlaylistIcon $avatar={playlist.avatarURL || '/plus.png'} htmlFor="avatar" $isApply={isApply} />
        <InfoContainer>
          <CreatorName>{userUsernameStore.username}</CreatorName>
          <PlaylistInfo
            $isNull={isNull}
            placeholder="Name"
            onChange={formik.handleChange}
            name="name"
            $type="name"
          />
          <PlaylistInfo
            $isNull={isNull}
            onChange={formik.handleChange}
            placeholder="Description"
            $type="description"
          />
          <PrivacySettings>
            Privacy settings:
            <IsPrivateField onClick={() => setIsPrivate(!isPrivate)}>
              {isPrivate ? 'Private' : 'Public'}
            </IsPrivateField>
          </PrivacySettings>
        </InfoContainer>
        <CreatePlaylist disabled={isNull} onClick={createPlaylist}>
          Create
        </CreatePlaylist>
      </PlaylistContainer>
      <SearchSongsContainer>
        <SearchSongsNav>
          <NavItemContainer>
            {settings.map((setting, index) => (
              <NavItem key={index} onClick={() => setParam(setting)}>
                {setting}
              </NavItem>
            ))}
          </NavItemContainer>
          <InputContainer>
            <SearchSongs placeholder="Search" />
            <AddSongs className="addSongs" />
          </InputContainer>
        </SearchSongsNav>
        <PlaylistItems />
      </SearchSongsContainer>
    </Container>
  );
});