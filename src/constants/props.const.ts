type setStateAction<T> = (value: any) => void;

export interface ProviderProps {
  song: string | null;

  followers?: string | null;
  subscribes?: string | null;

  songURL?: string | null;
  songName?: string | null;
  songInfo?: string | null;

  setSongInfo?: setStateAction<string | null>;
  setSongURL?: setStateAction<string | null>;
  setSongName?: setStateAction<string | null>;
}
