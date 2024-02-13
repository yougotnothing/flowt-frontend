import styled from "styled-components";
import { colors } from "../../constants/colors.const";
import { A_, A_CONTAINER, INPUT } from "../../constants/styles.const";
import { ISongPlaylist } from "../../types/props";
import { API_URL } from "../../api/axiosConfig";

interface ContainerProps {
  $isWelcomePage: boolean;
}

interface NavbarProps {
  $isWelcome: boolean;
}

export const Container = styled('div')<ContainerProps>`
  display: flex;
  position: relative;
  min-height: 100svh;
  z-index: 1000;
  flex-direction: column;
  align-items: center;
  ${({ $isWelcomePage }) => (
    $isWelcomePage 
    ? `background: rgb(174,238,208);
       background: radial-gradient(circle, #93c7afbc 0%, #192430 100%);`
    : `background-color: ${colors.BACKGROUND};`
  )};
`;

export const Navbar = styled('div')<NavbarProps>`
  background-color: ${colors.FRONT};
  display: ${({ $isWelcome }) => $isWelcome ? 'none' : 'flex'};
  flex-direction: row;
  justify-content: space-between;
  height: 64px;
  border-radius: 0 0 20px 20px;
  width: 96vw;
  position: fixed;
  z-index: 999;

  @media (max-width: 460px) {
    height: 55px;
    width: 100svw;
    border-radius: 0px;
  }

  .form {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    gap: 20px;

    @media (max-width: 460px) {
      gap: 6px;
    }
  }
`;

export const Search = styled('input')`
  ${INPUT}

  width: 268px;
  height: 38px;

  @media (max-width: 460px) {  
    width: 164px;
    height: 32px;
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
  background-color: ${colors.SECONDARY};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.SECONDARY_HOVER};
    transition: all 0.2s;
  }

  @media (max-width: 460px) {
    width: 32px;
    height: 32px;
    background-size: 16px;
  }
`;

export const ContentContainer = styled('div')`
  padding-top: 7em;
  display: flex;
  flex-direction: row;
  width: 96%;
  align-self: center;
  gap: 6%;
`;

export const Button = styled('button')`
  margin: auto;
  font-family: 'Urbanist', sans-serif;
  font-weight: 300;
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
  align-self: center;
  height: 50px;
  width: 168px;
  border: none;
  background-color: transparent;
  background-image: url('/flowt.png');
  background-position: center;
  background-size: 134px;
  background-repeat: no-repeat;
  cursor: pointer;

  .logoLink {
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  @media (max-width: 460px) {
    width: 86px;
    height: 32px;
    background-size: 86px;
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
    background-color: transparent;
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

export const VerifiedUserContainer = styled('div')`
  display: flex;
  gap: 40px;
`;

export const UserButton = styled('button')`
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  gap: 20px;
  font-family: 'Raleway', sans-serif;
  font-size: 17px;
  font-weight: 400;
  color: ${colors.DARK_WHITE};
  transition: all 0.3s;

  &:hover {
    color: ${colors.WHITE};
  }
`;

export const UserAvatar = styled('picture')`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const UserNickname = styled('div')`
  margin: auto;
  width: 100px;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;

  @media (max-width: 460px) {
    display: none;
  }
`;

export const GoBackContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: max-content;
  justify-content: end;
`;

export const AContainer = styled('div')`${A_CONTAINER}`;

export const A = styled('a')`${A_}`;

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

  @media (max-width: 460px) {
    width: 96%;
  }
`;

export interface IDroplistProp {
  $isOpen: boolean;
}

export const Droplist = styled('div')<IDroplistProp>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  z-index: 1000;
  margin-top: 5em;
  align-self: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.DARK_BLUE};
  box-shadow: 0 0 12px 1px ${colors.BORDER};
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  padding: 6px;
  max-height: 146px;
  width: 360px;
  overflow-y: auto;
  gap: 4px;
  
  &::-webkit-scrollbar {
    opacity: 0;
  }
`;

export const Item = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.DARK_WHITE};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding: 4px;
  background-color: ${colors.DARK_BLUE};
  width: 350px;
  height: max-content;
  gap: 4px;
`;

export interface IIconProps {
  $type: 'user' | 'song' | 'playlist';
  $song?: ISongPlaylist;
}

export const ItemIcon = styled('img')<IIconProps>`
  width: 84px;
  height: 84px;
  border-radius: ${(props) => (props.$type === 'user' ? '50%' : props.$type === 'song' ? '8px' : '8px')};
  background-size: cover;
  background-image: ${_ => `url(${encodeURI(`${API_URL}/images/song/${_.$song?.author}/${_.$song?.name}`)})`};
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
`;

export const ItemInfo = styled('div')`
  display: flex;
  width: 120px;
  height: 66px;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  padding: 4px;
  border: 1px solid ${colors.DARK_WHITE};
  background-color: ${colors.VERY_DARK_BLUE};
  border-top-width: 0;
  border-right-width: 0;
  border-bottom-width: 0;
`;

export const Text = styled('span')`
  font-family: 'Urbanist', 'Noto Color Emoji', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${colors.DARK_WHITE};
`;

export const StatsContainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ListensIcon = styled('picture')`
  width: 16px;
  height: 16px;
  background-image: url("/play.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const StateContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 60px;
  height: 16px;
  gap: 4px;
`;

export const LikesIcon = styled('picture')`
  width: 16px;
  height: 16px;
  background-image: url("/like.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const BigText = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.WHITE};
`;

export const ItemButton = styled('button')`
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  text-align: center;
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.WHITE};
  margin: auto 0 auto auto;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    border-color: ${colors.AQUAMARINE};
    box-shadow: 0 0 8px 2px ${colors.AQUAMARINE};
    background-color: ${colors.AQUAMARINE};
  }
`;