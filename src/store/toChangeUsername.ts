import { observable, makeObservable, action } from "mobx";

class UserUsernameStore {
  Username: string | null;

  constructor(initialUsername: string | null) {
    this.Username = initialUsername;
    makeObservable(this, {
      Username: observable,
      setUsername: action
    });

  }
  setUsername(newUsername: string | null) {
    this.Username = newUsername;
  }
}

export const userUsernameStore = new UserUsernameStore(null);