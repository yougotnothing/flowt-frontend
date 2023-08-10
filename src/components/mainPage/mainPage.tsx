import { useState } from "react";
import { Form, Link, Outlet } from "react-router-dom";
import { Container, Navbar, Search, SearchButton, ContentContainer, Button, Logo, ButtonsContainer } from "./mainPage.styled";

export const MainPage: React.FC = () => {
    return (
      <Container>
        <Navbar>
          <Logo>logo</Logo>
          <Form className="form" method="post" action="/search">
            <Search placeholder="search" />
            <SearchButton>
              <Link to={`/search`} />
            </SearchButton>
          </Form>
          <ButtonsContainer>
            <Link to={`/login`} className="link">Login</Link>
            <Link to={`/register`} className="link">Register</Link>
          </ButtonsContainer>
        </Navbar>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Container>
    );
};