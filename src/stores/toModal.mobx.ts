import { observable, makeObservable, action, runInAction } from "mobx";

class ModalStore {
  isOpen: boolean;
  changeAvatar: boolean;

  constructor() {
    this.isOpen = false;
    this.changeAvatar = false;

    makeObservable(this, {
      changeAvatar: observable,
      isOpen: observable,
      setIsOpen: action
    });
  }

  setChangeAvatar(arg: boolean) {
    runInAction(() => {
      this.changeAvatar = arg;
    });
  }

  setIsOpen(arg: boolean) {
    this.isOpen = arg;
  }
}

export const modalStore = new ModalStore();