import { makeObservable, observable, action, runInAction } from "mobx";

interface IBackendData {
  email: string | null;
  imageUrl: string | null;
}

class OAuthStore {
  whereUsing: 'Sign in' | 'Sign up';
  backendData: IBackendData;

  constructor() {
    this.whereUsing = 'Sign in';
    this.backendData = { email: null, imageUrl: null };

    makeObservable(this, {
      whereUsing: observable,
      backendData: observable,
      setWhereUsing: action,
      setOAuthData: action
    });
  }

  setOAuthData(data: IBackendData) {
    runInAction(() => {
      this.backendData = data;
    });
  }

  setWhereUsing(arg: 'Sign in' | 'Sign up') {
    runInAction(() => {
      this.whereUsing = arg;
    });
  }
}

export const OAuth = new OAuthStore();