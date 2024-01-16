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
  CardButton
} from "./Search.styled";
import filters from "../../../json/filters.json";
import { searchStore as search } from "../../../stores/toSearch.mobx";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { modalStore as modal } from "../../../stores/toModal.mobx";
import { playlistsStore as playlists } from "../../../stores/toPlaylists.mobx";
import { reportStore } from "../../../stores/toReport.mobx";
import { user as User } from "../../../stores/toUser.mobx";
import { 
  handleCardClick, 
  handleClickPlaylistModalButton,
  handleClickSongModalButton,
  handleClickUserModalButton,
  handleMouseEnter,
  handleMouseLeave,
  handleSubscribe
} from "./functions";
import { addModerator, getUser, deleteUser } from "../../admin/functions";
import { likedPlaylists } from "../../../stores/toLiked-playlists.mobx";

export const Search: FC = observer(() => {
  const[isOpenSongs, setIsOpenSongs] = useState<boolean[]>(Array(search.songs.length).fill(false));
  const[isOpenUsers, setIsOpenUsers] = useState<boolean[]>(Array(search.users.length).fill(false));
  const[isOpenPlaylists, setIsOpenPlaylists] = useState<boolean[]>(Array(search.playlists.length).fill(false));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/search') {
      search.setIsOpen(false);
      reportStore.setIsOpen(false);
    }
  }, [location.pathname]);

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
                disabled={searchUser.username === User.username ? true : false}
                onClick={() => handleSubscribe(searchUser.username)}
              >Subscribe</CardButton>
              <CardButton
                disabled={searchUser.username === User.username ? true : false}
                onClick={() => handleClickUserModalButton(searchUser)}
              >Report</CardButton>
              {User.username === 'admin' &&
                <>
                  <CardButton
                    disabled={searchUser.username === User.username ? true : false}
                    onClick={() => addModerator(searchUser.username)}
                  >Add moderator</CardButton>
                  <CardButton
                    disabled={searchUser.username === User.username ? true : false}
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
                // onClick={() => likedPlaylists.addLikedPlaylist(playlist)}
              >Like</CardButton>
              <CardButton
                disabled={playlist.username === User.username ? true : false}
                // onClick={() => handleClickPlaylistModalButton(author)}
              >Report</CardButton>
            </CardButtonsContainer>
          </Card>
        ))}
      </ContentContainer>
    </Container>
  );
});