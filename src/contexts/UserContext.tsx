import React, { useEffect, createContext, useContext, useState, useLayoutEffect } from "react";

import { api, API_URL } from "../api/axiosConfig";
import { UserDTO, UserProps } from "../types/props";
import { userEmailStore as emailStore } from "../stores/toChangeEmail";
import { userRegionStore as regionStore } from "../stores/toChangeRegion";
import { userAvatarStore as avatarStore } from "../stores/toChangeAvatar";
import { userUsernameStore as usernameStore } from "../stores/toChangeUsername";
import { userDescriptionStore as descriptionStore } from "../stores/toChangeDescription";
import { searchUsersStore as searchUsers } from "../stores/toSearchUsers";
import { observer } from "mobx-react-lite";
import { URLS } from "../constants/urls.const";
import { notificationsStore as notices } from "../stores/toNotifications";

const UserCreateContext = createContext<UserProps>({
  user: null,
  followers: null,
  subscribes: null,
});

export const UserContext = observer(({ children }: any) => {
  const[user, setUser] = useState<UserDTO | null>(null);
  const[followers, setFollowers] = useState<string | null>(null);
  const[subscribes, setSubscribes] = useState<string | null>(null);
  const url = new URLS();

  const getUser = async (): Promise<void> => {
    try {
      const response = await api.get(url.authenticated);
      setUser(response.data);
    }catch(error: any) {
      console.error(error);
    }
  }

  const getUserAvatar = async (): Promise<void> => {
    try {
      if(user) {
        await api.get(`/images/user/avatar/${user.username}`);
        avatarStore.setAvatar(`${API_URL}/images/user/avatar/${user.username}`);
        avatarStore.setAvatarURL(`${API_URL}/images/user/avatar/${user.username}`);
        searchUsers.setAvatar(`${API_URL}/images/user/avatar/${user.username}`);
        console.log(avatarStore.avatar);
      }
    }catch{
      avatarStore.setAvatar('/defaultAvatar.png');
      searchUsers.setAvatar('/defaultAvatar.png');
    }
  }

  const getSubscribes = async (): Promise<void> => {
    try {
      const response = await api.get(url.subscribes);
      setSubscribes(response.data.subscribes);
    }catch(error: any) {
      console.error(error);
    }
  };

  const getFollowers = async (): Promise<void> => {
    try {
      const response = await api.get(url.followers);
      setFollowers(response.data.followers);
    }catch(error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useLayoutEffect(() => {
    if(user) {
      getUserAvatar();
      getFollowers();
      getSubscribes();
      searchUsers.setUser(user);
      descriptionStore.setDescription(user.description);
      usernameStore.setUsername(user.username);
      regionStore.setRegion(user.region);
      emailStore.setEmail(user.email);
      notices.getInfo();
    }
  }, [user]);

  return (
    <UserCreateContext.Provider
      value={{
        user,
        followers,
        subscribes,
      }}
    >
      {children}
    </UserCreateContext.Provider>
  );
});

export const useUserContext: any = () => useContext(UserCreateContext);