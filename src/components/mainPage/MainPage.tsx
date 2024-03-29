import React, { useState, useEffect, FC } from "react";

import { Link, Outlet, useNavigate, useLocation, generatePath } from "react-router-dom";
import {
  Container,
  Navbar,
  Search,
  SearchButton,
  ContentContainer,
  Logo,
  ButtonsContainer,
  VerifiedUserContainer,
  UserButton,
  UserAvatar,
  UserNickname,
  NavContainer
} from "./MainPage.styled";
import { AlertSuccess, AlertWarning } from "./alert/Alert";
import { Player } from "./player/Player";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { observer } from "mobx-react-lite";
import { searchStore as search } from "../../stores/toSearch.mobx";
import { SearchItems } from "./search/SearchItems";
import { searchUsersStore } from "../../stores/toSearchUsers.mobx";
import { Modal as AddToPlaylistModal } from "../modal/add-to-playlist/Modal";
import { Modal as ReportModal } from "../modal/report/Modal";
import { user } from "../../stores/toUser.mobx";
import { userAvatarStore } from "../../stores/toChangeAvatar.mobx";
import { ChangePlaylistAvatar } from "../modal/change-playlist-avatar/Change-playlist-avatar";
import { DeletePlaylistModal } from "../modal/delete-playlist/Delete-Playlist";
import { ChangePlaylistName } from "../modal/change-playlist-name/Change-playlist-name";
import { LinksModal } from "../modal/links/Links";
import { ChangePasswordModal } from "../modal/change-password/Change-password";
import { RestorePasswordModal } from "../modal/restore-password/RestorePassword";
import { DeleteSongModal } from "../modal/delete-song/Delete-song";

export const MainPage: FC = observer(() => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const[isLoading, setIsLoading] = useState<boolean>(true);
  const[isWelcomePage, setIsWelcomePage] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const successAlert = localStorage.getItem('success');
  const warningAlert = localStorage.getItem('warning');
  const googleAvatar = localStorage.getItem('Google image');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(!user.userHaveAvatar && googleAvatar) {
      userAvatarStore.setAvatar(googleAvatar);
      user.postGoogleAvatar(googleAvatar);
    }else{
      localStorage.removeItem('Google image');
    }
  }, [googleAvatar, user.userHaveAvatar]);

  useEffect(() => {
    user.login();
    user.getFollowers();
    user.getSubscribes();
    searchUsersStore.setUser(user.user);
    const currentUrl = location.pathname;

    if(!currentUrl || currentUrl === '/') navigate('/home');

    if(successAlert !== null || warningAlert !== null) {
      setIsVisible(true);
      setTimeout(() => {
        localStorage.removeItem('success');
        localStorage.removeItem('warning');
        setIsVisible(false);
      }, 3000);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(!token && (location.pathname === '/' || location.pathname === '/home')) {
      navigate('/welcome');
      console.log(location.pathname);
    }else return;
  }, [location.pathname, token]);

  const handleSearch = async (key: any) => {
    const isDataNull = (search.songs.length > 0  || search.users.length > 0 || search.playlists.length > 0);
    if(search.input.length > 0 && isDataNull) {
      if(key.key === 'Enter') {
        await search.all('main page');
        navigate('/search');
      }
    }else return;
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value && location.pathname !== '/search') {
      search.setInput(e.target.value.trim());
      await search.all('main page');
      search.setIsOpen(true);
    }
    if(!e.target.value) {
      search.setIsOpen(false);
    }

    if(location.pathname === '/search') {
      search.setIsOpen(false);
    }
  }

  const handleSearchButton = async (key?: any) => {
    const isDataNull = (search.songs.length > 0  || search.users.length > 0 || search.playlists.length > 0);
    if(search.input.length > 0 && isDataNull) {
      await search.all('main page');
      navigate('/search');
    }else return;
  }

  useEffect(() => {
    if(location.pathname !== '/welcome') {
      setIsWelcomePage(false);
    }else setIsWelcomePage(true);
  }, [location.pathname]);

  return (
    <Container $isWelcomePage={isWelcomePage}>
      <ChangePlaylistName />
      <DeletePlaylistModal />
      <ChangePlaylistAvatar />
      <AddToPlaylistModal />
      <ReportModal />
      <LinksModal />
      <ChangePasswordModal />
      <RestorePasswordModal />
      <DeleteSongModal />
      {isVisible && successAlert && <AlertSuccess />}
      {isVisible && warningAlert && <AlertWarning />}
      <Navbar $isWelcome={isWelcomePage}>
        <NavContainer>
          <Logo onClick={() => navigate('/home')} />
          <div className='form'>
            <Search
              className="search-input"
              name="search"
              onKeyDown={handleSearch}
              placeholder="search"
              onChange={handleChange}
            />
            <SearchButton className="search-button" onClick={handleSearchButton} />
          </div>
          {user.isUserAuthenticated ?
            <VerifiedUserContainer>
              <UserButton
                onClick={() => {
                  searchUsersStore.setUser(user.user);
                  searchUsersStore.setAvatar(user.avatar);
                  navigate(generatePath('/profile/:id', { id: user.username }));
                }}>
                <UserAvatar style={{backgroundImage: `url(${user.userHaveAvatar ? user.avatar : '/defaultAvatar.png'})`}} />
                <UserNickname>{user.username}</UserNickname>
              </UserButton>
            </VerifiedUserContainer>
            :
            <ButtonsContainer>
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="link">Register</Link>
              <Link to="/login" className="link-mobile">Sign up</Link>
            </ButtonsContainer>
          }
        </NavContainer>
      </Navbar>
      <SearchItems />
      <ContentContainer>
        {isLoading ? <PageLoader /> : <Outlet />}
      </ContentContainer>
      <Player />
    </Container>
  );
});