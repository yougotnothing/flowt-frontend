import { action, makeObservable, observable, runInAction } from "mobx";

import { ISongData, ISongParameters } from "../types/types";
import { API_URL, api } from "../api/axiosConfig";

class UserSongsStore implements ISongParameters {
  id: number | null;
  name: string | null;
  issueYear: string | null;
  genre: string | null;
  listens: number | null;
  avatar: string | null;
  url: any;
  author: string | null;
  playlistId: number | null;
  playlistName: string | null;
  playlistIssueYear: string | null;
  playlistGenre: string | null;
  playlistListens: number | null;
  playlistAvatar: string | null;
  playlistUrl: any;
  container: ISongData[];
  randomByGenre: ISongData[];

  constructor() {
    this.author = null;
    this.url = null;
    this.avatar = null;
    this.listens = null;
    this.id = null;
    this.name = null;
    this.issueYear = null;
    this.genre = null;
    this.container = [];
    this.playlistAvatar = null;
    this.playlistId = null;
    this.playlistGenre = null;
    this.playlistListens = null;
    this.playlistIssueYear = null;
    this.playlistName = null;
    this.randomByGenre = [];

    makeObservable(this, {
      author: observable,
      container: observable,
      listens: observable,
      id: observable,
      name: observable,
      issueYear: observable,
      genre: observable,
      url: observable,
      avatar: observable,
      playlistAvatar: observable,
      playlistId: observable,
      playlistGenre: observable,
      playlistListens: observable,
      playlistIssueYear: observable,
      playlistName: observable,
      randomByGenre: observable,
      setUrl: action,
      setAvatar: action,
      getInfo: action,
      setSong: action,
      setName: action,
      patchSong: action
    });
  }

  getInfo(data: ISongData[]) {
    this.container = data;
  }

  pushInfo(data: ISongData) {
    this.container.push(data);
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

  async getSongs(username: string | null) {
    if(!username) return;

    try {
      const { data } = await api.get(`/songs/user-songs/${encodeURI(username)}`);

      runInAction(() => {
        const uniqueSongs: Set<ISongData> = new Set(
          data.songs.filter((existingSong: ISongData) => 
            !this.container.some((song: ISongData) => 
              song.songId === existingSong.songId
            )
          )
        );

        this.container.push(...Array.from(uniqueSongs));
      });
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  setSearchSong(username: string, songName: string) {
    runInAction(() => {
      this.setUrl(`${API_URL}/songs/audio/${username}/${songName}`);
      this.setAvatar(`${API_URL}/images/song/${username}/${songName}`);
    });
  }

  setAvatarAndUrl(username: string, songName: string) {
    runInAction(() => {
      this.playlistUrl = `${API_URL}/songs/audio/${username}/${songName}`;
      this.playlistAvatar = `${API_URL}/images/song/${username}/${songName}`;
    });
  }

  async setSong(index: number, songs: ISongData[] | null = null) {
    await runInAction(async () => {
      if(!songs && (this.container && index >= 0 && index < this.container.length)) {
        const songInfo = this.container[index];

        this.setUrl(`${API_URL}/songs/audio/${songInfo.author}/${songInfo.name}`);
        this.setAvatar(`${API_URL}/images/song/${songInfo.author}/${songInfo.name}`);

        this.issueYear = songInfo.issueYear;
        this.listens = songInfo.listens;
        this.genre = songInfo.genre;
        this.setName(songInfo.name);
        this.id = songInfo.songId;
        this.author = songInfo.author;
      }else if(songs && (songs && index >= 0 && index < songs.length)) {
        const songInfo = songs[index];

        this.setUrl(`${API_URL}/songs/audio/${songInfo.author}/${songInfo.name}`);
        this.setAvatar(`${API_URL}/images/song/${songInfo.author}/${songInfo.name}`);

        this.issueYear = songInfo.issueYear;
        this.listens = songInfo.listens;
        this.genre = songInfo.genre;
        this.setName(songInfo.name);
        this.id = songInfo.songId;
        this.author = songInfo.author;
      }
    });
  }

  setSongObject(arg: ISongData[], index: number) {
    const song = arg[index];
    
    runInAction(() => {
      this.setUrl(`${API_URL}/songs/audio/${song.author}/${song.name}`);
      this.setAvatar(`${API_URL}/images/song/${song.author}/${song.name}`);
      this.issueYear = song.issueYear;
      this.listens = song.listens;
      this.genre = song.genre;
      this.setName(song.name);
      this.id = song.songId;
      this.author = song.author;
    });
  }

  async patchSong(songData: ISongData) {
    try {
      await api.patch(`/songs/statistic/${songData.author}/${songData.name}`);
      console.log('success');
    }catch(error: any) {
      console.error(error);
    }
  }

  async getRandomByGenre(genre: string | null) {
    if(!genre) return;

    try {
      const response = await api.get(`/songs/random/${encodeURI(genre)}`);

      console.log(response.data);

      runInAction(() => {
        if(Array.isArray(response.data)) {
          const uniqueSongs: Set<ISongData> = new Set(
              response.data.filter((existingSong: ISongData) =>
                !this.randomByGenre.some((song: ISongData) =>
                  song.songId === existingSong.songId
              )
            )
          );
          
          this.randomByGenre.push(...Array.from(uniqueSongs));
        }

        this.randomByGenre.push(response.data);
      });
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}
export const userSongsStore = new UserSongsStore();