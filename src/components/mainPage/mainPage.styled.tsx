import styled from "styled-components";
import { COLORS } from "../../consts/colors.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.background};
`;

export const Navbar = styled('div')`
  background-color: ${COLORS.front};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  border-radius: 0px 0px 20px 20px;
  width: 96vw;

  .form {
    display: flex;
    flex-direction: row;
    margin: auto;
    gap: 20px;
  }
`;

export const Search = styled('input')`
  display: flex;
  align-self: center;
  width: 300px;
  height: 38px;
  border: none;
  border-radius: 12px;
  padding-left: 20px;
  background-color: ${COLORS.input};
  color: #bdbdbd;
  outline: none;
  transition: all 0.5s;

  &::placeholder {
    font-size: 18px;
    font-family: 'Urbanist', sans-serif;
    font-weight: 300;
  }

  &:hover {
    transition: all 0.5s;
    color: white;
    background-color: ${COLORS.inputHover};
  }
`;

export const SearchButton = styled('button')`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background-image: url('/scope.png');
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${COLORS.secondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.secondaryHover};
    transition: all 0.2s;
  }
`;

export const ContentContainer = styled('div')`
  padding-top: 3%;
  display: flex;
  flex-direction: row;
  width: 96%;
  max-height: 78%;
  align-self: center;
  gap: 6%;
`;

export const Button = styled('button')`
  margin: auto;
  font-family: 'Urbanist', sans-serif;
  font-weight: 300;
  background: none;
  background-color: none;
  border: none;
  width: 98px;
  height: 38px;
  color: ${COLORS.firstFont};
  justify-content: center;
  align-self: flex-end;

  &:hover {
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid white;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    color: ${COLORS.firstFontHover};
  }

  .link {
    display: block;
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    color: ${COLORS.firstFont};
    width: 100%;
    height: 100%;

    &:hover {
      color: ${COLORS.firstFontHover};
    }
  }
`;

export const Logo = styled('button')`
  height: 60px;
  width: 164px;
  background: none;
  border: none;
  color: white;
  margin: auto;
  background-image: url('/flowt.png');
  background-size: 100%;
  cursor: pointer;

  .logoLink {
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  margin: auto;
  text-align: center;
  justify-content: center;
  gap: 20px;

  .link {
    text-decoration: none;
    margin: auto;
    font-size: 18px;
    font-family: 'Urbanist', sans-serif;
    font-weight: 300;
    background: none;
    background-color: none;
    border: none;
    width: 78px;
    height: 28px;
    color: ${COLORS.firstFont};
    justify-content: center;
    align-self: flex-end;
  
    &:hover {
      transition: all 0.2s;
      cursor: pointer;
      border: 1px solid white;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      color: ${COLORS.firstFontHover};
    }
  }
`;

export const VerifyedUserContainer = styled('div')`
  display: flex;
  margin: auto;
  gap: 40px;
`;

export const UserButton = styled('button')`
  display: flex;
  flex-direction: row;
  background: none;
  border: none;
  cursor: pointer;
  gap: 20px;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  font-weight: 400;
`;

export const UserAvatar = styled('picture')`
  border-radius: 50%;
  width: 46px;
  height: 46px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const UserNickname = styled('div')`
  margin: auto;
  color: ${COLORS.firstFont}
`;