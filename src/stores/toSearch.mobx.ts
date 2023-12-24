import { makeObservable, observable, action, runInAction } from "mobx";
import { IPlaylist, ISongPlaylist, IUserSearch } from "../types/props";
import { api } from "../api/axiosConfig";
import { ISongData } from "../types/types";

class SearchStore {
  users: IUserSearch[] | [];
  songs: ISongPlaylist[] | [];
  playlists: IPlaylist[];
  input: string;
  message: string | null;
  isOpen: boolean;
  page: number;
  song: ISongData | null;

  constructor() {
    this.users = [];
    this.songs = [];
    this.playlists = [];
    this.input = '';
    this.message = null;
    this.isOpen = false;
    this.page = 0;
    this.song = null;

    makeObservable(this, {
      users: observable,
      songs: observable,
      playlists: observable,
      input: observable,
      message: observable,
      isOpen: observable,
      page: observable,
      song: observable,
      setPage: action,
      setUsers: action,
      setSongs: action,
      setPlaylists: action,
      all: action,
      setInput: action,
      get: action,
      setIsOpen: action,
      setMessage: action,
      setSong: action
    });
  }

  setPage(page: number) {
    runInAction(() => {
      this.page = page;
    });
  }

  setMessage(message: string | null) {
    runInAction(() => {
      this.message = message;
    });
  }

  setInput(input: string) {
    runInAction(() => {
      this.input = input;
    });
  }

  setIsOpen(arg: boolean) {
    runInAction(() => {
      this.isOpen = arg;
    });
  }

  async setUsers() {
    try {
      const response = await api.get('/search/users', {
        params: {
          page: this.page,
          substring: this.input
        }
      });

      if(response) {
        if(this.users.length === 0) {
          this.setMessage(`Can't find data by ${this.input}`);
        }
      }
      runInAction(() => {
        this.users = response.data.users;
      });
      console.log(this.users);

      if(this.users.length === 0) {
        this.setMessage(`Can't find data by ${this.input}`);
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  async setSongs() {
    try {
      const response = await api.get('/search/songs', {
        params: {
          page: this.page,
          substring: this.input
        }
      });

      runInAction(() => {
        this.songs = response.data.songs;

        if(this.songs.length === 0) {
          this.message = `Can't find data by ${this.input}`;
        }
      });
      console.log(this.songs);
    }catch(error: any) {
      console.log(error);
    }
  }

  async get(param: string) {
    try {
      runInAction(async () => {
        switch(param) {
          case "All":
            await this.all();
            break;
          case "Songs":
            await this.setSongs();
            this.playlists = [];
            this.users = [];
            break;
          case "Playlists":
            await this.setPlaylists();
            this.songs = [];
            this.users = [];
            break;
          case "Authors":
            await this.setUsers();
            this.songs = [];
            this.playlists = [];
            break;
        }
      });

      if(this.songs.length > 0 && this.users.length > 0 && this.playlists.length > 0) {
        runInAction(() => {
          this.message = null;
          this.isOpen = true;
        });
      }else{
        runInAction(() => {
          this.message = `Can't find data by ${this.input}`;
        });
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  async setPlaylists() {
    try {
      const response = await api.get('/search/playlists', {
        params: {
          page: this.page,
          substring: this.input
        }
      });
      console.log(response.data);

      runInAction(() => {
        this.playlists = response.data.playlists;
      });
    }catch(error: any) {
      console.log(error);
    }
  }

  async all() {
    try {
      await this.setPlaylists();
      await this.setSongs();
      await this.setUsers();

      if(this.songs.length > 0 || this.users.length > 0) {
        runInAction(() => {
          this.message = null;
          this.isOpen = true;
        });
      }else{
        runInAction(() => {
          this.message = `Can't find data by ${this.input}`;
        });
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  setSong(song: ISongData)  {
    runInAction(() => {
      this.song = song;
    });
    console.log(this.song);
  }
}

export const searchStore = new SearchStore();