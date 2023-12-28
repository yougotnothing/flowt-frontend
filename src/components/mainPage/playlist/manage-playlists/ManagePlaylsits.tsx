import { FC, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { playlistsStore as playlists } from "../../../../stores/toPlaylists.mobx";
import { editPlaylistStore as editPlaylist } from "../../../../stores/toEditPlaylist.mobx";

import {
  PlaylistInfoContainer,
  PlaylistButton,
  PlaylistInfo as Info,
  Container as PlaylistContainer,
  PlaylistIcon as Icon,
  PlaylistDroplist,
  PlaylistItem,
  Header
} from "../large/Playlist.styled";
import { Container } from "../Playlist.styled";
import { user } from "../../../../stores/toUser.mobx";
import { api } from "../../../../api/axiosConfig";
import { generatePath, useNavigate } from "react-router-dom";
import { IPlaylist } from "../../../../types/props";
import { runInAction } from "mobx";

export const ManagePlaylists: FC = observer(() => {
  const[isOpen, setIsOpen] = useState<boolean[]>(Array(playlists.self.length).fill(false));
  const navigate = useNavigate();

  const handleSetOpen = (arg: boolean, index: number) => {
    setIsOpen(prevState => {
      const newState = [...prevState];
      newState[index] = arg;
      return newState;
    });
  }

  const getPlaylists = async () => {
    try {
      const response = await api.get('/users/playlists');
      playlists.setSelf(response.data.playlists);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  const handleRedirectToEditPlaylist = (playlist: IPlaylist) => {
    editPlaylist.setEditing(true);
    editPlaylist.setData(playlist.name, user.username);
    navigate(generatePath('/:id/playlist/:name/edit-playlist', { id: user.username, name: playlist.name }));
  }

  const handleDeletePlaylist = (name: string, index: number) => {
    playlists.deletePlaylist(name);
    runInAction(() => {
      playlists.self.splice(index, 1);
    });
  }

  useEffect(() => {
    getPlaylists();
    console.log(playlists.self);
  }, []);

  return (
    <Container style={{ alignItems: "start" }}>
      <Header>Your playlists:</Header>
      {playlists.self.map((playlist, index) => (
        <PlaylistContainer key={index} $isEditing={editPlaylist.isEditing}>
          <Icon
            $isEditing={editPlaylist.isEditing}
            $username={user.username}
            $name={playlist.name}
          />
          <PlaylistInfoContainer>
            <Info $type="name">{playlist.name}</Info>
            <Info $type="username">{user.username}</Info>
          </PlaylistInfoContainer>
          <PlaylistButton
            onClick={() => handleSetOpen(!isOpen[index], index)}
          >options</PlaylistButton>
          <PlaylistDroplist $isOpen={isOpen[index]}>
            <PlaylistItem onClick={() => handleRedirectToEditPlaylist(playlist)}>Edit playlist</PlaylistItem>
            <PlaylistItem onClick={() => handleDeletePlaylist(playlist.name, index)}>Delete playlist</PlaylistItem>
          </PlaylistDroplist>
        </PlaylistContainer>
      ))}
    </Container>
  );
});