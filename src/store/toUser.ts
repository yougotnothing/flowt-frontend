import { observable, makeObservable, action } from "mobx";
import { UserDTO } from "../types/props";
import { api, API_URL } from "../api/axiosConfig";
import { IAvatar, IAvatarURL } from "../types/types";

class UserStore implements UserDTO {
  username: string | null;
  description: string | null;
  email: string | null;
  region: string | null;
  notifications: string[];
  followers: string[];
  subscribes: string[];
  avatar: IAvatar;
  avatarUrl: IAvatarURL;

  constructor() {
    this.username = null;
    this.description = null;
    this.email = null;
    this.region = null;
    this.notifications = [];
    this.avatar = null;
    this.avatarUrl = null;
    this.followers = [];
    this.subscribes = [];

    makeObservable(this, {
      username: observable,
      followers: observable,
      subscribes: observable,
      email: observable,
      region: observable,
      description: observable,
      notifications: observable,
      avatar: observable,
      avatarUrl: observable,
      getData: action,
      setAvatar: action,
      setAvatarUrl: action
    });
  }

  setAvatarUrl(url: string) {
    this.avatarUrl = url;
  }

  setAvatar(src: string) {
    this.avatar = src;
  }

  async getData() {
    try {
      const response = await api.get('/users/authenticated');
      this.username = response.data.username;
      this.region = response.data.region;
      this.description = response.data.description;
      this.email = response.data.email;
      this.followers = response.data.followers;
      this.subscribes = response.data.subscribes;
      this.notifications.push(response.data.notifications);
      this.setAvatarUrl(`${API_URL}/images/user/${response.data.username}`);
      this.setAvatar(`${API_URL}/images/user/${response.data.username}`);
    }catch(error: any) {
      console.log(error);
    }
  }
}

export const userStore = new UserStore();