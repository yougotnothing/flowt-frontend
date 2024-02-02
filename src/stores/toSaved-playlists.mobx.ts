import { action, makeObservable, observable, runInAction } from "mobx";
import { IPlaylist } from "../types/props";
import { api } from "../api/axiosConfig";

class SavedPlaylists {
  playlists: IPlaylist[];

  constructor() {
    this.playlists = [];

    makeObservable(this, {
      playlists: observable,
      getSaved: action,
      savePlaylist: action,
      removePlaylist: action
    });
  }

  async getSaved() {
    try {
      const { data } = await api.get('/users/saved-playlists');

      runInAction(() => {
        this.playlists = data.playlists;
      });
    }catch(error: any) {
      console.log(error);
      return;
    }
  }

  async savePlaylist(playlist: IPlaylist) {
    try {
      await api.post('/saved-playlists');
      console.log('playlist saved');
      console.log(playlist);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async removePlaylist(playlist: IPlaylist) {
    try {
      await api.delete('/saved-playlists');
      console.log('playlist deleted');
      console.log(playlist);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const savedPlaylists = new SavedPlaylists();