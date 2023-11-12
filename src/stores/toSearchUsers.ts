import { observable, action, runInAction, makeObservable } from "mobx";
import { IUserSearch, UserDTO } from "../types/props";

class SearchUsersStore {
  username: string | null;
  region: string | null;
  description: string | null;
  email: string | null;
  userHaveAvatar: boolean | null;
  avatar: any;
  followers: string[] | [];
  subscribes: string[] | [];

  constructor() {
    this.username = null;
    this.region = null;
    this.description = null;
    this.email = null;
    this.userHaveAvatar = null;
    this.avatar = null;
    this.followers = [];
    this.subscribes = [];

    makeObservable(this, {
      username: observable,
      region: observable,
      description: observable,
      email: observable,
      avatar: observable,
      userHaveAvatar: observable,
      setUser: action,
      setAvatar: action,
      setFollowers: action,
      setSubscribes: action
    });
  }

  setAvatar(src: any) {
    runInAction(() => {
      this.avatar = src;
    });
  }

  setFollowers(followers: string[]) {
    runInAction(() => {
      this.followers = followers;
    });
  }

  setSubscribes(subscribes: string[]) {
    runInAction(() => {
      this.subscribes = subscribes;
    });
  }

  setUser(data: UserDTO | IUserSearch) {
    runInAction(() => {
      this.username = data.username;
      this.region = data.region;
      this.description = data.description;
      this.email = data.email;
      this.userHaveAvatar = data.userHaveAvatar;
    });
  }
}

export const searchUsersStore = new SearchUsersStore();