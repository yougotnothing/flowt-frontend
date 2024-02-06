import { action, makeObservable, observable, runInAction } from "mobx";
import { api } from "../api/axiosConfig";
import { ISongData } from "../types/types";

class RecommendationsStore {
  list: ISongData[];
  mustLikeList: ISongData[];

  constructor() {
    this.list = [];
    this.mustLikeList = [];

    makeObservable(this, {
      list: observable,
      mustLikeList: observable,
      getMustLikeList: action.bound,
      getRecommendationList: action.bound
    });
  }

  async getMustLikeList() {
    try {
      const { data } = await api.get('/recommendations/might-like');

      const uniqueList: ISongData[] = data.filter(
        (song: ISongData, index: number, array: any[]) => 
          !array.slice(0, index)
            .some((prevSong: ISongData) => 
            prevSong.songId === song.songId
        )
      );

      runInAction(() => {
        this.list = Array.from(uniqueList);
      });
    }catch(error: any) {
      console.error(error.response);
      return;
    }
  }

  async getRecommendationList() {
    try {
      const { data } = await api.get('/recommendations');

      const uniqueList: ISongData[] = data.filter(
        (song: ISongData, index: number, array: any[]) => 
          !array.slice(0, index)
            .some((prevSong: ISongData) => 
            prevSong.songId === song.songId
        )
      );

      runInAction(() => {
        this.list = Array.from(uniqueList);
      });
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const recommendations = new RecommendationsStore();