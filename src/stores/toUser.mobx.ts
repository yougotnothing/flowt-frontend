import { makeObservable, action, observable, runInAction } from "mobx";
import { IPlaylist, IUserProps } from "../types/props";
import { API_URL, api } from "../api/axiosConfig";
import { NavigateFunction, generatePath } from "react-router-dom";
import { ISongData } from "../types/types";

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
  lastListenedSongs: ISongData[];
  lastListenedPlaylists: IPlaylist[];

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
    this.lastListenedPlaylists = [];
    this.lastListenedSongs = [];

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
      login: action.bound,
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
        this.login();
      });
      
      runInAction(() => {
        this.setAvatar(googleAvatar);
        console.log(this.avatar);
      });
    }catch(error: any) {
      console.log(error.response.data.message);
    }
  }

  async login() {
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

        const isVerifyed = localStorage.getItem('artist verifyed');

        if(!isVerifyed) {
          localStorage.setItem('isVerifyed', 'false');
        }
        
        if(response.data.userHaveAvatar === true) {
          this.avatar = response.data.avatar;
        }else{
          this.avatar = '/defaultAvatar.png';
        }
      });
    }catch(error: any) {
      console.error(error.response.data.message);
      return;
    }
  }

  async changeRegion(value: string | null, navigate: NavigateFunction) {
    try {
      const response = await api.patch('/users/region', {
        newRegion: value
      });

      runInAction(() => {  
        this.region = value;
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
      return;
    }
  }

  async getLastListenedSongs() {
    try {
      const response = await api.get('/users/last-listened/songs');
      console.log('last listened songs: ', response.data);
    }catch(error: any) {
      console.log(error);
      return;
    }
  }

  async getLastListened(type: 'songs' | 'playlists' = 'songs') {
    switch(type) {
      case "songs":
        try {
          const { data } = await api.get('/users/last-listened/songs');

          runInAction(() => {
            this.lastListenedSongs = data.songs;
          });

          console.log(data.songs);
        }catch(error: any) {
          console.error(error);
          return;
        }

        break;
      case "playlists":
        try {
          const { data } = await api.get('/users/last-listened/playlists');

          runInAction(() => {
            this.lastListenedPlaylists = data.playlists;
          });

          console.log(data.playlists);
        }catch(error: any) {
          console.error(error);
          return;
        }

        break;
    }
  }
}

export const user = new UserStore();