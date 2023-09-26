import React, { useContext, createContext, useState, useEffect, useLayoutEffect } from "react";

import { api, API_URL } from "../api/axiosConfig";
import { ProviderProps, UserDTO } from "../consts/props.const";
import { userRegionStore } from "../store/toChangeRegion";
import { userUsernameStore } from "../store/toChangeUsername";

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
  setUser: () => {},
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
          setUserAvatar(`${API_URL}/images/user/${user.username}`);
        }
      }
    }catch(error: any) {
      setUserAvatar('/defaultAvatar.png');
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
    getUser();
    if(localStorage.getItem('token')) {
      getSubscribes();
      getFollowers();
    }
  }, []);

  useLayoutEffect(() => {
    if(user) {
      userRegionStore.setUserRegion(user.region);
      userUsernameStore.setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    const getSongURL = async (): Promise<void> => {
      try {
        const response = await api.get('/users/songs');
        setSongInfo(response.data.songs);
      } catch (error: any) {
        console.log('song url =', songURL);
      }
    }
    getUserAvatar();
    getSongURL();
  }, [user]);

  const updateSongURL = (newSongURL: string) => {
    setSongURL(newSongURL);
  }

  const updateSongName = (newSongName: string) => {
    setSongName(newSongName);
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
      setSongURL: updateSongURL,
      setSongName: updateSongName
    }}>
      {children}
    </ContextValue.Provider>
  );
};

export const useContextValues: any = () => useContext(ContextValue);