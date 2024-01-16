import { action, makeObservable, observable, runInAction } from "mobx";
import { api } from "../api/axiosConfig";

class ChangePlaylistNameStore {
  isOpen: boolean;
  name: string;

  constructor() {
    this.isOpen = false;
    this.name = '';

    makeObservable(this, {
      isOpen: observable,
      name: observable,
      setIsOpen: action,
      changeName: action,
      patchName: action.bound
    });
  }

  changeName(arg: string) {
    runInAction(() => {
      this.name = arg;
    });
  }

  setIsOpen(arg: boolean) {
    runInAction(() => {
      this.isOpen = arg;
    });
  }

  async patchName(name: string | null) {
    try {
      const response = await api.patch(`/playlists/${name}`, {
        playlistName: name,
        newPlaylistName: this.name
      });
      
      this.setIsOpen(false);
      console.log(response.status, 'Playlist name has changed');
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const changePlaylistName = new ChangePlaylistNameStore();