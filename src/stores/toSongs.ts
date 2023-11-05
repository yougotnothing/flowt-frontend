import { action, makeObservable, observable, runInAction } from "mobx";

import { ISongData, ISongParameters } from "../types/types";
import { API_URL } from "../api/axiosConfig";

class UserSongsStore implements ISongParameters {
  id: number | null;
  name: string | null;
  issueYear: string | null;
  genre: string | null;
  listens: number | null;
  avatar: string | null;
  url: any;
  container: ISongData[];

  constructor() {
    this.url = null;
    this.avatar = null;
    this.listens = null;
    this.id = null;
    this.name = null;
    this.issueYear = null;
    this.genre = null;
    this.container = [];

    makeObservable(this, {
      container: observable,
      listens: observable,
      id: observable,
      name: observable,
      issueYear: observable,
      genre: observable,
      url: observable,
      avatar: observable,
      setUrl: action,
      setAvatar: action,
      getInfo: action,
      setSong: action,
      setName: action,
    });
  }

  getInfo(data: ISongData[]) {
    this.container = data;
  }

  setUrl(URL: string) {
    this.url = encodeURI(URL);
  }

  setName(name: string | null) {
    this.name = name;
  }

  setAvatar(src: string) {
    runInAction(() => {
      this.avatar = encodeURI(src);
    });
  }

  setSearchSong(username: string, songName: string) {
    runInAction(() => {
      this.setUrl(`${API_URL}/songs/audio/${username}/${songName}`);
      this.setAvatar(`${API_URL}/images/song/${username}/${songName}`);
    });
  }

  setSong(index: number, username: string | null) {
    runInAction(() => {
      if(this.container && index >= 0 && index < this.container.length) {
        const songInfo = this.container[index];

        this.setUrl(encodeURI(`${API_URL}/songs/audio/${username}/${songInfo.name}`));
        this.setAvatar(encodeURI(`${API_URL}/images/song/${username}/${songInfo.name}`));

        this.issueYear = songInfo.issueYear;
        this.listens = songInfo.listens;
        this.genre = songInfo.genre;
        this.setName(songInfo.name);
        this.id = songInfo.songId;
      }
    });
  }
}
export const userSongsStore = new UserSongsStore();
