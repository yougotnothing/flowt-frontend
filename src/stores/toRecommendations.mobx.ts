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
      const response = await api.get('/recommendations/might-like');
      console.log(response.data);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async getRecommendationList() {
    try {
      const { data } = await api.get('/recommendations');

      runInAction(() => {
        this.list = data;
      });

      console.log(data);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const recommendations = new RecommendationsStore();