import { observable, makeObservable, action, runInAction } from "mobx";

class ModalStore {
  isOpen: boolean;
  changeAvatar: boolean;
  links: boolean;
  changePassword: boolean;
  restorePassword: boolean;
  restore_email: string;

  constructor() {
    this.isOpen = false;
    this.changeAvatar = false;
    this.links = false;
    this.changePassword = false;
    this.restorePassword = false;
    this.restore_email = '';

    makeObservable(this, {
      changeAvatar: observable,
      changePassword: observable,
      restorePassword: observable,
      restore_email: observable,
      links: observable,
      isOpen: observable,
      setIsOpen: action,
      setChangeAvatar: action,
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

  setIsOpen(arg: boolean, modal?: 'change avatar' | 'links' | 'change password' | 'restore password') {
    switch(modal) {
      case "change avatar":
        this.changeAvatar = arg;
        break;
      case "change password": 
        this.changePassword = arg;
        break;
      case "links":
        this.links = arg;
        break;
      case "restore password":
        this.restorePassword = arg;
        break;
      default:
        this.isOpen = arg;
        break;
    }
  }

  setRestoreEmail(email: string) {
    runInAction(() => this.restore_email = email);
  }
}

export const modalStore = new ModalStore();