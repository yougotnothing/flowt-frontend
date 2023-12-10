import { makeObservable, action, observable, runInAction } from "mobx";
import { IUserProps } from "../types/props";
import { api } from "../api/axiosConfig";
import { NavigateFunction, generatePath } from "react-router-dom";

class UserStore {
  user: IUserProps | null;
  isUserAuthenticated: boolean;
  avatar: string | null;
  description: string | null;
  email: string | null;
  emailVerified: boolean | null;
  region: string | null;
  userHaveAvatar: boolean | null;
  username: string | null;
  followers: IUserProps[];
  subscribes: IUserProps[];

  constructor() {
    this.user = null;
    this.isUserAuthenticated = false;
    this.avatar = null;
    this.description = null;
    this.email = null;
    this.region = null;
    this.emailVerified = null;
    this.userHaveAvatar = null;
    this.username = null;
    this.followers = [];
    this.subscribes = [];

    makeObservable(this, {
      isUserAuthenticated: observable,
      avatar: observable,
      description: observable,
      email: observable,
      region: observable,
      followers: observable,
      subscribes: observable,
      userHaveAvatar: observable,
      emailVerified: observable,
      username: observable,
      getFollowers: action,
      setUser: action.bound,
      changeRegion: action,
      changeUsername: action
    });
  }

  async setUser() {
    try {
      const response = await api.get('/users/authenticated');
      runInAction(() => {
        this.isUserAuthenticated = true;
        this.user = response.data;
        this.username = response.data.username;
        this.email = response.data.email;
        this.region = response.data.region;
        this.description = response.data.description;
        this.userHaveAvatar = response.data.userHaveAvatar;
        this.emailVerified = response.data.emailVerified;
        console.log(response.data.avatar);
        console.log(response.data);
        
        if(response.data.userHaveAvatar === true) {
          this.avatar = response.data.avatar;
        }else{
          this.avatar = '/defaultAvatar.png';
        }
      });
      console.log(user.user);
    }catch(error: any) {
      console.log(error);
    }
  }

  async changeRegion(value: string) {
    
  }

  logout() {
    localStorage.removeItem('token');

    runInAction(() => {
      this.isUserAuthenticated = false;
      this.username = null;
      this.email = null;
      this.region = null;
      this.description = null;
      this.userHaveAvatar = null;
      this.emailVerified = null;
      this.avatar = null;
    })
  }

  async changeUsername(value: string, navigate: NavigateFunction, setIsLoading: (value: React.SetStateAction<boolean>) => void) {
    try {
      const response = await api.patch('/users/username', {
        newUsername: value.trim()
      });

      if(response) {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('token', token);
      }

      runInAction(() => {
        this.username = value.trim();
      });

      setIsLoading(true);
      navigate(generatePath('/account/:id', { id: user.username }));
    }catch(error: any) {
      setIsLoading(false);
      console.log('an error occurred');
    }
  }

  setAvatar(value: string) {
    runInAction(() => {
      this.avatar = value;
    });
  }

  async getFollowers() {
    try {
      const response = await api.get('/users/followers');
      runInAction(() => {
        this.followers = response.data.followers;
      });
    }catch(error: any) {
      console.error(error);
    }
  }

  async getSubscribes() {
    try {
      const response = await api.get('/users/subscribes');
      runInAction(() => {
        this.subscribes = response.data.subscribes;
      });
    }catch(error: any) {
      console.error(error);
    }
  }
}

export const user = new UserStore();