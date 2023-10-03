import { observable, action, makeObservable } from "mobx";

class UserEmailStore {
  email: string | null;

  constructor() {
    this.email = null;

    makeObservable(this, {
      email: observable,
      setEmail: action
    });
  }
  setEmail = (email: string | null) => {
    this.email = email;
  }
}

export const userEmailStore = new UserEmailStore();