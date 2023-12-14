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

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/google/login&response_type=code&scope=email`;
export const FACEBOOK_AUTH_URL = `https://www.facebook.com/v18.0/dialog/oauth?response_type=token&client_id=${process.env.REACT_APP_FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/facebook/login&auth_type=rerequest&scope=email%2Cpublic_profile`;