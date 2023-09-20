import React, { useContext, createContext, useState, useEffect } from "react";

import { api, API_URL } from "../api/axiosConfig";
import { ProviderProps, UserDTO } from "../consts/props.const";

const ContextValue = createContext<ProviderProps>({
  user: null,
  followers: null,
  subscribes: null,
  songInfo: null,
  songURL: null,
  songName: null,
  userAvatar: null,
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
  const[userAvatar, setUserAvatar] = useState('');
  const[songURL, setSongURL] = useState('');
  const[songName, setSongName] = useState('');

  const getSubscribes = async () => {
    try {
      const response = await api.get('/users/subscribes');
      setSubscribes(response.data.subscribes);
    }catch(error: any) {
      console.log('an error occurred');
    }
  };

  const getFollowers = async () => {
    try {
      const response = await api.get('/users/followers');
      setFollowers(response.data.followers);
    }catch(error: any) {
      console.log('an error occurred');
    }
  };

  const getUserAvatar = async () => {
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

  const getUser = async () => {
    try {
      const response = await api.get('/users/authenticated');
      setUser(response.data);
    }catch(error: any) {
      console.log("an error occurred");
    }
  }

  useEffect(() => {
    getUser();
    if(localStorage.getItem('token')) {
      getSubscribes();
      getFollowers();
    }
  }, []);

  useEffect(() => {
    const getSongURL = async () => {
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
      setSongURL: updateSongURL,
      setSongName: updateSongName
    }}>
      {children}
    </ContextValue.Provider>
  );
};

export const useContextValues: any = () => useContext(ContextValue);