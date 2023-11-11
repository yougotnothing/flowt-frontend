import React, { useState, useEffect, useRef } from "react";

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
import { useUserContext } from "../../contexts/UserContext";
import { userAvatarStore, userAvatarStore as avatarStore } from "../../stores/toChangeAvatar";
import { observer } from "mobx-react-lite";
import { searchStore as search } from "../../stores/toSearch";
import { SearchItems } from "./search/SearchItems";
import { searchUsersStore } from "../../stores/toSearchUsers";

export const MainPage: React.FC = observer(() => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const[isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const successAlert = localStorage.getItem('success');
  const warningAlert = localStorage.getItem('warning');
  let location = useLocation();
  const { user } = useUserContext();

  useEffect(() => {
   const currentUrl = location.pathname;
   console.log(searchUsersStore.avatar);

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

  const handleSearch = async (key: any) => {
    if(key.key === 'Enter' || key.code === 'Enter' && search.input.length > 0 && search.songs.length > 0 && search.users.length > 0) {
      await search.all();
      navigate('/search');
      search.setIsOpen(false);
    }else{
      return;
    }
  }

  const handleChange = async (e: any) => {
    if(e.target.value && location.pathname !== '/search') {
      search.setInput(e.target.value.trim());
      await search.all();
      search.setIsOpen(true);
    }
    if(!e.target.value) {
      search.setIsOpen(false);
    }
    if(location.pathname === '/search') {
      search.setIsOpen(false);
    }
  }

  const handleSearchButton = async () => {
    if(search.input.length > 0 && search.songs.length > 0 || search.users.length > 0) {
      await search.all();
      navigate('/search');
    }else{
      return;
    }
  }

  return (
    <Container>
      {isVisible && successAlert && <AlertSuccess />}
      {isVisible && warningAlert && <AlertWarning />}
      <Navbar>
        <NavContainer>
          <Logo onClick={() => navigate('/home')} />
          <div className='form'>
            <Search
              onKeyDown={handleSearch}
              name="search"
              placeholder="search"
              type="text"
              onChange={handleChange}
            />
            <SearchButton onClick={handleSearchButton} />
          </div>
          {user ?
            <VerifiedUserContainer>
              <UserButton
                onClick={() => {
                  searchUsersStore.setUser(user);
                  searchUsersStore.setAvatar(userAvatarStore.avatar);
                  navigate(generatePath('/profile/:id', {id: user.username}))
                }}>
                <UserAvatar style={{ backgroundImage: `url(${avatarStore.avatar})` }}/>
                <UserNickname>{user.username}</UserNickname>
              </UserButton>
            </VerifiedUserContainer>
            :
            <ButtonsContainer>
              <Link to={`/login`} className="link">Login</Link>
              <Link to={`/register`} className="link">Register</Link>
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
