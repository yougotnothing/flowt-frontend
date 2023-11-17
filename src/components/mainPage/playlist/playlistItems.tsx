import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { playlistsStore as playlist } from "../../../stores/toPlaylists.mobx";
import { AddSong, Song, SongContainer, SongContainerText, SongIcon, SongInfo, SongMainInfo, SongStats, SongStatsContainer } from "./Playlist.styled";
import { API_URL } from "../../../api/axiosConfig";
import { useUserContext } from "../../../contexts/UserContext";

export const PlaylistItems: React.FC = observer(() => {
  const { user } = useUserContext();

  useEffect(() => {
    if(playlist.playlist === 'Create') {
      playlist.search('All');
    }else if(playlist.playlist === 'Browse') {
      playlist.getPlaylists();
    }
  }, [playlist.playlist]);

  return (
    <>
    {playlist.playlist === 'Create' && 
      <SongContainer>
        <SongContainerText>Added: </SongContainerText>
        {playlist.added.map((song, index) => (
          <Song key={index}>
            <SongStatsContainer>
              <SongStats>{++index}</SongStats>
              <SongIcon style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${song.author}/${song.name}`)})`}}/>
              <SongMainInfo>
                <SongInfo>{song.author}</SongInfo>
                <SongInfo>{song.name}</SongInfo>
              </SongMainInfo>
            </SongStatsContainer>
            <SongInfo>{song.genre}</SongInfo>
            <SongStatsContainer>
              <SongStats>listens: {song.listens}</SongStats>
              <SongStats>liked</SongStats>
            </SongStatsContainer>
            <AddSong onClick={() => playlist.removeAdded(song)}>
              Remove
            </AddSong>
          </Song>
        ))}
      </SongContainer>
      }
      {playlist.playlist === 'Create' &&
        <SongContainer>
          <SongContainerText>Recommendations: </SongContainerText>
          {playlist.songs.map((song, index) => (
            <Song key={index}>
              <SongStatsContainer>
                <SongStats>{++index}</SongStats>
                <SongIcon style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${song.author}/${song.name}`)})`}}/>
                <SongMainInfo>
                  <SongInfo>{song.author}</SongInfo>
                  <SongInfo>{song.name}</SongInfo>
                </SongMainInfo>
              </SongStatsContainer>
              <SongInfo>{song.genre}</SongInfo>
              <SongStatsContainer>
                <SongStats>listens: {song.listens}</SongStats>
                <SongStats>liked</SongStats>
              </SongStatsContainer>
              <AddSong onClick={() => playlist.setAdded(song)}>
                Add
              </AddSong>
            </Song>
          ))}
        </SongContainer>
      }
      {playlist.playlist === 'Browse' && playlist.self.map((item, index) => (
        <Song key={index}>
          <SongStatsContainer>
            <SongStats>{index + 1}</SongStats>
            <SongIcon style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/playlist/${item.username}/${item.name}`)})`}} />
            <SongMainInfo>
              <SongInfo>{item.name}</SongInfo>
            </SongMainInfo>
          </SongStatsContainer>
          <SongInfo>{item.isPrivate}</SongInfo>
          <SongStatsContainer>
            <SongStats>liked</SongStats>
          </SongStatsContainer>
        </Song>
      ))}
    </>
  )
});