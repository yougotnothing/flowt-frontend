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
import { searchStore as search } from "../../../stores/toSearch";
import { API_URL } from "../../../api/axiosConfig";
import { generatePath, useNavigate } from "react-router-dom";
import { userSongsStore as songs } from "../../../stores/toSongs";
import { searchUsersStore } from "../../../stores/toSearchUsers";
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
          <ItemIcon style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/song/${song.author}/${song.name}`)})`}} />
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
      {search.users.map((searchUser, index) => (
        <Item key={index}>
          <ItemIcon style={{backgroundImage: `url(${encodeURI(`${API_URL}/images/user/avatar/${searchUser.username}`)})`}}/>
          <ItemInfo>
            <BigText>{searchUser.username}</BigText>
            <Text>{searchUser.region}</Text>
          </ItemInfo>
          <ItemButton onClick={() => {
            searchUsersStore.setUser(searchUser);
            searchUsersStore.setAvatar(`${API_URL}/images/user/avatar/${searchUser.username}`);
            navigate(generatePath('/profile/:id', {id: searchUser.username}));
          }}>
            See more
          </ItemButton>
        </Item>
      ))}
      {search.users.length === 0 && search.songs.length === 0 && <Text>{search.message}</Text>}
    </Droplist>
  )
});
