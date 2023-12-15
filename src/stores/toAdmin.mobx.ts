import { makeObservable, observable, action, runInAction } from "mobx";
import { IUserSearch } from "../types/props";
import { api } from "../api/axiosConfig";

class AdminStore {
  input: string;
  user: IUserSearch | null;
  users: IUserSearch[] | null;
  message: string;

  constructor() {
    this.input = '';
    this.user = null;
    this.users = null;
    this.message = '';

    makeObservable(this, {
      input: observable,
      user: observable,
      users: observable,
      message: observable,
      setMessage: action,
      getUsers: action,
      setInput: action,
      setUser: action,
      setUsers: action
    });
  }

  setMessage(value: string) {
    runInAction(() => {
      this.message = value;
    });
  }

  setUsers(value: IUserSearch[] | null) {
    runInAction(() => {
      this.users = value;
    });
  }

  setUser(user: IUserSearch) {
    runInAction(() => {
      this.user = user;
    });
  }

  setInput(value: string) {
    runInAction(() => {
      this.input = value.trim();
    });
  }

  async getUsers() {
    try {
      const response = await api.post('/search/users', {
        substring: this.input
      });

      if(response.data.users.length === 0) {
        this.setMessage(`Cannot find data by ${this.input}`);
      }else{
        this.setMessage('');
      }

      runInAction(() => {
        this.users = response.data.users;
      });

      console.log(this.users);
    }catch(error: any) {
      console.log(error);
    }
  }
}

export const adminStore = new AdminStore();