
export interface UserDTO {
  username: string | null;
  region: string | null;
  description: string | null;
  email: string | null;
  followers: string[] | null;
  subscribes: string[] | null;
}

export interface UserProps {
  user: UserDTO | null;
  followers: string | null;
  subscribes: string | null;
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
  username: string,
  email: string,
  region: string,
  description: string
}

export interface ISongsSearch {
  author: string,
  genre: string,
  issueYear: string,
  listens: number,
  name: string,
  songId: number
}