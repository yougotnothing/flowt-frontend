import { observable, makeObservable, action, runInAction } from "mobx";

class ModalStore {
  isOpen: boolean;
  changeAvatar: boolean;
  links: boolean;

  constructor() {
    this.isOpen = false;
    this.changeAvatar = false;
    this.links = false;

    makeObservable(this, {
      changeAvatar: observable,
      links: observable,
      isOpen: observable,
      setIsOpen: action,
      setLinks: action
    });
  }

  setLinks(arg: boolean) {
    runInAction(() => {
      this.links = arg;
    })
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