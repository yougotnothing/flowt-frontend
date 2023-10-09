import React, { useState, useEffect } from "react";
import { Form, Link, Outlet, useNavigate, useLocation, generatePath } from "react-router-dom";

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
import { API_URL } from "../../api/axiosConfig";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { useUserContext } from "../../contexts/UserContext";
import { userUsernameStore } from "../../store/toChangeUsername";
import { userAvatarStore } from "../../store/toChangeAvatar";

export const MainPage: React.FC = () => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const[isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const successAlert = localStorage.getItem('success');
  const warningAlert = localStorage.getItem('warning');
  const { user } = useUserContext();
  let location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname;

    if(!currentUrl || currentUrl === '/') {
      navigate('/home');
    }

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

  return (
    <Container>
      {isVisible && successAlert && <AlertSuccess />}
      {isVisible && warningAlert && <AlertWarning />}
      <Navbar>
        <Logo onClick={() => navigate("/home")} />
        <Form className="form" method="post" action={`${API_URL}`}>
          <Search placeholder="search" />
          <SearchButton onClick={() => navigate("/search")} />
        </Form>
        {user ?
          <VerifyedUserContainer>
            <UserButton
              onClick={() => navigate(generatePath('/profile/:id', {id: user.username}))}>
              <UserAvatar style={{backgroundImage: `url(${userAvatarStore.avatar})`}}/>
              <UserNickname>{userUsernameStore.username}</UserNickname>
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
        {isLoading ? <PageLoader /> : <Outlet />}
      </ContentContainer>
      <Player />
    </Container>
  );
};
