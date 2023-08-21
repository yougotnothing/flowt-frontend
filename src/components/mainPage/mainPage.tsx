import { useState, useEffect } from "react";
import { Form, Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Container, Navbar, Search, SearchButton, ContentContainer, Logo, Settings, ButtonsContainer } from "./mainPage.styled";
import { AlertSuccess, AlertWarning } from "./alert/alert";

export const MainPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const[isVisible, setIsVisible] = useState(false);
    const client = new QueryClient();
    const successAlert = localStorage.getItem('success');
    const warningAlert = localStorage.getItem('warning');

    useEffect(() => {
      if(successAlert !== null || warningAlert !== null) {
        setIsVisible(true);
        setTimeout(() => {
          localStorage.removeItem('success');
          localStorage.removeItem('warning');
          setIsVisible(false);
        }, 3000);
      }
    }, []);
     
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
          <ButtonsContainer>
            <Link to={`/login`} className="link">Login</Link>
            <Link to={`/register`} className="link">Register</Link>
            <Settings></Settings>
          </ButtonsContainer>
        </Navbar>
        <ContentContainer>
          <QueryClientProvider client={client}>
            <Outlet />
          </QueryClientProvider>
        </ContentContainer>
      </Container>
    );
};