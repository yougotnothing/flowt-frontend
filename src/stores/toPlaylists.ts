import { makeObservable, observable, action, runInAction } from "mobx";
import { IPlaylistProps, ISongsSearch } from "../types/props";
import { api } from "../api/axiosConfig";

class PlaylistsStore {
  self: IPlaylistProps[];
  liked: IPlaylistProps[];
  songs: ISongsSearch[];
  avatar: any;
  input: string;

  constructor() {
    this.self = [];
    this.songs = [];
    this.liked = [];
    this.avatar = '/plus.png';
    this.input = '';

    makeObservable(this, {
      self: observable,
      songs: observable,
      input: observable,
      liked: observable,
      avatar: observable,
      setAvatar: action,
      setLiked: action,
      setSelf: action,
      search: action
    });
  }

  async search(param: string) {
    if(param === 'All') {
      try {
        const response = await api.post('/search/songs',{
          substring: this.input
        });
        this.songs = response.data.songs;
      }catch(error: any) {
        console.error(error);
      }
    }
  }

  setAvatar(avatar: any) {
    runInAction(() => {
      this.avatar = avatar;
    });
  }

  setLiked(playlist: IPlaylistProps) {
    runInAction(() => {
      this.liked.push(playlist);
    });
  }

  setSelf(playlist: IPlaylistProps) {
    runInAction(() => {
      this.self.push(playlist);
    });
  }
}

export const playlistsStore = new PlaylistsStore();