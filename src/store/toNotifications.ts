import { observable, action, makeObservable } from "mobx";
import { INotice } from "../types/props";
import { api } from "../api/axiosConfig";

class NotificationsStore {
  container: INotice[];

  constructor() {
    this.container = [];

    makeObservable(this, {
      container: observable,
      getInfo: action
    });
  }

  async getInfo() {
    try {
      const response = await api.get('/users/notifications');
      const data = response.data.notifications;
      console.log(data);
      this.container = data;
    }catch(error: any) {
      console.error(error);
    }
  }
}

export const notificationsStore = new NotificationsStore();