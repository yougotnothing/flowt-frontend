import { makeObservable, observable, action, runInAction } from "mobx";
import { IAvatar, IAvatarURL } from "../types/types";

class UserAvatarStore {
  avatar: IAvatar;
  avatarURL: IAvatarURL;

  constructor() {
    this.avatar = '';
    this.avatarURL = '';

    makeObservable(this, {
      avatar: observable,
      avatarURL: observable,
      setAvatar: action,
      setAvatarURL: action,
    });
  }

  setAvatar(newAvatar: string | null) {
    runInAction(() => {
      this.avatar = newAvatar;
    });
  }

  setAvatarURL(URL: IAvatarURL) {
    runInAction(() => {
      this.avatarURL = URL;
    });
  }
}

export const userAvatarStore = new UserAvatarStore();