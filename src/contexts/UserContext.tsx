import React, { useEffect, createContext, useContext, useState } from "react";

import { api, API_URL } from "../api/axiosConfig";
import { UserDTO, UserProps } from "../types/props";
import { userAvatarStore } from "../store/toChangeAvatar";
import { userUsernameStore } from "../store/toChangeUsername";
import { userRegionStore } from "../store/toChangeRegion";
import { userEmailStore } from "../store/toChangeEmail";

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
        }
      }
    }catch(error: any) {
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
        console.error(error.response.data);
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

  useEffect(() => {
    if(user) {
      getUserAvatar();
      getFollowers();
      getSubscribes();
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
        userAvatar: userAvatarStore.avatar,
        setUserAvatar: userAvatarStore.setAvatar,
      }}
    >
      {children}
    </UserCreateContext.Provider>
  );
};

export const useUserContext: any = () => useContext(UserCreateContext);