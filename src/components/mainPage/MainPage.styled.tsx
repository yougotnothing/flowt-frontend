import styled from "styled-components";
import { colors } from "../../constants/colors.const";
import { A_, A_CONTAINER, INPUT, BUTTON } from "../../constants/styles.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  background-color: ${colors.BACKGROUND};
`;

export const Navbar = styled('div')`
  background-color: ${colors.FRONT};
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
  ${INPUT};

  width: 300px;
  height: 38px;
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
  background-color: ${colors.SECONDARY};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.SECONDARY_HOVER};
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
  background-color: transparent;
  border: none;
  width: 98px;
  height: 38px;
  color: ${colors.DARK_WHITE};
  justify-content: center;
  align-self: flex-end;

  &:hover {
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid ${colors.WHITE};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    color: ${colors.WHITE};
  }

  .link {
    display: block;
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    color: ${colors.DARK_WHITE};
    width: 100%;
    height: 100%;

    &:hover {
      color: ${colors.WHITE};
    }
  }
`;

export const Logo = styled('button')`
  height: 60px;
  width: 164px;
  background: none;
  border: none;
  color: white;
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
    color: ${colors.DARK_WHITE};
    justify-content: center;
    align-self: flex-end;
  
    &:hover {
      transition: all 0.2s;
      cursor: pointer;
      border: 1px solid white;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      color: ${colors.DARK_WHITE};
    }
  }
`;

export const VerifyedUserContainer = styled('div')`
  display: flex;
  gap: 40px;
`;

export const UserButton = styled('button')`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  gap: 20px;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${colors.DARK_WHITE};
  transition: all 0.3s;

  &:hover {
    color: ${colors.WHITE};
  }
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
`;

export const GoBackContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: max-content;
  justify-content: end;
`;

export const AContainer = styled('div')`${A_CONTAINER};`;

export const A = styled('a')`${A_};`;

export const GlobalContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NavContainer = styled('div')`
  width: 1200px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: auto;
`;

export interface IDroplistProp {
  $isOpen: boolean;
}

export const Droplist = styled('div')<IDroplistProp>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  width: 320px;
  position: absolute;
  margin-top: 5em;
  align-self: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.FRONT};
  border: 1px solid ${colors.GREY};
  border-radius: 12px;
  padding: 6px;
  max-height: 146px;
  overflow-y: auto;
  gap: 4px;
  cursor: pointer;
  
  &::-webkit-scrollbar {
    opacity: 0;
  }
`;

export const Item = styled('button')`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.BORDER};
  border-radius: 8px;
  background-color: ${colors.FRONT};
  width: 320px;
  height: max-content;
`;

export const ItemIcon = styled('picture')`
  width: 84px;
  height: 84px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const ItemInfo = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  padding: 4px;
`;

export const Text = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.WHITE};
`;