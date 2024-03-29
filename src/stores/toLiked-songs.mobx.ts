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
      await this.setSongs();

      console.log('song liked');
    }catch(error: any) {
      console.error(error);
    }
  }

  async setSongs() {
    try {
      const response = await api.get('/users/liked');

      runInAction(() => {
        this.songs = response.data.songs;
      });
      console.log('liked songs', response.data);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async dislikeSong(song: ISongData | null, obj?: { author: string | null, name: string | null }) {
    try {
      const author = song ? song.author : obj?.author;
      const name = song ? song.name : obj?.name;
      await api.delete(`/liked/${song ? song.author : obj?.author}/${song ? song.name : obj?.name}`);
      await this.setSongs();

      console.log('song disliked');
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async dislike(song: ISongData | { author: string, name: string }) {
    try {
      await api.delete(`/liked/${song.author}/${song.name}`);
      await this.setSongs();

      console.log('song disliked');
    }catch(error: any) {
      console.error('error while diliking song: ', error);
      return;
    }
  }

  async like(song: ISongData | { author: string, name: string }) {
    try {
      await api.post(`/liked/${song.author}/${song.name}`);
      await this.setSongs();

      console.log('song liked');
    }catch(error: any) {
      console.error(error);
    }
  }

  async deleteSong(song: ISongData | null, index: number) {
    try {
      await api.delete(`/songs/${song?.name}`);

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