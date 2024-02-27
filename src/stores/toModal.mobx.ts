import { observable, makeObservable, action, runInAction } from "mobx";

enum _ {
  'change password',
  'restore password',
  'change avatar',
  'links',
  'delete song'
}

type Modal = 'change password'
           | 'restore password'
           | 'change avatar'
           | 'links'
           | 'delete song'

class ModalStore {
  isOpen: boolean;
  changeAvatar: boolean;
  links: boolean;
  changePassword: boolean;
  restorePassword: boolean;
  restore_email: string;
  deleteSong: boolean;
  deleteSong_name: string;

  constructor() {
    this.isOpen = false;
    this.changeAvatar = false;
    this.links = false;
    this.changePassword = false;
    this.restorePassword = false;
    this.deleteSong = false;
    this.restore_email = '';
    this.deleteSong_name = '';

    makeObservable(this, {
      changeAvatar: observable,
      changePassword: observable,
      restorePassword: observable,
      restore_email: observable,
      deleteSong: observable,
      deleteSong_name: observable,
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

  setIsOpen(arg: boolean, modal?: Modal) {
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
      case "delete song":
        this.deleteSong = arg;
        break;
      default:
        this.isOpen = arg;
        break;
    }
  }

  setDeleteSong_name(name: string) {
    runInAction(() => this.deleteSong_name = name);
  }

  setRestoreEmail(email: string) {
    runInAction(() => this.restore_email = email);
  }
}

export const modalStore = new ModalStore();