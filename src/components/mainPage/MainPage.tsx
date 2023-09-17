import React, { useState, useEffect } from "react";
import { Form, Link, Outlet, useNavigate, useLocation, generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import toVerify from "../../consts/toVerify";
import { Context } from "../../contexts/Context";

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
import { useContextValues } from "../../contexts/Context";

export const MainPage: React.FC = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const[isVisible, setIsVisible] = useState(false);
  const { userAvatar, user } = useContextValues();
  const successAlert = localStorage.getItem('success');
  const warningAlert = localStorage.getItem('warning');

  useEffect(() => {
    const currentUrl = location.pathname;

    if(!currentUrl || currentUrl === '/') {
      navigate('/home');
    }
    if (successAlert !== null || warningAlert !== null) {
      setIsVisible(true);
      setTimeout(() => {
        localStorage.removeItem('success');
        localStorage.removeItem('warning');
        setIsVisible(false);
      }, 3000);
    }
  }, []);

  return (
    <Context>
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
          {user ?
            <VerifyedUserContainer>
              <UserButton
                onClick={() => navigate(generatePath('/profile/:id', {id: user.username}))}>
                <UserAvatar style={{backgroundImage: `url(${userAvatar})`}}/>
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
    </Context>
  );
};