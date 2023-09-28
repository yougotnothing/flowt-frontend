import React, { useContext, createContext, useState, useEffect } from "react";

import { api } from "../api/axiosConfig";
import { ProviderProps } from "../constants/props.const";
import { useUserContext } from "./UserContext";

const ContextValue = createContext<ProviderProps>({
  songInfo: null,
  songURL: null,
  songName: null,
  setSongInfo: () => {},
  setSongURL: () => {},
  setSongName: () => {},
});

export const SongContext = ({ children }: any) => {
  const[songInfo, setSongInfo] = useState<string | null>(null);
  const[songURL, setSongURL] = useState<string | null>(null);
  const[songName, setSongName] = useState<string | null>(null);
  const { user } = useUserContext();

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
  }, [user]);

  const updateSongURL = (newSongURL: string) => {
    setSongURL(newSongURL);
  }

  const updateSongName = (newSongName: string) => {
    setSongName(newSongName);
  }

  return (
    <ContextValue.Provider value={{
      songURL,
      songName,
      setSongURL: updateSongURL,
      setSongName: updateSongName,
    }}>
      {children}
    </ContextValue.Provider>
  );
};

export const useSongContext: any = () => useContext(ContextValue);