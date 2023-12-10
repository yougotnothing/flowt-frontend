export type IAvatar = any;
export type IAvatarURL = any;
export type IUsername = string | null;
export type IEmail = string | null;
export type IDescription = string | null;
export type IRegion = string | null;

export interface ISongData {
  songId: number;
  name: string | null;
  issueYear: string | null;
  genre: string | null;
  listens: number | null;
  likes: number | null;
  author: string | null;
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