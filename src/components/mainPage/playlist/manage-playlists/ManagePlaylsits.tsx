import { FC, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { playlistsStore as playlists, playlistsStore } from "../../../../stores/toPlaylists.mobx";
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
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { runInAction } from "mobx";
import { userSongsStore } from "../../../../stores/toSongs.mobx";

export const ManagePlaylists: FC = observer(() => {
  const[isOpen, setIsOpen] = useState<boolean[]>(Array(playlists.self.length).fill(false));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== location.state) {
      sessionStorage.removeItem('songs');
    }
  }, [location.pathname, location.state]);

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

  const handleRedirectToEditPlaylist = (name: string | null) => {
    if(name && user.username) {
      editPlaylist.setEditing(true);
      editPlaylist.setData(name, user.username);

      sessionStorage.setItem('name', name);
      sessionStorage.setItem('username', user.username);

      navigate(generatePath('/:u/playlist/:n/edit-playlist', {
        u: user.username,
        n: name
      }));
    }
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
            <PlaylistItem onClick={() => {
              playlistsStore.setContainer(playlist);
              sessionStorage.setItem('songs', JSON.stringify(playlist.songs));
              userSongsStore.getInfo(playlist.songs);
              handleRedirectToEditPlaylist(playlist.name);
            }}>Edit playlist</PlaylistItem>
            <PlaylistItem onClick={() => handleDeletePlaylist(playlist.name, index)}>Delete playlist</PlaylistItem>
          </PlaylistDroplist>
        </PlaylistContainer>
      ))}
    </Container>
  );
});