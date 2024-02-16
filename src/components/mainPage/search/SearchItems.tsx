import React, { useEffect, useRef } from "react";

import {
  Droplist,
  Item,
  ItemIcon,
  Text,
  ItemInfo,
  ListensIcon,
  StatsContainer,
  LikesIcon,
  StateContainer,
  BigText, ItemButton
} from "../MainPage.styled";
import { observer } from "mobx-react-lite";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { API_URL } from "../../../api/axiosConfig";
import { generatePath, useNavigate } from "react-router-dom";
import { searchUsersStore } from "../../../stores/toSearchUsers.mobx";
import { playlistsStore } from "../../../stores/toPlaylists.mobx";

export const SearchItems: React.FC = observer(() => {
  const ref = useRef<any>(null);
  const navigate = useNavigate();

  const closeDroplist = () => {
    search.setIsOpen(false);
  }

  const handleOutsideClick = (e: any) => {
    if(ref.current && !ref.current.contains(e.target)) {
      closeDroplist();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Droplist $isOpen={search.isOpen} ref={ref}>
      {search.songs.map((song, index) => (
        <Item key={index}>
          <ItemIcon $song={song} $type="song" />
          <ItemInfo>
            <Text>{song.author}</Text>
            <BigText>{song.name}</BigText>
            <StatsContainer>
              <StateContainer>
                <ListensIcon />
                <Text>{song.listens}</Text>
              </StateContainer>
              <StateContainer>
                <LikesIcon />
                <Text>likes</Text>
              </StateContainer>
            </StatsContainer>
          </ItemInfo>
          <ItemButton onClick={() => {
            navigate(generatePath('/song/:id', { id: song.name }));
            search.setIsOpen(false);
            search.setSong(song);
          }}>Listen</ItemButton>
        </Item>
      ))}
      {search.users.map((searchUser, index) => (
        <Item key={index}>
          <ItemIcon 
            $type="user"
            src={searchUser.userHaveAvatar ? searchUser.avatar : '/defaultAvatar.png'}
          />
          <ItemInfo>
            <BigText>{searchUser.username}</BigText>
            <Text>{searchUser.region}</Text>
          </ItemInfo>
          <ItemButton onClick={() => {
            searchUsersStore.setUser(searchUser);
            searchUsersStore.setAvatar(searchUser.avatar);
            navigate(generatePath('/profile/:id', { id: searchUser.username }));
          }}>
            See more
          </ItemButton>
        </Item>
      ))}
      {search.users.length === 0 && search.songs.length === 0 && search.playlists.length === 0 && <Text>{search.message}</Text>}
      {search.playlists && search.playlists.map((playlist, index) => (
        <Item key={index}>
          <ItemIcon
            $type="song"
            src={`${API_URL}/images/playlist/${playlist.username}/${playlist.name}`}
          />
          <ItemInfo>
            <BigText>{playlist.username}</BigText>
            <Text>{playlist.name}</Text>
          </ItemInfo>
          <ItemButton onClick={() => {
            playlistsStore.getPlaylist(playlist);
            navigate(generatePath('/playlist/:id', { id: playlist.name }));
          }}>
            See more
          </ItemButton>
        </Item>
      ))}
    </Droplist>
  )
});
