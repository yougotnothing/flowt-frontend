import { makeObservable, observable, action, runInAction } from "mobx";
import { ISearchPlaylist, ISongPlaylist, ISongsSearch, IUserSearch } from "../types/props";
import { api } from "../api/axiosConfig";
import { ISongData } from "../types/types";

class SearchStore {
  users: IUserSearch[];
  songs: ISongPlaylist[];
  playlists: ISearchPlaylist[];
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

  async setUsers(method: 'main page' | 'search' = 'search') {
    try {
      const response = await api.get('/search/users', {
        params: {
          page: this.page,
          substring: this.input
        }
      });

      if(method === 'main page') {
        runInAction(() => this.users = response.data.users);
      }else{
        const uniqueList: Set<IUserSearch> = new Set(
          response.data.users.filter((user: IUserSearch) => 
            !this.users.some((existingUser: IUserSearch) =>
              existingUser.username === user.username
            )
          )
        );

        const uniqueArray = Array.from(uniqueList);

        runInAction(() => this.users = [...this.users, ...uniqueArray]);
      }
      
      if(this.users.length === 0) {
        this.setMessage(`Can't find data by ${this.input}`);
      }
    }catch(error: any) {
      console.log(error);
    }
  }

  async setSongs(method: 'main page' | 'search' = 'search') {
    try {
      const response = await api.get('/search/songs', {
        params: {
          page: this.page,
          substring: this.input
        }
      });

      if(method === 'main page') {
        runInAction(() => this.songs = response.data.songs);
      }else{
        const uniqueList: Set<ISongPlaylist> = new Set(
          response.data.songs.filter((song: ISongPlaylist) =>
            !this.songs.some((existingSong: ISongPlaylist) =>
              existingSong.songId === song.songId
            )
          )
        );

        const uniqueArray = Array.from(uniqueList);

        runInAction(() => this.songs = [...this.songs, ...uniqueArray]);
      }

      if(this.songs.length === 0) {
        this.message = `Can't find data by ${this.input}`;
      }
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
            runInAction(() => this.playlists = []);
            runInAction(() => this.users = []);
            break;
          case "Playlists":
            await this.setPlaylists();
            runInAction(() => this.songs = []);
            runInAction(() => this.users = []);
            break;
          case "Authors":
            await this.setUsers();
            runInAction(() => this.songs = []);
            runInAction(() => this.playlists = []);
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

  async setPlaylists(method: 'main page' | 'search' = 'search') {

    try {
      const response = await api.get('/search/playlists', {
        params: {
          page: this.page,
          substring: this.input
        }
      });

      runInAction(() => {
        if(method === 'main page') {
          this.playlists = response.data.playlists;
        }else{
          const uniqueList: Set<ISearchPlaylist> = new Set(
            response.data.playlists.filter((playlist: ISearchPlaylist) =>
              !this.playlists.some((existingPlaylist: ISearchPlaylist) => 
                existingPlaylist.id === playlist.id
              )
            )
          );

          const uniqueArray = Array.from(uniqueList);

          this.playlists = [...this.playlists, ...uniqueArray];
        }

        if(this.playlists.length === 0) {
          this.message = `Can't find data by ${this.input}`;
        }
      });
      console.log(this.playlists);
    }catch(error: any) {
      console.log(error);
    }
  }

  async all(method: 'main page' | 'search' = 'search') {
    try {
      await this.setPlaylists(method);
      await this.setSongs(method);
      await this.setUsers(method);

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