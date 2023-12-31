import { makeObservable, action, observable, runInAction } from "mobx";
import { IUserProps } from "../types/props";
import { API_URL, api } from "../api/axiosConfig";
import { NavigateFunction, generatePath } from "react-router-dom";

type ISetStateAction = (value: React.SetStateAction<boolean>) => void;

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
      changeUsername: action,
      postGoogleAvatar: action,
      changeDescription: action.bound
    });
  }

  async changeDescription(description: string) {
    try {
      await api.patch('/users/description', {
        newDescription: description
      });

      runInAction(() => {
        this.description = description;
      });

      console.log('description changed successfully');
    }catch(error: any) {
      console.error(error);
    }
  }

  async postGoogleAvatar(googleAvatar: string | null) {
    try {
      await api.post('/users/avatar/url', {
        imageUrl: googleAvatar
      })
      .then((r) => {
        console.log(r.data.message);
        this.setUser();
      });
      
      runInAction(() => {
        this.setAvatar(googleAvatar);
        console.log(this.avatar);
      });
    }catch(error: any) {
      console.log(error.response.data.message);
    }
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
      console.log(error.response.data.message);
    }
  }

  async changeRegion(value: string | null, navigate: NavigateFunction) {
    try {
      const response = await api.patch('/users/description', {
        newRegion: value
      });

      if(response) {
        navigate(generatePath('/account/:id', { id: user.username }));
      }
    }catch(error: any) {
      console.error("an error occurred");
    }
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

  async changeUsername(value: string, navigate: NavigateFunction, setIsLoading: ISetStateAction) {
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

      const image = localStorage.getItem('avatar');
      
      if(image !== `${API_URL}/images/avatar/${this.username}`) {  
        await api.post('/users/avatar/url', {
          imageUrl: image
        });

        setIsLoading(true);
        navigate(generatePath('/account/:id', { id: user.username }));
      }else{  
        setIsLoading(true);
        navigate(generatePath('/account/:id', { id: user.username }));
      }
    }catch(error: any) {
      setIsLoading(false);
      console.log('an error occurred');
    }
  }

  setAvatar(value: string | null) {
    runInAction(() => {
      this.avatar = value;
    });
  }

  async getFollowers(username: string | null = null) {
    try {
      if(username) {
        const response = await api.get(`/users/followers/${username}`);

        runInAction(() => {
          this.followers = response.data.followers;
        });
        console.log(response.data);
      }else if(username === this.username || !username) {
        const response = await api.get('/users/followers');

        runInAction(() => {
          this.followers = response.data.followers;
        });
        console.log(response.data.followers);
      }
    }catch(error: any) {
      console.error(error);
    }
  }

  async getSubscribes(username: string | null = null) {
    try {
      if(username) {
        const response = await api.get(`/users/subscribes/${username}`);

        runInAction(() => {
          this.subscribes = response.data.subscribes;
        });
        console.log(response.data);
      }else if(username === this.username || !username) {
        const response = await api.get('/users/subscribes');
        
        runInAction(() => {
          this.subscribes = response.data.subscribes;
        });
        console.log(response.data.subscribes);
      }
    }catch(error: any) {
      console.error(error);
    }
  }
}

export const user = new UserStore();