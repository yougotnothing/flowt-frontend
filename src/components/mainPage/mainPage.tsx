import { useState, useEffect } from "react";
import { Form, Link, Outlet, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Container, Navbar, Search, SearchButton, ContentContainer, Logo, Settings, ButtonsContainer } from "./mainPage.styled";

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const[main, setMain] = useState(true);
    const client = new QueryClient();

    useEffect(() => {
      if(main) {
        navigate("/home");
        setMain(false);
      }  
    }, []);

    return (
      <Container>
        <Navbar>
          <Logo>
            <Link to={`/home`} className="logoLink">FLOWT</Link>
          </Logo>
          <Form className="form" method="post" action="/search">
            <Search placeholder="search" />
            <SearchButton>
              <Link to={`/search`} />
            </SearchButton>
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