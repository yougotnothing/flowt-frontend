import { IUrlProps } from "../types/props";

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