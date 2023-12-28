import { makeObservable, observable, action, runInAction } from "mobx";
import { IPlaylist, IPlaylistProps, ISongPlaylist } from "../types/props";
import { api } from "../api/axiosConfig";
import { ISongData } from "../types/types";

class PlaylistsStore {
  self: IPlaylist[];
  liked: IPlaylistProps[];
  playlists: IPlaylistProps[];
  songs: ISongData[];
  added: ISongData[];
  avatar: any;
  avatarURL: any;
  input: string;
  name: string;
  playlist: 'Create' | 'Browse';
  isHaveAvatar: boolean;
  songData: ISongPlaylist | null;
  message: string;
  container: IPlaylist | null;

  constructor() {
    this.playlists = [];
    this.self = [];
    this.songs = [];
    this.liked = [];
    this.added = [];
    this.avatar = null;
    this.avatarURL = null;
    this.name = '';
    this.input = '';
    this.playlist = 'Create';
    this.isHaveAvatar = false;
    this.songData = null;
    this.message = '';
    this.container = null;

    makeObservable(this, {
      playlists: observable,
      container: observable,
      self: observable,
      name: observable,
      playlist: observable,
      added: observable,
      songs: observable,
      input: observable,
      liked: observable,
      avatar: observable,
      avatarURL: observable,
      isHaveAvatar: observable,
      songData: observable,
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
      setInput: action,
      setName: action,
      setSongData: action,
      setMessage: action,
      setContainer: action,
      getPlaylists: action,
    });
  }

  async deletePlaylist(name: string | null) {
    try {
      await api.delete(`/playlists/${name}`);
      console.log(`playlist: ${name} successfully delete.`);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  setContainer(data: IPlaylist) {
    runInAction(() => {
      this.container = data;
    });
  }

  setMessage(message: string) {
    this.message = message;
  }

  setSongData(data: ISongPlaylist) {
    this.songData = data;
  }

  setName(name: string) {
    this.name = name;
  }

  changePage(page: 'Create' | 'Browse') {
    runInAction(() => {
      this.playlist = page;
    });
  }

  removeAdded(song: ISongData) {
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

  setAdded(song: ISongData) {
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
        const response = await api.get('/search/songs',{
          params: {
            substring: this.input
          }
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
      this.name = value;
    });
  }

  setAvatar(avatar: any | Blob) {
    runInAction(() => {
      this.avatar = avatar;
      this.avatarURL = URL.createObjectURL(avatar);
      this.isHaveAvatar = true;
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

  async addSongs(name: string) {
    try {
      await api.post(`/playlists/${name}`, {
        songs: this.added
      });
      console.log('songs added');
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async addSong(name: string) {
    try {
      await api.post(encodeURI(`/playlists/${name}/${this.songData?.author}/${this.songData?.name}`));
      this.setMessage(`Song: ${this.songData?.name}, added successfully`);
      console.log(`Song: ${this.songData?.name}, added successfully`);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async getPlaylists() {
    try {
      const response = await api.get('/users/playlists');
      console.log(response.data);      
      this.setSelf(response.data.playlists);
      console.log(this.self);     
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
  
  async removeSong(song: ISongData) {
    try {
      await api.delete(`/playlists/${this.input}/${song.author}/${song.name}`);
      console.log(`Song: ${song.name}, removed successfully`);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  setSelf(playlist: IPlaylist[]) {
    runInAction(() => {
      this.self = playlist;
    });
  }
}

export const playlistsStore = new PlaylistsStore();