import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation, generatePath } from "react-router-dom";

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
  UserNickname,
  NavContainer
} from "./MainPage.styled";
import { AlertSuccess, AlertWarning } from "./alert/Alert";
import { Player } from "./player/Player";
import { PageLoader } from "../loader/pageLoader/PageLoader";
import { useUserContext } from "../../contexts/UserContext";
import { userAvatarStore as avatarStore } from "../../stores/toChangeAvatar";
import { observer } from "mobx-react-lite";
import { URLS } from "../../constants/urls.const";
import { useFormik } from "formik";
import { searchSchema } from "../../validation/yup.config";
import { api } from "../../api/axiosConfig";
import { searchStore as search } from "../../stores/toSearch";

export const MainPage: React.FC = observer(() => {
  const[isVisible, setIsVisible] = useState<boolean>(false);
  const[isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const successAlert = localStorage.getItem('success');
  const warningAlert = localStorage.getItem('warning');
  let location = useLocation();
  const url = new URLS();
  const { user } = useUserContext();

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

  const formik = useFormik<{
    search: string,
  }>({
    initialValues: {
      search: ""
    },
    validationSchema: searchSchema,
    onSubmit: () => {}
  });

  const handleSearch = (event: any) => {
    if(event.key === 'Enter') {
      search.all(formik.values.search);
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
              onChange={formik.handleChange}
            />
            <SearchButton onClick={() => {
              search.all(formik.values.search);
              navigate('/search');
            }} />
          </div>
          {user ?
            <VerifyedUserContainer>
              <UserButton
                onClick={() => navigate(generatePath('/profile/:id', {id: user.username}))}>
                <UserAvatar style={{ backgroundImage: `url(${avatarStore.avatar})` }}/>
                <UserNickname>{user.username}</UserNickname>
              </UserButton>
            </VerifyedUserContainer>
            :
            <ButtonsContainer>
              <Link to={`/login`} className="link">Login</Link>
              <Link to={`/register`} className="link">Register</Link>
            </ButtonsContainer>
          }
        </NavContainer>
      </Navbar>
      <ContentContainer>
        {isLoading ? <PageLoader /> : <Outlet />}
      </ContentContainer>
      <Player />
    </Container>
  );
});
