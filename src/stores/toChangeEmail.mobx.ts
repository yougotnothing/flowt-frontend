import { observable, action, makeObservable, runInAction } from "mobx";
import { IEmail } from "../types/types";

class UserEmailStore {
  email: IEmail;

  constructor(initialValue: IEmail) {
    this.email = initialValue;

    makeObservable(this, {
      email: observable,
      setEmail: action
    });
  }

  setEmail = (email: IEmail) => {
    runInAction(() => {
      if(email) this.email = email.trim();
    });
  }
}

export const userEmailStore = new UserEmailStore(null);