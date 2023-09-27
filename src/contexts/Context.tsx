import React, { useContext, createContext, useState, useEffect, useLayoutEffect } from "react";

import { api, API_URL } from "../api/axiosConfig";
import { ProviderProps, UserDTO } from "../constants/props.const";
import { userRegionStore } from "../store/toChangeRegion";
import { userUsernameStore } from "../store/toChangeUsername";
import { userAvatarStore } from "../store/toChangeAvatar";

const ContextValue = createContext<ProviderProps>({
  user: null,
  followers: null,
  subscribes: null,
  songInfo: null,
  songURL: null,
  songName: null,
  userAvatar: null,
  userRegionStore: null,
  userUsernameStore: null,
  userAvatarStore: null,
  setUser: () => {},
  setAvatarURL: () => {},
  setFollowers: () => {},
  setSubscribes: () => {},
  setSongInfo: () => {},
  setSongURL: () => {},
  setSongName: () => {},
  setUserAvatar: () => {}
});

export const Context = ({ children }: any) => {
  const[songInfo, setSongInfo] = useState<string | null>(null);
  const[user, setUser] = useState<UserDTO | null>(null);
  const[followers, setFollowers] = useState<string | null>(null);
  const[subscribes, setSubscribes] = useState<string | null>(null);
  const[userAvatar, setUserAvatar] = useState<string | null>(null);
  const[songURL, setSongURL] = useState<string | null>(null);
  const[songName, setSongName] = useState<string | null>(null);

  const getSubscribes = async (): Promise<void> => {
    try {
      const response = await api.get('/users/subscribes');
      setSubscribes(response.data.subscribes);
    }catch(error: any) {
      console.log('an error occurred');
    }
  };

  const getSongAvatar = async (): Promise<void> => {
    try {
      if(user) {
        const response = await api.get(`/images/song/${user.username}`)
      }
    }catch (error: any) {
      console.log('an error occurred');
    }
  }

  const getFollowers = async (): Promise<void> => {
    try {
      const response = await api.get('/users/followers');
      setFollowers(response.data.followers);
    }catch(error: any) {
      console.log('an error occurred');
    }
  };

  const getUserAvatar = async (): Promise<void> => {
    try {
      if(user) {
        const response = await api.get(`/images/user/${user.username}`);
        if(response.status === 200) {
          userAvatarStore.setAvatar(`${API_URL}/images/user/${user.username}`);
          setUserAvatar(userAvatarStore.avatar);
        }else {
          userAvatarStore.setAvatar('/defaultAvatar.png');
          setUserAvatar(userAvatarStore.avatar);
        }
      }
    }catch(error: any) {
      console.log('error');
    }
  }

  const getUser = async (): Promise<void> => {
    try {
      const response = await api.get('/users/authenticated');
      setUser(response.data);
    }catch(error: any) {
      console.log("an error occurred");
    }
  }

  useLayoutEffect(() => {
    // getUser();
    if(localStorage.getItem('token')) {
      getSubscribes();
      getFollowers();
    }
  }, []);

  useEffect(() => {
    const getSongURL = async (): Promise<void> => {
      try {
        const response = await api.get('/users/songs');
        setSongInfo(response.data.songs);
      } catch (error: any) {
        console.log('song url =', songURL);
      }
    }
    getSongURL();
    getUserAvatar();
  }, [user]);

  useEffect(() => {
    if(userAvatarStore.avatar) {
      setUserAvatar(userAvatarStore.avatar);
    }
  }, [userAvatarStore])

  const updateSongURL = (newSongURL: string) => {
    setSongURL(newSongURL);
  }

  const updateAvatarURL = (newAvatarURL: Blob) => {
    userAvatarStore.setAvatarURL(newAvatarURL);
  }

  const updateSongName = (newSongName: string) => {
    setSongName(newSongName);
  }

  const updateUserAvatar = (newAvatar: string) => {
    setUserAvatar(newAvatar);
  }

  return (
    <ContextValue.Provider value={{
      user,
      followers,
      subscribes,
      userAvatar,
      songURL,
      songName,
      userRegionStore,
      userUsernameStore,
      userAvatarStore,
      setAvatarURL: updateAvatarURL,
      setSongURL: updateSongURL,
      setSongName: updateSongName,
      setUserAvatar: updateUserAvatar
    }}>
      {children}
    </ContextValue.Provider>
  );
};

export const useContextValues: any = () => useContext(ContextValue);