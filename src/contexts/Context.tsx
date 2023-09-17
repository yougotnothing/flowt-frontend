import React, { useContext, createContext, useState, useEffect } from "react";

import { api, API_URL, getUser, getSubscribes, getFollowers } from "../api/axiosConfig";
import { ProviderProps } from "../consts/props.const";

const ContextValue = createContext<ProviderProps>({
  user: '',
  followers: '',
  subscribes: '',
  songURL: '',
  songName: '',
  userAvatar: '',
  setUser: (user: any) => {},
  setFollowers: (followers: any) => {},
  setSubscribes: (subscribes: any) => {},
  setSongURL: (url: any) => {},
  setSongName: (name: any) => {},
  setUserAvatar: (url: any) => {}
});

export const Context = ({ children }: any) => {
  const[songInfo, setSongInfo] = useState<any>(null);
  const[user, setUser] = useState<any>(null);
  const[followers, setFollowers] = useState<any>(null);
  const[subscribes, setSubscribes] = useState<any>(null);
  const[userAvatar, setUserAvatar] = useState('');
  const[songURL, setSongURL] = useState('');
  const[songName, setSongName] = useState('');
    const getUserAvatar = async () => {
      try {
        const response = await api.get(`/images/user/${user.username}`);
        if(response.status === 200) {
          setUserAvatar(`${API_URL}/images/user/${user.username}`);
        }
      }catch(error: any) {
        setUserAvatar('/defaultAvatar.png');
      }
    }

  useEffect(() => {
    getUser(setUser);

    if(localStorage.getItem('token')) {
      getSubscribes(setSubscribes);
      getFollowers(setFollowers);
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