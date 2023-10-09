import { observable, action, makeObservable, runInAction } from "mobx";
import { IRegion } from "../types/types";

class UserRegionState {
  region: IRegion;

  constructor(initialValue: IRegion) {
    this.region = initialValue;

    makeObservable(this, {
      region: observable,
      setRegion: action
    });
  }

  setRegion(region: string | null) {
    runInAction(() => {
      this.region = region;
    });
  }
}

export const userRegionStore = new UserRegionState(null);