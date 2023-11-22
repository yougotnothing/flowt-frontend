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
import { userSongsStore as songs } from "../../../stores/toSongs.mobx";
import { searchUsersStore } from "../../../stores/toSearchUsers.mobx";

export const SearchItems: React.FC = observer(() => {
  const ref = useRef<any>(null);
  const navigate = useNavigate();

  const closeDroplist = () => {
    search.setIsOpen(false);
  }

  const handleOutsideClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
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
          <ItemIcon $type="song" style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${song.author}/${song.name}`)})`}} />
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
            songs.setName(song.name);
            songs.setSearchSong(song.author, song.name);
          }}>Listen</ItemButton>
        </Item>
      ))}
      {search.users.map((searchUser, index) => {
        return (
          <Item key={index}>
            <ItemIcon 
              $type="user"
              src={searchUser.avatar}
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
        )})}
      {search.users.length === 0 && search.songs.length === 0 && <Text>{search.message}</Text>}
    </Droplist>
  )
});
