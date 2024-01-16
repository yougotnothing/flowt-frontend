import { observable, action, makeObservable, runInAction } from "mobx";
import { api } from "../api/axiosConfig";

class ChangePlaylistAvatarStore {
  avatar: string | null;
  isChanged: boolean;

  constructor() {
    this.avatar = null;
    this.isChanged = false;

    makeObservable(this, {
      avatar: observable,
      isChanged: observable,
      changeAvatar: action,
      postAvatar: action.bound
    });
  }

  changeAvatar(arg: string) {
    runInAction(() => {
      this.avatar = arg;
      this.isChanged = true;
    });
  }

  async postAvatar(e: any, name: string | null) {
    try {
      const formData = new FormData();

      formData.append('file', e);

      await api.post(`/playlists/avatar/${name}`, formData);

      runInAction(() => {
        this.isChanged = true;
      });

      console.log('Playlist avatar changed');
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const changePlaylistAvatar = new ChangePlaylistAvatarStore();