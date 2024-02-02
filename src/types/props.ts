import { ISongData } from "./types";

export interface UserDTO {
  username: string | null;
  region: string | null;
  description: string | null;
  avatar: string | null;
  email: string | null;
  userHaveAvatar: boolean | null;
  emailVerifyed: boolean | null;
  followers: string[] | null;
  subscribes: any[] | null;
}

export interface IUserProps {
  username: string | null;
  region: string | null;
  description: string | null;
  email: string | null;
  userHaveAvatar: boolean | null;
  avatar: string | null;
  emailVerifyed: boolean | null;
}

export interface UserProps {
  user: UserDTO | null;
  followers: IUserProps[] | null;
  subscribes: IUserProps[] | null;
}

export interface IUrlProps {
  authenticated: string;
  subscribes: string;
  followers: string;
  songs: string;
  description: string;
  email: string;
  change_password: string;
  region: string;
  username: string;
  put_email: string;
  restore_pass: string;
  notifications: string;
  user_avatar: string;
}

export interface INotificationsProps {
  createdAt: string | null;
  id: number | null;
  message: string | null;
  type: string | null;
  isOpen: boolean;
}

export type INotice = INotificationsProps;

export interface IUserSearch {
  username: string;
  email: string;
  region: string;
  description: string;
  userHaveAvatar: boolean;
  avatar: string;
}

export interface IUserSearchAsAdmin {
  username: string;
  email: string;
  region: string;
  description: string;
  avatar: string;
  userHaveAvatar: boolean;
  roles: string[];
}

export interface ISongsSearch {
  author: string,
  genre: string,
  issueYear: string,
  listens: number,
  name: string,
  songId: number
}

export interface ISongPlaylist {
  author: string,
  genre: string,
  issueYear: string,
  listens: number,
  name: string,
  songId: number,
  likes: number
}

export interface IPlaylist {
  name: string;
  author: string;
  username: string;
  playlistId: number;
  isPrivate: boolean;
  saveCount: number;
  songs: ISongData[];
}

export interface IPlaylistProps {
  playlist: IPlaylist[];
}

export interface IAdminUsers {
  isModerator: boolean;
  username: string;
  region: string;
  description: string;
  avatar: string;
  email: string;
  userHaveAvatar: boolean;
  emailVerifyed: boolean;
}

export interface IReportDTO {
  checked: boolean;
  checkedAt: string | null;
  contentType: 'NAME' | 'AVATAR' | 'PROFILE_HEADER' | 'DESCRIPTION' | 'CONTENT';
  contentTypeName: string;
  createdAt: string;
  id: number;
  whomType: 'USER' | 'SONG' | 'PLAYLIST';
}

export interface ISearchPlaylist {
  id: number;
  username: string;
  name: string;
  songCount: number;
}

export interface IPersonalData {
  name: string;
  surname: string;
  birthDate: string;
  sex: string;
  country: string;
  passportNumber: string;
}

export interface IVerifyRequest {
  personalDataDto: IPersonalData;
  links: Array<{ url: string }>;
  username: string;
}

export interface IOverallStatistic {
  eachCountryListeningCount: {},
  eachRegionLinsteningCount: {},
  listeners: number,
  listens: number,
  songCount: number
}