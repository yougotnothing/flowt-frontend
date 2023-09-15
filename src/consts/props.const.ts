export interface SongUrlProps {
  songURL?: string;
  songName?: string;
  userAvatar?: string;
  setUserAvatar?: (url: string) => void;
  setSongURL?: (url: string) => void;
  setSongName?: (name: string) => void;
}