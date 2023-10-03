import { observable, action, makeObservable } from "mobx";

class UserRegionState {
  region: string | null;

  constructor(initialRegion: string | null) {
    this.region = initialRegion;
    makeObservable(this, {
      region: observable,
      setRegion: action
    });
  }

  setRegion(region: string | null) {
    this.region = region;
  }
}

export const userRegionStore = new UserRegionState(null);