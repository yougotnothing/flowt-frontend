import { observable, makeObservable, action, runInAction } from "mobx";
import { IUsername } from "../types/types";

class UserUsernameStore {
  username: IUsername;

  constructor(initialValue: IUsername) {
    this.username = initialValue;

    makeObservable(this, {
      username: observable,
      setUsername: action
    });
  }
  setUsername(newUsername: string | null) {
    runInAction(() => {
      this.username = newUsername;
    });
  }
}

export const userUsernameStore = new UserUsernameStore(null);
