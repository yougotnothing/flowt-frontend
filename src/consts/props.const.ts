type setStateAction<T> = (value: any) => void;

export interface UserDTO {
  username?: string | null;
  region: string | null;
  email?: string | null;
  description?: string | null;
}

export interface ProviderProps {
  user: UserDTO | null;

  userRegionStore?: any | null;
  userUsernameStore?: any | null;

  followers?: string | null;
  subscribes?: string | null;

  songURL?: string | null;
  songName?: string | null;
  songInfo?: string | null;
  userAvatar?: string | null;

  setUserAvatar?: setStateAction<string | null>;
  setSongInfo?: setStateAction<string | null>;
  setSongURL?: setStateAction<string | null>;
  setSongName?: setStateAction<string | null>;
  setUser?: setStateAction<string | null>;
  setFollowers?: setStateAction<string | null>;
  setSubscribes?: setStateAction<string | null>;
}

export interface UserRegionProps {
  userRegion: string | null;
  setUserRegion: setStateAction<string | null>;
}