import { render } from "@testing-library/react";
import { useState } from "react";
import { Form, Link, Outlet, redirect } from "react-router-dom";
import { Home } from "./home/home";
import { Container, Navbar, Search, SearchButton, ContentContainer, Logo, Settings, ButtonsContainer } from "./mainPage.styled";

export const MainPage: React.FC = () => {
  let [main, setMain] = useState(true);

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
          <Outlet />
        </ContentContainer>
      </Container>
    );
};