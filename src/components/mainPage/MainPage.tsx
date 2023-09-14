import React, { useState, useEffect } from "react";
import { Form, Link, Outlet, useNavigate, useLocation, generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import toVerify from "../../consts/toVerify";
import { SongsProvider } from "../../contexts/SongsContext";

import {
  Container,
  Navbar,
  Search, 
  SearchButton, 
  ContentContainer,
  Logo,
  ButtonsContainer, 
  VerifyedUserContainer,
  UserButton,
  UserAvatar,
  UserNickname
} from "./MainPage.styled";
import { AlertSuccess, AlertWarning } from "./alert/Alert";
import { Player } from "./player/Player";
import { api, API_URL, getUser } from "../../api/axiosConfig";
import { PageLoader } from "../loader/pageLoader/PageLoader";

export const MainPage: React.FC = observer(() => {
  let location = useLocation();
  const navigate = useNavigate();
  const[isVisible, setIsVisible] = useState(false);
  const[user, setUser] = useState<any>(null);
  const[avatar, setAvatar] = useState<any>('/defaultAvatar.png');
  const successAlert = localStorage.getItem('success');
  const warningAlert = localStorage.getItem('warning');


  useEffect(() => {
    const getUserAvatar = async () => {
      setAvatar(`${API_URL}/images/user/${user.username}`);
    }
    const currentUrl = location.pathname;

    if(!currentUrl || currentUrl === '/') {
      navigate('/home');
    }
    if (localStorage.getItem('token') !== null) {
      toVerify.alreadyVerify();
      getUser(setUser);
    }
    if (successAlert !== null || warningAlert !== null) {
      setIsVisible(true);
      setTimeout(() => {
        localStorage.removeItem('success');
        localStorage.removeItem('warning');
        setIsVisible(false);
      }, 3000);
    }
    if(user) setAvatar(`${API_URL}/images/user/${user.username}`);
  }, []);

  return (
    <SongsProvider>
      <Container>
        {!user && <PageLoader />}
        {isVisible && successAlert && <AlertSuccess />}
        {isVisible && warningAlert && <AlertWarning />}
        <Navbar>
          <Logo onClick={() => navigate("/home")} />
          <Form className="form" method="post" action={`${API_URL}`}>
            <Search placeholder="search" />
            <SearchButton onClick={() => navigate("/search")} />
          </Form>
          {toVerify.isVerify && user !== null ?
            <VerifyedUserContainer>
              <UserButton
                onClick={() => navigate(generatePath('/profile/:id', { id: user.username }))}
              >
                <UserAvatar style={{backgroundImage: `url(${avatar})`}}/>
                <UserNickname>{user.username}</UserNickname>
              </UserButton>
            </VerifyedUserContainer>
            :
            <ButtonsContainer>
              <Link to={`/login`} className="link">Login</Link>
              <Link to={`/register`} className="link">Register</Link>
            </ButtonsContainer>
          }
        </Navbar>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
        <Player />
      </Container>
    </SongsProvider>
  );
});