import { action, makeObservable, observable, runInAction } from "mobx";
import { ISongData } from "../types/types";
import genresData from '../json/genres.json';
import { api } from "../api/axiosConfig";

class RandomSongByGenreStore {
  genre: string;
  songs: ISongData[];
  song: ISongData | null;

  constructor() {
    this.genre = genresData[Math.floor(Math.random() * genresData.length)];
    this.songs = [];
    this.song = null;

    makeObservable(this, {
      songs: observable,
      song: observable,
      genre: observable,
      setGenre: action,
      getRandomSongs: action,
      getRandomSong: action
    });
  }

  async getRandomSong() {
    try {
      const response = await api.get(`/songs/random/${genresData[Math.floor(Math.random() * genresData.length)].replace(' ', '_').toUpperCase()}`);

      console.log(response.data);
      
      if(!response.data) {
        await this.getRandomSongs();
      }
      
      runInAction(() => {
        this.song = response.data;
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  setGenre() {
    runInAction(() => {
      this.genre = genresData[Math.floor(Math.random() * genresData.length)]
                   .replace(' ', '_').toUpperCase();
    });
  }

  async getRandomSongs() {
    try {
      const response = await api.get(`/songs/random/${genresData[Math.floor(Math.random() * genresData.length)].replace(' ', '_').toUpperCase()}`);

      console.log(response.data);
      
      if(!response.data) {
        await this.getRandomSongs();
      }

      const uniqueList: Set<ISongData> = new Set(
        [response.data].filter((song: ISongData) => 
          this.songs.some((existingSong: ISongData) => 
            song.songId === existingSong.songId
          )
        )
      );
      
      this.songs.push(...Array.from(uniqueList));
    } catch (error: any) {
      console.error(error);
    }
  }
}

export const randomSongByGenre = new RandomSongByGenreStore();