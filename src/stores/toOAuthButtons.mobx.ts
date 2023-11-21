import { makeObservable, observable, action, runInAction } from "mobx";

class OAuthStore {
  whereUsing: 'Sign in' | 'Sign up';
  backendData: { email: string, imageUrl: string } | null;

  constructor() {
    this.whereUsing = 'Sign in';
    this.backendData = null;

    makeObservable(this, {
      whereUsing: observable,
      backendData: observable,
      setWhereUsing: action,
      setOAuthData: action
    });
  }

  setOAuthData(data: { email: string, imageUrl: string }) {
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