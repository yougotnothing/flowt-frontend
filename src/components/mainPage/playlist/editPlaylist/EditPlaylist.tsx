import React, { useEffect, useLayoutEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import {
  AddSongs, 
  Container, 
  InputContainer, 
  NavItem, 
  NavItemContainer, 
  PlaylistOptionsButton, 
  SearchSongs, 
  SearchSongsContainer, 
  SearchSongsNav,
  PlaylistOptionsContainer,
  PlaylistOption
} from "../Playlist.styled";
import {
  PlaylistInfoContainer,
  PlaylistButton,
  PlaylistInfo as Info,
  Container as PlaylistContainer,
  PlaylistIcon as Icon
} from "../large/Playlist.styled";
import { editPlaylistStore as editPlaylist } from "../../../../stores/toEditPlaylist.mobx";
import settings from "../../../../json/playlistSettings.json";
import { playlistsStore as playlist } from "../../../../stores/toPlaylists.mobx";
import { userSongsStore as songs } from "../../../../stores/toSongs.mobx";
import { AddSong, Song, SongContainer, SongContainerText, SongIcon, SongInfo, SongMainInfo, SongStats, SongStatsContainer } from "../Playlist.styled";
import { API_URL, api } from "../../../../api/axiosConfig";
import { ISongData } from "../../../../types/types";
import { user } from "../../../../stores/toUser.mobx";
import { modalStore } from "../../../../stores/toModal.mobx";
import { deletePlaylistStore } from "../../../../stores/toDelete-playlist.mobx";
import { changePlaylistName } from "../../../../stores/toChange-playlist-name.mobx";
import { Title } from "../../../../helmet";

export const EditPlaylist: React.FC = observer(() => {
  const [recommendations, setRecommendations] = useState<ISongData[]>([]);
  const [addedSongs, setAddedSongs] = useState<ISongData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if(addedSongs.length) {
      playlist.addSongs(editPlaylist.name, addedSongs);
    }
  }, [addedSongs]);

  useLayoutEffect(() => {
    const songs = sessionStorage.getItem('songs');

    if(songs) {
      playlist.setAdded(null, JSON.parse(songs) as ISongData[]);
    }

    console.log('changed songs: ', playlist.added);
    console.log('json songs: ', songs);
  }, []);

  const handleSearchSongs = async (value: string) => {
    try {
      const response = await api.get('/search/songs',{
        params: {
          substring: value
        }
      });
      
      setRecommendations(response.data.songs);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  const handleSetAllRecommendations = async () => {
    try {
      const response = await api.get('/search/songs', {
        params: {
          page: 0,
          substring: ''
        }
      });
      
      setRecommendations(response.data.songs);
      console.log(response.data.songs);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  const handleSetLikedRecommendations = async () => {
    try {
      const response = await api.get('/users/liked');

      setRecommendations(response.data.songs);
      console.log(response.data.songs);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  const handleSetRecommendations = async (type: string) => {
    if(type === 'All') {
      await handleSetAllRecommendations();
      return;
    }else{
      await handleSetLikedRecommendations();
      return;
    }
  }

  useEffect(() => {
    playlist.setAdded(null, playlist.container?.songs);
    handleSetAllRecommendations();
    editPlaylist.setEditing(true);
    console.log(recommendations);
    
    const playlistName = sessionStorage.getItem('name');
    const playlistUsername = sessionStorage.getItem('username');

    if(playlistName) playlist.setInput(playlistName);
    editPlaylist.setData(playlistName, playlistUsername);
    console.log(editPlaylist.name);
    console.log(editPlaylist.username);
  }, []);

  return (
    <Container>
      <Title title="Edit playlist" />
      <PlaylistContainer $isEditing={editPlaylist.isEditing}>
        <Icon
          $isEditing={editPlaylist.isEditing}
          $username={editPlaylist.username}
          $name={editPlaylist.name}
        />
        <PlaylistInfoContainer>
          <Info $type="name">{editPlaylist.name}</Info>
          <Info $type="username">{user.username}</Info>
        </PlaylistInfoContainer>
        <PlaylistOptionsButton onClick={() => setIsOpen(!isOpen)} />
        <PlaylistOptionsContainer $isOpen={isOpen}>
          <PlaylistOption onClick={() => modalStore.setChangeAvatar(true)}>Change avatar</PlaylistOption>
          <PlaylistOption onClick={() => changePlaylistName.setIsOpen(true)}>Change name</PlaylistOption>
          <PlaylistOption onClick={() => deletePlaylistStore.setIsOpen(true)}>Delete playlist</PlaylistOption>
        </PlaylistOptionsContainer>
        <PlaylistButton
          onClick={() => {
            songs.getInfo(playlist.songs);
            songs.setSong(0);
          }}
        >Play</PlaylistButton>
      </PlaylistContainer>
      <SearchSongsContainer>
        <SearchSongsNav>
          <NavItemContainer>
            {settings.map((setting, index) => (
              <NavItem key={index} onClick={() => handleSetRecommendations(setting)}>
                {setting}
              </NavItem>
            ))}
          </NavItemContainer>
          <InputContainer>
            <SearchSongs placeholder="Search" onSubmit={(e: any) => handleSearchSongs(e.target.value)} onChange={(e: any) => setSearchValue(e.target.value)} />
            <AddSongs className="addSongs" onClick={() => handleSearchSongs(searchValue)} />
          </InputContainer>
        </SearchSongsNav>
        <>
          <SongContainer>
            <SongContainerText>Added: </SongContainerText>
            {playlist.added.map((song, index) => (
              <Song key={index} onDoubleClick={() => songs.setSong(index - 1, playlist.added)}>
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
          <SongContainer>
            <SongContainerText>Recommendations: </SongContainerText>
            {recommendations.map((song, index) => (
              <Song key={index} onDoubleClick={() => songs.setSong(index - 1, recommendations)}>
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
                  setAddedSongs((prevState) => {
                    const newState = [...prevState];
                    newState.push(song);
                    return newState;
                  });
                }}>Add</AddSong>
              </Song>
            ))}
          </SongContainer>
        </>
      </SearchSongsContainer>
    </Container>
  )
});