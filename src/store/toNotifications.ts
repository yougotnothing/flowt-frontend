import { observable, action, makeObservable } from "mobx";
import { INotice } from "../types/props";
import { api } from "../api/axiosConfig";

class NotificationsStore {
  container: INotice[];
  readen: INotice[];

  constructor() {
    this.container = [];
    this.readen = [];

    makeObservable(this, {
      container: observable,
      readen: observable,
      addReaden: action,
      getInfo: action,
      setContainer: action
    });
  }

  addReaden(item: INotice) {
    this.readen.push(item);
  }

  setContainer(data: INotice[]) {
    this.container = data;
  }

  async getInfo() {
    try {
      const response = await api.get('/users/notifications');
      const data = response.data.notifications;
      console.log(data);
      this.setContainer(data);
    }catch(error: any) {
      console.error(error);
    }
  }
}

export const notificationsStore = new NotificationsStore();