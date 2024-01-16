import { observable, action, makeObservable, runInAction } from "mobx";
import { IPlaylist } from "../types/props";

class EditPlaylistStore {
  name: string | null;
  username: string | null;
  isEditing: boolean;

  constructor() {
    this.name = null;
    this.username = null;
    this.isEditing = false;

    makeObservable(this, {
      isEditing: observable,
      username: observable,
      name: observable,
      setData: action,
      setEditing: action
    });
  }

  setData(name: string | null, username: string | null) {
    runInAction(() => {
      this.name = name;
      this.username = username;
    });
  }

  setEditing(arg: boolean) {
    runInAction(() => {
      this.isEditing = arg;
    });
  }

  setPlaylist(playlist: IPlaylist) {
    runInAction(() => {
      this.name = playlist.name;
      this.username = playlist.username;
    })
  }
}

export const editPlaylistStore = new EditPlaylistStore();