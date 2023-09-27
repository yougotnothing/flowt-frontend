import { makeObservable, observable, action } from "mobx";

class UserAvatarStore {
  avatar: any | null;
  avatarURL: any | Blob;

  constructor(initialAvatar: any) {
    this.avatar = initialAvatar;
    this.avatarURL = null;
    makeObservable(this, {
      avatar: observable,
      avatarURL: observable,
      setAvatar: action,
      setAvatarURL: action
    });
  }

  setAvatar(newAvatar: any) {
    this.avatar = newAvatar;
  }

  setAvatarURL(URL: any | Blob) {
    this.avatarURL = URL;
  }
}

export const userAvatarStore = new UserAvatarStore(null);