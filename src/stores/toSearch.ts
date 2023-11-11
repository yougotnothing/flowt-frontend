import { makeObservable, observable, action, runInAction } from "mobx";
import { ISongsSearch, IUserSearch } from "../types/props";
import { api, API_URL } from "../api/axiosConfig";

class SearchStore {
  users: IUserSearch[] | [];
  songs: ISongsSearch[] | [];
  playlists: any[];
  input: string;
  message: string | null;
  isOpen: boolean;

  constructor() {
    this.users = [];
    this.songs = [];
    this.playlists = [];
    this.input = '';
    this.message = null;
    this.isOpen = false;

    makeObservable(this, {
      users: observable,
      songs: observable,
      playlists: observable,
      input: observable,
      message: observable,
      isOpen: observable,
      setUsers: action,
      setSongs: action,
      setPlaylists: action,
      all: action,
      setInput: action,
      get: action,
      setIsOpen: action,
      setMessage: action
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
      const response = await api.post('/search/users', {
        substring: this.input
      });

      if(response) {
        if (this.users.length === 0) {
          this.setMessage(`Can't find data by ${this.input}`);
        }
      }
      runInAction(() => {
        this.users = response.data.users;
      });

        if(this.users.length === 0) {
          this.setMessage(`Can't find data by ${this.input}`);
        }
      }catch(error: any) {
       console.log(error);
    }
  }

  async setSongs() {
    try {
      const response = await api.post('/search/songs', {
        substring: this.input
      });

      runInAction(() => {
        this.songs = response.data.songs;

        if(this.songs.length === 0) {
          this.message = `Can't find data by ${this.input}`;
        }
      });
    }catch(error: any) {
      console.log(error);
    }
  }

  async get(param: string) {
    if(param === "All") {
      await this.all();
    }
    if(this.songs.length > 0 && this.users.length > 0) {
      runInAction(() => {
        this.message = null;
        this.isOpen = true;
      });
    }else{
      runInAction(() => {
        this.message = `Can't find data by ${this.input}`;
      });
    }

    try {
      runInAction(() => {
        if(param === "Songs") {
          this.setSongs();
          this.playlists = [];
          this.users = [];
        }
        if(param === "Playlists") {
          this.setPlaylists();
          this.songs = [];
          this.users = [];
        }
        if(param === "Authors") {
          this.setUsers();
          this.songs = [];
          this.playlists = [];
        }
      });
    }catch(error: any) {
      console.log(error);
    }
  }

  async setPlaylists() {
    try {
      const response = await api.post('/search/playlists', {
        substring: this.input
      });

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
}

export const searchStore = new SearchStore();