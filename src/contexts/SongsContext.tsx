import React, { useContext, createContext, useState, useEffect } from "react";

import { api, API_URL, getUser } from "../api/axiosConfig";
import { SongUrlProps } from "../consts/props.const";

const SongsContext = createContext<SongUrlProps>({
  songURL: '',
  songName: '',
  userAvatar: '',
  setSongURL: (url: any) => {},
  setSongName: (name: any) => {},
  setUserAvatar: (url: any) => {}
});

export const SongsProvider = ({ children }: any) => {
  const[songInfo, setSongInfo] = useState<any>(null);
  const[user, setUser] = useState<any>(null);
  const[userAvatar, setUserAvatar] = useState('');
  const[songURL, setSongURL] = useState('');
  const[songName, setSongName] = useState('');

  useEffect(() => {
    getUser(setUser);
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
    getSongURL();
    if(songInfo) {
      songInfo.forEach(() => console.log(songInfo));
    }
  }, [user]);

  useEffect(() => {
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

    if(user) {
      getUserAvatar();
    }
  }, [user]);

  const updateSongURL = (newSongURL: string) => {
    setSongURL(newSongURL);
  }

  const updateSongName = (newSongName: string) => {
    setSongName(newSongName);
  }

  return (
    <SongsContext.Provider value={{ songURL, setSongURL: updateSongURL, setSongName: updateSongName, songName, userAvatar}}>
      {children}
    </SongsContext.Provider>
  );
};

export const useSongURL = () => useContext(SongsContext);