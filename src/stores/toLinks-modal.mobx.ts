import { makeObservable, observable } from "mobx";

class LinksStore {
  github: string;
  soundcloud: string;
  youtube: string;

  constructor() {
    this.github = 'https://github.com/';
    this.soundcloud = 'https://soundcloud.com/';
    this.youtube = 'https://youtube.com/';

    makeObservable(this, {
      github: observable,
      soundcloud: observable,
      youtube: observable
    });
  }

  addLink(type: 'github' | 'youtube' | 'soundcloud', value: string) {
    switch(type) {
      case "github":
        const gh_nick = value.replace('https://github.com/', '');
        this.github = `https://github.com/${gh_nick}`;
        break;
      case "youtube":
        const yt_nick = value.replace('https://youtube.com/', '');
        this.youtube = `https://youtube.com/${yt_nick[0] === '@' ? yt_nick : `@${yt_nick}`}`;
        break;
      case "soundcloud":
        const sc_nick = value.replace('https://soundcound.com/', '');
        this.soundcloud = `https://soundcloud.com/${sc_nick}`;
        break;
    }
  }
}

export const linksStore = new LinksStore();