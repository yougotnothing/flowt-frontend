import { makeObservable, observable, action, runInAction } from "mobx";
import { IPlaylist, IPlaylistProps, ISongPlaylist } from "../types/props";
import { api } from "../api/axiosConfig";

class PlaylistsStore {
  self: IPlaylist[];
  liked: IPlaylistProps[];
  songs: ISongPlaylist[];
  added: ISongPlaylist[];
  avatar: any;
  avatarURL: any;
  input: string;
  playlist: 'Create' | 'Browse';

  constructor() {
    this.self = [];
    this.songs = [];
    this.liked = [];
    this.added = [];
    this.avatar = null;
    this.avatarURL = null;
    this.input = '';
    this.playlist = 'Create';

    makeObservable(this, {
      self: observable,
      playlist: observable,
      added: observable,
      songs: observable,
      input: observable,
      liked: observable,
      avatar: observable,
      avatarURL: observable,
      setAvatar: action,
      setLiked: action,
      setSelf: action,
      search: action,
      setAvatarURL: action,
      setAdded: action,
      removeAdded: action,
      addSong: action,
      addSongs: action,
      removeSong: action,
      changePage: action,
      setInput: action
    });
  }

  changePage(page: 'Create' | 'Browse') {
    runInAction(() => {
      this.playlist = page;
    });
  }

  removeAdded(song: ISongPlaylist) {
    runInAction(() => {
      const isDuplicate = this.songs.some(existingSong => existingSong.songId === song.songId);

      if(!isDuplicate) {
        const filteredContainer = this.added.filter(existingSong => existingSong.songId !== song.songId);
        
        this.songs.push(song);
        
        this.added = filteredContainer;
        
        console.log("Added:", this.added);
        console.log("Songs:", this.songs);
      }
    });
  }

  setAdded(song: ISongPlaylist) {
    runInAction(() => {
      const isDuplicate = this.added.some(existingSong => existingSong.songId === song.songId);

      if(!isDuplicate) {
        const filteredContainer = this.songs.filter((existingSong) => existingSong.songId !== song.songId);

        this.added.push(song);

        this.songs = filteredContainer;
        
        console.log("Added:", this.added);
        console.log("Songs:", this.songs);
      }
    });
  }

  async search(param: string) {
    if(param === 'All') {
      try {
        const response = await api.post('/search/songs',{
          substring: this.input
        });
        runInAction(() => {
          this.songs = response.data.songs;
        });
      }catch(error: any) {
        console.error(error);
      }
    }
  }

  setInput(value: string) {
    runInAction(() => {
      this.input = value;
    });
  }

  setAvatar(avatar: any | Blob) {
    runInAction(() => {
      this.avatar = avatar;
      this.avatarURL = URL.createObjectURL(avatar);
    });
  }

  setLiked(playlist: IPlaylistProps) {
    runInAction(() => {
      this.liked.push(playlist);
    });
  }

  setAvatarURL(URL: any) {
    runInAction(() => {
      this.avatarURL = URL;
    });
  }

  async addSongs() {
    try {
      for(let index = 0; index<= this.added.length; index++) {
        await api.post(`/playlists/${this.input}/${this.added[index].author}/${this.added[index].name}`);
        console.log(`Song: ${this.added[index].name} added successfully`);
      }
    }catch(error: any) {
      console.error(error);
    }
  }

  async addSong(song: ISongPlaylist) {
    try {
      await api.post(`/playlists/${this.input}/${song.author}/${song.name}`);
      console.log(`Song: ${song.name}, added successfully`);
    }catch(error: any) {
      console.error(error);
    }
  }

  async getPlaylists() {
    try {
      const response = await api.get('/users/playlists');
      console.log(response.data);      
      this.setSelf(response.data.playlists);
    }catch(error: any) {
      console.error(error);
    }
  }
  
  async removeSong(song: ISongPlaylist) {
    try {
      await api.delete(`/playlists/${this.input}/${song.author}/${song.name}`);
      console.log(`Song: ${song.name}, removed successfully`);
    }catch(error: any) {
      console.error(error);
    }
  }

  setSelf(playlist: IPlaylist[]) {
    runInAction(() => {
      this.self = playlist;
    });
  }
}

export const playlistsStore = new PlaylistsStore();