import { observable, makeObservable, action } from "mobx";

class ModalStore {
  isOpen: boolean;

  constructor() {
    this.isOpen = false;
    
    makeObservable(this, {
      isOpen: observable,
      setIsOpen: action
    });
  }

  setIsOpen(arg: boolean) {
    this.isOpen = arg;
  }
}

export const modalStore = new ModalStore();