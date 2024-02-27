import { FC, useEffect, useState } from "react";

import { API_URL } from "../../../api/axiosConfig";
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
  CardButton,
} from "./Search.styled";
import filters from "../../../json/filters.json";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { observer } from "mobx-react-lite";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { modalStore as modal } from "../../../stores/toModal.mobx";
import { playlistsStore as playlists } from "../../../stores/toPlaylists.mobx";
import { reportStore } from "../../../stores/toReport.mobx";
import { user as User } from "../../../stores/toUser.mobx";
import { 
  handleCardClick,
  handleCheckIsSubscribed,
  handleClickPlaylistModalButton,
  handleClickSongModalButton,
  handleClickUserModalButton,
  handleMouseEnter,
  handleMouseLeave,
  handleSubscribe
} from "./functions";
import { addModerator, deleteUser } from "../../admin/functions";
import { Title as Helmet } from "../../../helmet";
import { likedSongs } from "../../../stores/toLiked-songs.mobx";
import { LikedPlaylists } from "../liked/liked-playlists/Liked-playlists";
import { likedPlaylists } from "../../../stores/toLiked-playlists.mobx";
import { userSongsStore } from "../../../stores/toSongs.mobx";

export const Search: FC = observer(() => {
  const[isOpenSongs, setIsOpenSongs] = useState<boolean[]>(Array(search.songs.length).fill(false));
  const[isOpenUsers, setIsOpenUsers] = useState<boolean[]>(Array(search.users.length).fill(false));
  const[isOpenPlaylists, setIsOpenPlaylists] = useState<boolean[]>(Array(search.playlists.length).fill(false));
  const[isSubscribed, setIsSubscribed] = useState<boolean[]>(Array(search.users.length).fill(false));
  const[isFetching, setIsFetching] = useState<boolean>(false);
  const[param, setParam] = useState<string>('All');
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (e: any) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      search.setPage(search.page + 1);
      setIsFetching(true);
      console.log('scroll', e.target.documentElement.scrollTop);
    }
  }

  useEffect(() => {
    if(isFetching) {
      if(search.songs.length >= 3 && search.playlists.length >= 3 && search.users.length >= 3) {
        search.get(param);
        setIsFetching(false);
      }
    }
  }, [isFetching, search.songs.length, search.playlists.length, search.users.length]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
  
    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if(location.pathname === '/search') {
      search.setIsOpen(false);
      reportStore.setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    likedSongs.setSongs();
    User.getSubscribes();
  }, []);

  useEffect(() => {
    const newSubscriptions = search.users.map((user) => handleCheckIsSubscribed(user, User.subscribes));
    setIsSubscribed(newSubscriptions);
  }, [search.users, User.subscribes]);

  const handleSubscribeClick = (index: number) => {
    setIsSubscribed((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    handleSubscribe(search.users[index].username, isSubscribed[index]);
  };

  return (
    <Container>
      <Helmet title={`Search: ${search.input}`} />
      <Header>Search</Header>
      <FiltersContainer>
        <SearchFilters>
          {filters.map((filter, index) => (
            <SearchFilterButton
              key={index}
              onClick={async () => {
                await search.get(filter, location.pathname);
                setParam(filter);
              }}
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
              onClick={() => userSongsStore.setSong(index, search.songs)}
              $type='song'
              $src={encodeURI(`${API_URL}/images/song/${song.author}/${song.name}`)}
            />
            <CardInfoContainer>
              <CardInfo>{song.author}</CardInfo>
              <CardInfo
                onClick={() => {
                  search.setSong(song);
                  navigate(generatePath('/song/:id', { id: song.name }));
                }}
              >{song.name}</CardInfo>
            </CardInfoContainer>
            <CardButtonsContainer $isOpen={isOpenSongs[index]}>
              <CardButton>Like</CardButton>
              <CardButton
                disabled={song.author === User.username ? true : false}
                onClick={() => handleClickSongModalButton(song)}
              >Report</CardButton>
              <CardButton
                onClick={() => {
                  playlists.getPlaylists();
                  playlists.setSongData(song);
                  playlists.self.length > 0 && modal.setIsOpen(true);
                }}
              >Add to playlist</CardButton>
            </CardButtonsContainer>
          </Card>
        ))}
        {search.users && search.users.map((searchUser, index) => (
          <Card
            key={index}
            onMouseEnter={() => handleMouseEnter(index, setIsOpenUsers)}
            onMouseLeave={() => handleMouseLeave(index, setIsOpenUsers)}
          >
            <CardIcon
              $type='user'
              $src={searchUser.userHaveAvatar ? searchUser.avatar : '/defaultAvatar.png'}
              onClick={() => handleCardClick(searchUser, navigate)}
            />
            <CardInfoContainer>
              <CardInfo>{searchUser.username}</CardInfo>
              <CardInfo>{searchUser.region}</CardInfo>
            </CardInfoContainer>
            <CardButtonsContainer $isOpen={isOpenUsers[index]}>
              <CardButton
                disabled={searchUser.username === User.username}
                onClick={() => handleSubscribeClick(index)}
              >{isSubscribed[index] ? 'unsubscribe' : 'subscribe'}</CardButton>
              <CardButton
                disabled={searchUser.username === User.username}
                onClick={() => handleClickUserModalButton(searchUser)}
              >Report</CardButton>
              {User.username === 'admin' &&
                <>
                  <CardButton
                    disabled={searchUser.username === User.username}
                    onClick={() => addModerator(searchUser.username)}
                  >Add moderator</CardButton>
                  <CardButton
                    disabled={searchUser.username === User.username}
                    onClick={() => deleteUser(searchUser.username)}
                  >Delete user</CardButton>
                </>
              }
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
              <CardButton
                onClick={() => likedPlaylists.addLikedPlaylist(undefined, { name: playlist.name, username: playlist.username })}
              >Like</CardButton>
              <CardButton
                disabled={playlist.username === User.username}
                onClick={() => handleClickPlaylistModalButton(playlist)}
              >Report</CardButton>
            </CardButtonsContainer>
          </Card>
        ))}
      </ContentContainer>
    </Container>
  );
});
