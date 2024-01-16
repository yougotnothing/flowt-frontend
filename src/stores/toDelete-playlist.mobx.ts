import { action, makeObservable, observable, runInAction } from "mobx";
import { api } from "../api/axiosConfig";
import { NavigateFunction } from "react-router-dom";

class DeletePlaylistStore {
  isOpen: boolean;

  constructor() {
    this.isOpen = false;

    makeObservable(this, {
      isOpen: observable,
      setIsOpen: action,
      deletePlaylist: action.bound
    });
  }

  setIsOpen(arg: boolean) {
    runInAction(() => {
      this.isOpen = arg;
    });
  }

  async deletePlaylist(name: string | null, navigate?: NavigateFunction) {
    try {
      const response = await api.delete(`/playlists/${name}`);

      console.log(response.status, `playlist ${name} successfully deleted.`);

      navigate && navigate('/home');
      this.setIsOpen(false);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const deletePlaylistStore = new DeletePlaylistStore();