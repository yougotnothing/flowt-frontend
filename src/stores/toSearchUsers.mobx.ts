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
    localStorage.removeItem('username');
    localStorage.removeItem('region');
    localStorage.removeItem('avatar');
    localStorage.removeItem('email');
    localStorage.removeItem('userHaveAvatar');
    localStorage.removeItem('description');
  }

  getData() {
    const username = localStorage.getItem('username');
    const region = localStorage.getItem('region');
    const avatar = localStorage.getItem('avatar');
    const storageIsHaveAvatar = localStorage.getItem('userHaveAvatar');
    const userHaveAvatar = storageIsHaveAvatar && JSON.parse(storageIsHaveAvatar);
    const email = localStorage.getItem('email');
    const description = localStorage.getItem('description');

    runInAction(() => {
      this.username = username;
      this.avatar = avatar;
      this.region = region;
      this.userHaveAvatar = userHaveAvatar;
      this.email = email;
      this.description = description;
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

      this.username && localStorage.setItem('username', this.username);
      this.region && localStorage.setItem('region', this.region);
      this.avatar && localStorage.setItem('avatar', this.avatar);
      this.email && localStorage.setItem('email', this.email);
      this.userHaveAvatar && localStorage.setItem('userHaveAvatar', `${this.userHaveAvatar}`);
      this.description && localStorage.setItem('description', this.description);
    }
  }
}

export const searchUsersStore = new SearchUsersStore();