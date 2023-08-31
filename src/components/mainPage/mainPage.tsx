import { useState, useEffect } from "react";
import { Form, Link, Outlet, useNavigate, useLocation, generatePath } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";

import toVerify from "../../consts/toVerify";

import { 
  Container,
  Navbar,
  Search, 
  SearchButton, 
  ContentContainer, 
  Logo,
  ButtonsContainer, 
  VerifyedUserContainer,
  UserAvatar, 
  UserButton,
  UserNickname
} from "./mainPage.styled";
import { AlertSuccess, AlertWarning } from "./alert/alert";
import { api, API_URL } from "../../api/axiosConfig";

export const MainPage: React.FC = observer(() => {
    let location = useLocation();
    const navigate = useNavigate();
    const[isVisible, setIsVisible] = useState(false);
    const[user, setUser] = useState<any>(null);
    const client = new QueryClient();
    const successAlert = localStorage.getItem('success');
    const warningAlert = localStorage.getItem('warning');
    let URLToUser: string;

    if (user !== null) {
      URLToUser = generatePath('/profile/:id', { id: user.username });
    } else {
      URLToUser = '';
    }

    const getUser = async () => {
      const response = await api.get('/users/authenticated');
      setUser(response.data);
      if(response.status === 401) {
        window.location.reload();
      }
    };

    useEffect(() => {
      const currentUrl = location.pathname;
      if(!currentUrl || currentUrl === '/') {
        navigate('/home');
      }
      if (localStorage.getItem('token') !== null) {
        toVerify.alreadyVerify();
        getUser();
      }
    }, []);

    useEffect(() => {
      if (successAlert !== null || warningAlert !== null) {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          localStorage.removeItem('success');
          localStorage.removeItem('warning');
          setIsVisible(false);
        }, 3000);
      }
    });

    return (
      <Container>
        { isVisible && successAlert && <AlertSuccess /> }
        { isVisible && warningAlert && <AlertWarning /> }
        <Navbar>
          <Logo onClick={() => navigate("/home")} />
          <Form className="form" method="post" action="/search">
            <Search placeholder="search" />
            <SearchButton onClick={() => navigate("/search")} />
          </Form>
          { toVerify.isVerify && user !== null ?
            <VerifyedUserContainer>
              <UserButton
                onClick={() => navigate(URLToUser)}
              >
                <UserAvatar style={{
                  backgroundImage: `url(${API_URL}/images/user/${user.username})`,
                }} />
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
          <QueryClientProvider client={client}>
            <Outlet />
          </QueryClientProvider>
        </ContentContainer>
      </Container>
    );
});