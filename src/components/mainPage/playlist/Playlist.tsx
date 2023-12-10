import { FC, useState, useEffect } from "react";

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
import { playlistsStore as playlist } from "../../../stores/toPlaylists.mobx";
import settings from "../../../json/playlistSettings.json";
import { useFormik } from "formik";
import { playlistSchema } from "../../../validation/yup.config";
import { useLocation } from "react-router-dom";
import { handlePostAvatar } from "./functions";
import { PlaylistItems } from "./Playlist-Items";
import { api } from "../../../api/axiosConfig";
import { user } from "../../../stores/toUser.mobx";

export const Playlist: FC = observer(() => {
  const[isApply, setIsApply] = useState<boolean>(false);
  const[isNull, setIsNull] = useState<boolean>(true);
  const[isPrivate, setIsPrivate] = useState<boolean>(false);
  const location = useLocation();

  const handleCreatePlaylist = async () => {
    try {
      const response = await api.post('/playlists', {
        name: formik.values.name,
        isPrivate: isPrivate
      });
      if(response.status === 200) {
        console.log(response.data.name, response.data.isPrivate);
        playlist.setSelf(response.data);
        console.log('Playlist created successfuly!');
      }
    }catch(error: any) {
      console.error(error);
    }
  }

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

  useEffect(() => {
    if(formik.values.name && playlist.isHaveAvatar) {
      setIsNull(false);
    }
  }, [formik.values.name, playlist.isHaveAvatar]);
  
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
      if(isNull === false) {
        await handlePostAvatar(playlist.avatar, formik.values.name);
        await playlist.addSongs(formik.values.name);
      }
    }catch(error: any) {
      console.error(error);
    }
  }

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
          <CreatorName>{user.username}</CreatorName>
          <PlaylistInfo
            $isNull={isNull}
            placeholder="Name"
            onChange={(e: any) => {
              formik.handleChange(e);
              playlist.setInput(e.target.value);
            }}
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
        <CreatePlaylist
          disabled={isNull} 
          onClick={() => {
            handleCreatePlaylist();
            createPlaylist();
          }}
        >
          Create
        </CreatePlaylist>
      </PlaylistContainer>
      <SearchSongsContainer>
        <SearchSongsNav>
          <NavItemContainer>
            {settings.map((setting, index) => (
              <NavItem key={index}>
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