import { makeObservable, observable, action, runInAction, computed } from "mobx";

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
      setAvatarURL: action,
      userAvatar: computed
    });
  }

  setAvatar(newAvatar: any) {
    runInAction(() => {
      this.avatar = newAvatar;
    });
  }

  setAvatarURL(URL: any | Blob) {
    this.avatarURL = URL;
  }

  get userAvatar() {
    return this.avatar;
  }
}

export const userAvatarStore = new UserAvatarStore(null);