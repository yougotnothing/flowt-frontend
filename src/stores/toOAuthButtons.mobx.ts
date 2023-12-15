import { makeObservable, observable, action, runInAction } from "mobx";

interface IBackendData {
  email: string | null;
  imageUrl: string | null;
}

class OAuthStore {
  whereUsing: 'Sign in' | 'Sign up';
  imageUrl: string | null;
  email: string | null;

  constructor() {
    this.whereUsing = 'Sign in';
    this.imageUrl = null;
    this.email = null;

    makeObservable(this, {
      whereUsing: observable,
      imageUrl: observable,
      email: observable,
      setWhereUsing: action,
      setOAuthData: action
    });
  }

  setOAuthData(data: IBackendData) {
    runInAction(() => {
      if(data) {
        this.email = data.email;
        this.imageUrl = data.imageUrl;
      }
    });
  }

  setWhereUsing(arg: 'Sign in' | 'Sign up') {
    runInAction(() => {
      this.whereUsing = arg;
    });
  }
}

export const OAuth = new OAuthStore();