import { observable, action, makeObservable } from "mobx";

class UserRegionState {
  userRegion: string | null;

  constructor(initialRegion: string | null) {
    this.userRegion = initialRegion;
    makeObservable(this, {
      userRegion: observable,
      setRegion: action
    });
  }

  setRegion(region: string | null) {
    this.userRegion = region;
  }
}

export const userRegionStore = new UserRegionState(null);