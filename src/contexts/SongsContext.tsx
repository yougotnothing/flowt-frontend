import React, { useContext, createContext, useState, useEffect } from "react";

import { api, API_URL, getUser } from "../api/axiosConfig";
import { SongUrlProps } from "../consts/props.const"

const SongsContext = createContext<SongUrlProps>({
  songURL: '',
  songName: '',
  setSongURL: (url: any) => {},
  setSongName: (name: any) => {}
});

export const SongsProvider = ({ children }: any) => {
  const[songInfo, setSongInfo] = useState<any>(null);
  const[user, setUser] = useState<any>(null);
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

  const updateSongURL = (newSongURL: string) => {
    setSongURL(newSongURL);
  }

  const updateSongName = (newSongName: string) => {
    setSongName(newSongName);
  }

  return (
    <SongsContext.Provider value={{ songURL, setSongURL: updateSongURL, setSongName: updateSongName, songName}}>
      {children}
    </SongsContext.Provider>
  );
};

export const useSongURL = () => useContext(SongsContext);