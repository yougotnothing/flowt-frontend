import React, {useEffect, useState, createContext, useContext, useLayoutEffect} from "react";

import { api, API_URL } from "../api/axiosConfig";
import { UserProps } from "../types/props";
import { UserDTO } from "../types/props";
import { userAvatarStore } from "../store/toChangeAvatar";
import {userRegionStore} from "../store/toChangeRegion";
import {userUsernameStore} from "../store/toChangeUsername";

const UserCreateContext = createContext<UserProps>({
  user: null,
  userAvatar: null,
  followers: null,
  subscribes: null,
  setUserAvatar: () => {},
});

export const UserContext = ({ children }: any) => {
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
        }else {
          userAvatarStore.setAvatar('/defaultAvatar.png');
        }
      }
    }catch(error: any) {
      console.log('error');
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

  useLayoutEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if(user) {
      getUserAvatar();
      getFollowers();
      getSubscribes();
    }
  }, [user]);

  useLayoutEffect(() => {
    if(user) {
      userRegionStore.setUserRegion(user.region);
      userUsernameStore.setUsername(user.username);
    }
  }, [user]);

  return (
    <UserCreateContext.Provider
      value={{
        user,
        followers,
        subscribes,
        userAvatar: userAvatarStore.avatar,
        setUserAvatar: userAvatarStore.setAvatar,
      }}
    >
      {children}
    </UserCreateContext.Provider>
  );
};

export const useUserContext: any = () => useContext(UserCreateContext);