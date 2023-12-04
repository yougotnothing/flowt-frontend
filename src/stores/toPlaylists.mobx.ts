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
  name: string;
  playlist: 'Create' | 'Browse';
  isHaveAvatar: boolean;
  songData: ISongPlaylist | null;

  constructor() {
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

    makeObservable(this, {
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
      setSongData: action
    });
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
    }
  }

  async addSong(name: string) {
    try {
      await api.post(encodeURI(`/playlists/${name}/${this.songData?.author}/${this.songData?.name}`));
      console.log(`Song: ${this.songData?.name}, added successfully`);
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