type setStateAction<T> = (value: any) => void;

export interface UserDTO {
  username: string | null;
  region: string | null;
  description?: string | null;
  email: string | null;
}

export interface UserProps {
  user: UserDTO | null;
  followers: string | null;
  subscribes: string | null;
  userAvatar: string | null;
  setUserAvatar: setStateAction<string | null>;
}