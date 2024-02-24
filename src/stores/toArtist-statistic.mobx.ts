import { action, makeObservable, observable, runInAction } from "mobx";
import { api } from "../api/axiosConfig";
import { IOverallStatistic } from "../types/props";
import { Dispatch, SetStateAction } from "react";

type SetState<T> = Dispatch<SetStateAction<T>>;

class ArtistStatisticStore {
  stats: any;
  overall: IOverallStatistic | null;
  popular: any;

  constructor() {
    this.stats = '';
    this.overall = null;
    this.popular = '';

    makeObservable(this, {
      overall: observable,
      popular: observable,
      stats: observable,
      getOverall: action.bound,
      getPopular: action.bound
    });
  }

  async getOverall(set: SetState<string>) {
    try {
      const { data } = await api.get('/artist-statistic/overall');

      runInAction(() => {
        this.overall = data;
      });
      console.log(this.overall);
    }catch(error: any) {
      console.error(error);
      set('You are not verifyed artist.');
      return;
    }
  }

  async getPopular() {
    try {
      const response = await api.get('/artist-statistic/popular');
      console.log(response.data);
      console.log('popular statistic');
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const artistStatistic = new ArtistStatisticStore();