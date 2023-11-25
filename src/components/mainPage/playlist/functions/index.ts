import { api } from "../../../../api/axiosConfig";
import { playlistsStore } from "../../../../stores/toPlaylists.mobx";

export const handleCreatePlaylist = async (name: string, isPrivate: boolean) => {
  try {
    const response = await api.post('/playlists', {
      name: name,
      isPrivate: isPrivate
    });
    if(response.status === 200) {
      console.log(response.data.name, response.data.isPrivate);
      playlistsStore.setSelf(response.data);
      console.log('Playlist created successfuly!');
    }
  }catch(error: any) {
    console.error(error);
  }
}

export const handlePostAvatar = async (avatar: any, name: string) => {
  try {
    const formData = new FormData();
    formData.append('file', avatar);

    await api.post(`/playlists/avatar/${name}`, formData, {
      headers: { 'Content-Type': 'image/jpeg' }
    });
  }catch(error: any) {
    console.error(error);
  }
}

export const handleAddSong = async (playlist: string, author: string, song: string) => {
  try {
    await api.post(`/playlists/${playlist}/${author}/${song}`);
    console.log(`Song: ${song} added successfully!`);
  }catch(error: any) {
    console.error(error);
  }
}

export const handleRemoveSong = async (playlist: string, author: string, song: string) => {
  try {
    await api.delete(`/playlists/${playlist}/${author}/${song}`);
    console.log(`Song: ${song}, removed successfully`);
  }catch(error: any) {
    console.error(error);
  }
}

export const handleChangePlaylistName = async (name: string) => {
  try {
    await api.patch('/playlists', {
      name: name
    });
    console.log('Playlist name changed successfully!');
  }catch(error: any) {
    console.error(error);
  }
}