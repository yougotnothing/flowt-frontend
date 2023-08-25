import { makeAutoObservable, runInAction } from 'mobx';

class toVerify {
  isVerify = false;

  constructor() {
    makeAutoObservable(this);
  }

  alreadyVerify = () => {
    runInAction(() => {
      this.isVerify = true;
    });  
  }
}

export default new toVerify();