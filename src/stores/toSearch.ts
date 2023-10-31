import { makeObservable, observable, action, runInAction } from "mobx";
import { ISongsSearch, IUserSearch } from "../types/props";
import { api } from "../api/axiosConfig";
import { userSongsStore } from "./toSongs";

class SearchStore {
  users: IUserSearch[] | [];
  songs: ISongsSearch[] | [];
  playlists: any[];
  input: string;

  constructor() {
    this.users = [];
    this.songs = [];
    this.playlists = [];
    this.input = '';

    makeObservable(this, {
      users: observable,
      songs: observable,
      playlists: observable,
      input: observable,
      setUsers: action,
      setSongs: action,
      setPlaylists: action,
      all: action,
      setInput: action,
      get: action
    });
  }

  setInput(input: string) {
    runInAction(() => {
      this.input = input;
    });
  }

  async setUsers() {
    try {
      const response = await api.post('/search/users', {
        substring: this.input
      });
      runInAction(() => {
        this.users = response.data.users;
      });
      console.log(response.data.users);
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
      })
      console.log(response.data.songs);
    }catch(error: any) {
      console.log(error);
    }
  }

  async get(param: string) {
    if(param === "All") await this.all();

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
      console.log(response.data.playlists);
    }catch(error: any) {
      console.log(error);
    }
  }

  async all() {
    try {
      await this.setPlaylists();
      await this.setSongs();
      await this.setUsers();
    }catch(error: any) {
      console.log(error);
    }
  }
}

export const searchStore = new SearchStore();