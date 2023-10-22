import { API_URL } from "../api/axiosConfig";
import { IUrlProps } from "../types/props";

export const USER_AVATAR_URL = (n: string | null) => `/images/user/avatar/${n}`;
export const SUBSCRIBES_URL = '/users/subscribes';
export const FOLLOWERS_URL = '/users/followers';
export const SONG_URL = '/users/songs';
export const SONG_AUDIO_URL = (s: string | null, u: string | null) => `${API_URL}/songs/audio/${u}/${s}`;
export const SONG_AVATAR_URL = (s: string | null, u: string | null) => `${API_URL}/images/song/${u}/${s}`;
export const DESCRIPTION_URL = '/users/description';
export const EMAIL_URL = '/users/email';
export const CHANGE_PASSWORD_URL = '/users/change-password';
export const REGION_URL = '/users/region';
export const USERNAME_URL = '/users/username';
export const PUT_EMAIL_URL = '/verify/restore-password';
export const RESTORE_PASSWORD_URL = '/users/restore-password';
export const NOTIFICATIONS_URL = '/users/notifications';
export const VERIFY_STATUS_URL = (v: string | null) => `/verify/email?code=${v}`;

export class URLS implements IUrlProps {
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
  constructor() {
    this.authenticated = '/users/authenticated';
    this.subscribes = '/users/subscribes';
    this.followers = '/users/followers';
    this.songs = '/users/songs';
    this.description = '/users/description';
    this.email = '/users/email';
    this.change_password = '/users/change-password';
    this.region = '/users/region';
    this.username = '/users/username';
    this.put_email = '/verify/restore-password';
    this.restore_pass = '/users/restore-password';
    this.notifications = '/users/notifications';
    this.user_avatar = '/users/avatar';
  }
}