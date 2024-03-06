import { observable, action, runInAction, makeObservable } from "mobx";
import { IPlaylist, ISearchPlaylist } from "../types/props";
import { API_URL, api } from "../api/axiosConfig";

class LikedPlaylistsStore {
  playlists: IPlaylist[];

  constructor() {
    this.playlists = [];

    makeObservable(this, {
      playlists: observable,
      setLikedPlaylists: action,
      dislike: action,
      like: action
    });
  }

  async setLikedPlaylists() {
    try {
      const { data } = await api.get('/users/saved-playlists');

      console.log(data);
      
      runInAction(() => {
        this.playlists = data.playlists;
      });
    }catch(error: any) {
      console.log(error);
    }
  }

  async dislike(playlist: IPlaylist) {
    try {
      const response = await api.delete('/saved-playlists', {
        params: {
          username: playlist.username,
          playlistName: playlist.name
        }
      });

      console.log("playlist deleted from liked. ", response.data);
    }catch(error: any) {
      console.error(error);
    }
  }

  async like(playlist: IPlaylist | { name: string, username: string }) {
    try {
      await api.post('/saved-playlists', {
        username: playlist.username,
        playlistName: playlist.name
      });

      this.setLikedPlaylists();
    }catch(error: any) {
      console.error(error);
    }
  }
}

export const likedPlaylists = new LikedPlaylistsStore();