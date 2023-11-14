import { makeObservable, action, observable, runInAction } from "mobx";
import { api } from "../api/axiosConfig";
import { IUserSearch } from "../types/props";
class SubscribesStore {
  container: IUserSearch[];

  constructor() {
    this.container = [];

    makeObservable(this, {
      container: observable,
      getData: action
    });
  }

  async getData(subscribes: any[] | null) {
    try {
      if(subscribes) {
        for(let index = 0; index < subscribes.length; index++) {
          const user = subscribes[index];
          const arr: any[] = [];
          
          const response = await api.post('/search/users',{
            substring: user
          });
          arr.push(response.data.users);
          
          runInAction(() => {
            this.container = [...arr[0]];
            console.log(arr);
          });
        }
      }
      }catch(error: any) {
      console.error(error);
    }
  }
}

export const subscribesStore = new SubscribesStore();