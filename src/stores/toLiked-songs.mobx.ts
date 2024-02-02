import { observable, action, runInAction, makeObservable } from "mobx";
import { ISongData } from "../types/types";
import { api } from "../api/axiosConfig";

class LikedSongsStore {
  songs: ISongData[];

  constructor() {
    this.songs = [];

    makeObservable(this, {
      songs: observable,
      deleteSong: action,
      setSongs: action,
      likeSong: action
    });
  }

  async likeSong(song: ISongData | null, obj?: { author: string | null, name: string | null }) {
    try {
      await api.post(`/liked/${song ? song.author : obj?.author}/${song ? song.name : obj?.name}`);

      runInAction(() => {
        if(song) {
          this.songs.push(song);
        }
      });
      console.log('song liked');
    }catch(error: any) {
      console.error(error);
    }
  }

  async setSongs() {
    try {
      const response = await api.get('/users/liked');

      runInAction(() => {
        this.songs = [...response.data.songs];
      });
      console.log(response.data.songs);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async deleteSong(song: ISongData, index: number) {
    try {
      await api.delete(`/songs/${song.name}`);

      runInAction(() => {
        this.songs.splice(index, 1);
      });
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const likedSongs = new LikedSongsStore();