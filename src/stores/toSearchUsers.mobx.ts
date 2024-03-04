import { observable, action, runInAction, makeObservable } from "mobx";
import { IPlaylist, IUserProps, IUserSearch } from "../types/props";
import { api } from "../api/axiosConfig";
import { NavigateFunction } from "react-router-dom";

class SearchUsersStore {
  username: string | null;
  region: string | null;
  description: string | null;
  email: string | null;
  userHaveAvatar: boolean | null;
  avatar: any;
  followers: string[] | [];
  subscribes: string[] | [];
  playlists: IPlaylist[];

  constructor() {
    this.username = null;
    this.region = null;
    this.description = null;
    this.email = null;
    this.userHaveAvatar = null;
    this.avatar = null;
    this.followers = [];
    this.subscribes = [];
    this.playlists = [];

    makeObservable(this, {
      username: observable,
      region: observable,
      description: observable,
      email: observable,
      avatar: observable,
      userHaveAvatar: observable,
      playlists: observable,
      subscribes: observable,
      followers: observable,
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
    const data = localStorage.getItem('user');
    
    if(data) {
      const user: IUserProps | IUserSearch = JSON.parse(data);
      runInAction(() => {
        this.avatar = user.userHaveAvatar ? user.avatar : '/defaultAvatar.png';
        this.username = user.username;
        if(user.description) this.description = user.description?.length > 0 ? user.description : 'No description.';
        this.email = user.email;
        this.region = user.region;
        this.userHaveAvatar = user.userHaveAvatar;
      });

      localStorage.setItem('user', JSON.stringify({
        username: this.username,
        avatar: this.avatar,
        userHaveAvatar: this.userHaveAvatar,
        region: this.region,
        email: this.email,
        description: this.description
      }));
    }
  }

  async getPublicUser(username: string, navigate?: NavigateFunction) {
    try {
      const response = await api.get(encodeURI(`/users/public/${username}`));
      console.log(response.data);
      this.setUser(response.data);
      this.getPlaylists(username);
      navigate && navigate(`/profile/${this.username}`);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  setUserObj(data: IUserProps | IUserSearch | null) {
    if(data) {
      localStorage.setItem('user', JSON.stringify(data));
    }else return;
  }

  getUserObj() {
    const data = localStorage.getItem('user');
    
    if(data) {
      const user: IUserProps | IUserSearch = JSON.parse(data);
      runInAction(() => {
        this.avatar = user.userHaveAvatar ? user.avatar : '/defaultAvatar.png';
        this.username = user.username;
        if(user.description) this.description = user.description?.length > 0 ? user.description : 'No description.';
        this.email = user.email;
        this.region = user.region;
        this.userHaveAvatar = user.userHaveAvatar;
      });

      localStorage.setItem('user', JSON.stringify({
        username: this.username,
        avatar: this.avatar,
        userHaveAvatar: this.userHaveAvatar,
        region: this.region,
        email: this.email,
        description: this.description
      }));
    }
  }

  async getPlaylists(username?: string) {
    try {
      const response = await api.get(`/playlists/info/${username ? username : this.username}`);

      console.log(response.data);

      runInAction(() => {
        this.playlists = response.data.playlists;
      });
    }catch(error: any) {
      console.error(error.response.data.message);
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
        this.description = data.description?.length ? data.description : 'No description.';
        this.email = data.email;
        this.avatar = data.userHaveAvatar ? data.avatar : '/defaultAvatar.png';
        this.userHaveAvatar = data.userHaveAvatar;
      });

      localStorage.setItem('user', JSON.stringify({
        username: this.username,
        region: this.region,
        description: this.description,
        email: this.email,
        avatar: this.avatar,
        userHaveAvatar: this.userHaveAvatar
      }));
    }
  }
}

export const searchUsersStore = new SearchUsersStore();