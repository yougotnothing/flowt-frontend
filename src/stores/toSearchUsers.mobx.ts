import { observable, action, runInAction, makeObservable } from "mobx";
import { IUserProps, IUserSearch } from "../types/props";

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
      setSubscribes: action,
      getData: action
    });
  }

  removeData() {
    localStorage.removeItem('search_user_data');
  }

  getData() {
    if(localStorage.getItem('search_user_data')) {
      const data = localStorage.getItem('search_user_data');
      const user = data && JSON.parse(data);

      runInAction(() => {
        this.username = user.username;
        this.avatar = user.avatar;
        this.region = user.region;
        this.userHaveAvatar = user.userHaveAvatar;
        this.email = user.email;
        this.description = user.description;
      });
    }
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

  setUser(data: IUserProps | IUserSearch | null) {
    if(data) {
      runInAction(() => {
        this.username = data.username;
        this.region = data.region;
        this.description = data.description;
        this.email = data.email;
        this.avatar = data.userHaveAvatar ? data.avatar : '/defaultAvatar.png';
        this.userHaveAvatar = data.userHaveAvatar;
      });
    }

    localStorage.setItem('search_user_data', JSON.stringify(data));
  }
}

export const searchUsersStore = new SearchUsersStore();