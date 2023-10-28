import { makeObservable, observable, action, runInAction } from "mobx";
import { ISongsSearch, IUserSearch } from "../types/props";
import { api } from "../api/axiosConfig";

class SearchStore {
  users: IUserSearch[] | [];
  songs: ISongsSearch[] | [];
  playlists: any[];

  constructor() {
    this.users = [];
    this.songs = [];
    this.playlists = [];

    makeObservable(this, {
      users: observable,
      songs: observable,
      playlists: observable,
      setUsers: action,
      setSongs: action,
      setPlaylists: action,
      all: action
    });
  }

  async setUsers(input: string) {
    try {
      const response = await api.post('/search/users', {
        substring: input
      });
      runInAction(() => {
        this.users = response.data.users;
      });
      console.log(response.data.users);
    }catch(error: any) {
       console.log(error);
    }
  }

  async setSongs(input: string) {
      try {
        const response = await api.post('/search/songs', {
          substring: input
        });
        runInAction(() => {
          this.songs = response.data.songs;
        })
        console.log(response.data.songs);
      }catch(error: any) {
        console.log(error);
      }
  }

  async setPlaylists(input: string) {
      try {
        const response = await api.post('/search/playlists', {
          substring: input
        });
        runInAction(() => {
          this.playlists = response.data.playlists;
        });
        console.log(response.data.playlists);
      }catch(error: any) {
        console.log(error);
      }
  }

  async all(input: string) {
      try {
        this.setPlaylists(input);
        this.setSongs(input);
        this.setUsers(input);
      }catch(error: any) {
        console.log(error);
      }
  }
}

export const searchStore = new SearchStore();