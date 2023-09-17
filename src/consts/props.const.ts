export interface ProviderProps {
  user?: string;
  followers?: string;
  subscribes?: string;
  songURL?: string;
  songName?: string;
  userAvatar?: string;
  setUserAvatar?: (url: string) => void;
  setSongURL?: (url: string) => void;
  setSongName?: (name: string) => void;
  setUser?: (user: string) => void;
  setFollowers?: (followers: string) => void;
  setSubscribes?: (subscribes: string) => void;
}