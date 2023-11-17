import React, { useEffect, createContext, useContext, useState, useLayoutEffect } from "react";

import { api, API_URL } from "../api/axiosConfig";
import { IUserProps, UserDTO, UserProps } from "../types/props";
import { userEmailStore as emailStore } from "../stores/toChangeEmail.mobx";
import { userRegionStore as regionStore } from "../stores/toChangeRegion.mobx";
import { userAvatarStore as avatarStore } from "../stores/toChangeAvatar.mobx";
import { userUsernameStore as usernameStore } from "../stores/toChangeUsername.mobx";
import { userDescriptionStore as descriptionStore } from "../stores/toChangeDescription.mobx";
import { searchUsersStore as searchUsers } from "../stores/toSearchUsers.mobx";
import { observer } from "mobx-react-lite";
import { URLS } from "../constants/urls.const";
import { notificationsStore as notices } from "../stores/toNotifications.mobx";
import { subscribesStore } from "../stores/toSubscribes.mobx";

const UserCreateContext = createContext<UserProps>({
  user: null,
  followers: null,
  subscribes: null,
});

export const UserContext = observer(({ children }: any) => {
  const[user, setUser] = useState<UserDTO | null>(null);
  const[followers, setFollowers] = useState<IUserProps[] | null>(null);
  const[subscribes, setSubscribes] = useState<IUserProps[] | null>(null);
  const url = new URLS();

  const getUser = async (): Promise<void> => {
    try {
      const response = await api.get('/users/authenticated');
      setUser(response.data);
    }catch(error: any) {
      console.error(error);
    }
  }

  const getUserAvatar = async (): Promise<void> => {
    try {
      if(user && user.userHaveAvatar) {
        await api.get(`/images/user/avatar/${user.username}`);
        avatarStore.setAvatar(`${API_URL}/images/user/avatar/${user.username}`);
        avatarStore.setAvatarURL(`${API_URL}/images/user/avatar/${user.username}`);
        searchUsers.setAvatar(`${API_URL}/images/user/avatar/${user.username}`);
        console.log(avatarStore.avatar);
      }else{
        avatarStore.setAvatar('/defaultAvatar.png');
        searchUsers.setAvatar('/defaultAvatar.png');
      }
    }catch(error: any){
      console.error(error);
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

  useEffect(() => {
    subscribesStore.getData(subscribes);
  }, [subscribes])

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