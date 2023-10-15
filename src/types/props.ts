
export interface UserDTO {
  username: string | null;
  region: string | null;
  description: string | null;
  email: string | null;
  followers: string[];
  subscribes: string[];
}

export interface UserProps {
  user: UserDTO | null;
  followers: string | null;
  subscribes: string | null;
}

export interface NoticeProps {
  title: string;
  message: string;
}

export type INotice = NoticeProps;