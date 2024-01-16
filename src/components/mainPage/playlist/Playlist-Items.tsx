import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { playlistsStore as playlist } from "../../../stores/toPlaylists.mobx";
import { AddSong, Song, SongContainer, SongContainerText, SongIcon, SongInfo, SongMainInfo, SongStats, SongStatsContainer } from "./Playlist.styled";
import { API_URL } from "../../../api/axiosConfig";

export const PlaylistItems: React.FC = observer(() => {
  useEffect(() => {
    playlist.container && playlist.setAdded(null, playlist.container.songs);
    console.log(playlist.container?.songs);
    console.log(playlist.songs);
  }, []);

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
            <AddSong onClick={() => {
              playlist.removeAdded(song);
              playlist.removeSong(song);
            }}>Remove</AddSong>
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
              <AddSong onClick={() => {
                playlist.setAdded(song);
              }}>Add</AddSong>
            </Song>
          ))}
        </SongContainer>
      }
    </>
  )
});