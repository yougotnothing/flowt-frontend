import { makeObservable, action, observable, runInAction } from "mobx";
import { IDescription } from "../types/types";
class UserDescriptionStore {
  description: IDescription;

  constructor(initialValue: IDescription) {
    this.description = initialValue;

    makeObservable(this, {
      description: observable,
      setDescription: action
    });
  }

  setDescription(description: string | null) {
    runInAction(() => {
      this.description = description;
    });
  }
}

export const userDescriptionStore = new UserDescriptionStore(null);