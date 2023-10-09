import React, { useEffect, createContext, useContext, useState, useLayoutEffect } from "react";

import { api, API_URL } from "../api/axiosConfig";
import { UserDTO, UserProps } from "../types/props";
import { userUsernameStore } from "../store/toChangeUsername";
import { userRegionStore } from "../store/toChangeRegion";
import { userEmailStore } from "../store/toChangeEmail";
import { userDescriptionStore } from "../store/toChangeDescription";
import { observer } from "mobx-react-lite";
import { userAvatarStore } from "../store/toChangeAvatar";

const UserCreateContext = createContext<UserProps>({
  user: null,
  followers: null,
  subscribes: null,
});

export const UserContext = observer(({ children }: any) => {
  const[user, setUser] = useState<UserDTO | null>(null);
  const[followers, setFollowers] = useState<string | null>(null);
  const[subscribes, setSubscribes] = useState<string | null>(null);

  const getUser = async (): Promise<void> => {
    try {
      const response = await api.get('/users/authenticated');
      setUser(response.data);
    }catch(error: any) {
      console.log("an error occurred");
    }
  }

  const getUserAvatar = async (): Promise<void> => {
    try {
      if(user) {
        const response = await api.get(`/images/user/${user.username}`);
        if(response.status === 200) {
          userAvatarStore.setAvatar(`${API_URL}/images/user/${user.username}`);
          userAvatarStore.setAvatarURL(`${API_URL}/images/user/${user.username}`);
          console.log(userAvatarStore.avatar);
        }
      }
    }catch{
      try{
        const formData = new FormData();
        userAvatarStore.setAvatar('/defaultAvatar.png');

        formData.append('file', userAvatarStore.avatar);

        await api.post('/users/avatar', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
      }catch(error: any) {
        console.error(error);
      }
    }
  }

  const getSubscribes = async (): Promise<void> => {
    try {
      const response = await api.get('/users/subscribes');
      setSubscribes(response.data.subscribes);
    }catch(error: any) {
      console.log('an error occurred');
    }
  };

  const getFollowers = async (): Promise<void> => {
    try {
      const response = await api.get('/users/followers');
      setFollowers(response.data.followers);
    }catch(error: any) {
      console.log('an error occurred');
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
      userDescriptionStore.setDescription(user.description);
      userUsernameStore.setUsername(user.username);
      userRegionStore.setRegion(user.region);
      userEmailStore.setEmail(user.email);
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