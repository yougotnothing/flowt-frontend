export type IAvatar = any;
export type IAvatarURL = any;
export type IUsername = string | null;
export type IEmail = string | null;
export type IDescription = string | null;
export type IRegion = string | null;

export interface ISongData {
  author: string;
  genre: string;
  issueYear: string;
  likes: number;
  listens: number;
  name: string;
  songId: number;
}

export interface ISongParameters {
  id: number | null;
  name: string | null;
  issueYear: string | null;
  genre: string | null;
  listens: number | null;
  avatar: string | null;
  url: string | undefined;
  container: ISongData[];
}