import { FC, useEffect, useState } from "react";

import { API_URL, api } from "../../../api/axiosConfig";
import {
  Container,
  ContentContainer,
  FiltersContainer,
  Header,
  SearchFilterButton,
  SearchFilters,
  Card,
  CardIcon,
  CardInfoContainer,
  CardInfo,
  CardButtonsContainer,
  CardButton
} from "./Search.styled";
import filters from "../../../json/filters.json";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { modalStore as modal } from "../../../stores/toModal.mobx";
import { playlistsStore as playlists } from "../../../stores/toPlaylists.mobx";
import { useUserContext } from "../../../contexts/UserContext";

export const Search: FC = observer(() => {
  const [isOpenSongs, setIsOpenSongs] = useState<boolean[]>(Array(search.songs.length).fill(false));
  const [isOpenUsers, setIsOpenUsers] = useState<boolean[]>(Array(search.users.length).fill(false));
  const [isOpenPlaylists, setIsOpenPlaylists] = useState<boolean[]>(Array(search.playlists.length).fill(false));
  const location = useLocation();
  const { user } = useUserContext();
  const User = user;

  const handleSubscribe = async (username: string) => {
    try {
      const response = await api.post(`/users/subscribe/${username}`);
      console.log(`subscribed to user ${username}!`);
    }catch(error: any) {
      console.error(error.response.data.message);
    }
  }

  const handleMouseEnter = (index: number, set: React.Dispatch<React.SetStateAction<boolean[]>>) => {
    set(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleMouseLeave = (index: number, set: React.Dispatch<React.SetStateAction<boolean[]>>) => {
    set(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  useEffect(() => {
    if(location.pathname === '/search') {
      search.setIsOpen(false);
    }
  }, [location.pathname, search.isOpen]);

  return (
    <Container>
      <Header>Search</Header>
      <FiltersContainer>
        <SearchFilters>
          {filters.map((filter, index) => (
            <SearchFilterButton
              key={index}
              onClick={async () => await search.get(filter)}
            >
              {filter}
            </SearchFilterButton>
          ))}
        </SearchFilters>
      </FiltersContainer>
      <ContentContainer>
        {search.songs && search.songs.map((song, index) => (
          <Card
            key={index} 
            onMouseEnter={() => handleMouseEnter(index, setIsOpenSongs)}
            onMouseLeave={() => handleMouseLeave(index, setIsOpenSongs)}
          >
            <CardIcon
              $type='song'
              $src={encodeURI(`${API_URL}/images/song/${song.author}/${song.name}`)}
            />
            <CardInfoContainer>
              <CardInfo>{song.author}</CardInfo>
              <CardInfo>{song.name}</CardInfo>
            </CardInfoContainer>
            <CardButtonsContainer $isOpen={isOpenSongs[index]}>
              <CardButton>Like</CardButton>
              <CardButton>Report</CardButton>
              <CardButton 
                onClick={() => {
                  playlists.getPlaylists();
                  playlists.setSongData(song);
                  modal.setIsOpen(true)
                }}
              >Add to playlist</CardButton>
            </CardButtonsContainer>
          </Card>
        ))}
        {search.users && search.users.map((user, index) => (
          <Card 
            key={index}
            onMouseEnter={() => handleMouseEnter(index, setIsOpenUsers)}
            onMouseLeave={() => handleMouseLeave(index, setIsOpenUsers)}
          >
            <CardIcon $type='user' $src={user.avatar} />
            <CardInfoContainer>
              <CardInfo>{user.username}</CardInfo>
              <CardInfo>{user.region}</CardInfo>
            </CardInfoContainer>
            <CardButtonsContainer $isOpen={isOpenUsers[index]}>
              <CardButton
                disabled={user.email === User.email ? true : false}
                onClick={() => handleSubscribe(user.username)}
              >Subscribe</CardButton>
              <CardButton
                disabled={user.email === User.email ? true : false}
              >Report</CardButton>
            </CardButtonsContainer>
          </Card>
        ))}
        {search.playlists && search.playlists.map((playlist, index) => (
          <Card 
            key={index}
            onMouseEnter={() => handleMouseEnter(index, setIsOpenPlaylists)}
            onMouseLeave={() => handleMouseLeave(index, setIsOpenPlaylists)}
          >
            <CardIcon $type='song' $src={`${API_URL}/images/playlist/${playlist.username}/${playlist.name}`} />
            <CardInfoContainer>
              <CardInfo>{playlist.username}</CardInfo>
              <CardInfo>{playlist.name}</CardInfo>
            </CardInfoContainer>
            <CardButtonsContainer $isOpen={isOpenPlaylists[index]}>
              <CardButton>Like</CardButton>
              <CardButton>Report</CardButton>
            </CardButtonsContainer>
          </Card>
        ))}
      </ContentContainer>
    </Container>
  )
});