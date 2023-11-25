import { useEffect, createContext, useContext, useState, useLayoutEffect } from "react";

import { api } from "../api/axiosConfig";
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
  const googleAvatarUrl = localStorage.getItem('image');

  const getUser = async (): Promise<void> => {
    try {
      const response = await api.get('/users/authenticated');
      setUser(response.data);

      console.log(response.data);
    }catch(error: any) {
      console.error(error);
    }
  }

  const getUserAvatar = async () => {
    if(user) {
      if(user.userHaveAvatar) {
        avatarStore.setAvatar(user.avatar);
        avatarStore.setAvatarURL(user.avatar);
        searchUsers.setAvatar(user.avatar);
      }else{
        avatarStore.setAvatar('/defaultAvatar.png');
        avatarStore.setAvatarURL('/defaultAvatar.png');
        searchUsers.setAvatar('/defaultAvatar.png');
      }
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
  }, [subscribes]);

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