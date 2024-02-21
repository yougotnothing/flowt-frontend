import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { TITLE } from "../../../constants/styles.const";

export const AccountContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  gap: 10em;

  @media (max-width: 460px) {
    gap: 20px;
    margin-bottom: 146px;
  }
`;

export const Title = styled('div')`
  ${TITLE};
`;

export const UserSettingsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: fixed;
  gap: 24px;

  @media (max-width: 460px) {
    display: none;
  }
`;

export const UserSettings = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: start;
  border-radius: 18px;
  background-color: ${colors.FRONT};
  width: 260px;
  gap: 38px;
  padding: 21px;
`;

export const AContainer = styled('div')`
  color: ${colors.WHITE};
  padding: 5px;
  border-radius: 8px;
  width: max-content;
  
  &:hover {
    background-color: ${colors.VERY_DARK_BLUE};
    color: ${colors.SECONDARY_HOVER};
  }
`;

export const A = styled('a')`
  cursor: pointer;
  border: none;
  text-align: center;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 22px;
  transition: all 0.3s;
  
  &:hover {
    border: 1px solid ${colors.SECONDARY_HOVER};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
`;

export const UserInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 auto;
`;

export const InfoContainer = styled('div')`
  align-self: center;
  height: max-content;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 24px;
  padding: 0 4px 4px 4px;
  text-align: start;

  @media (max-width: 460px) {
    width: 100%;
    gap: 12px;
    padding: 0;
    margin: 0;
  }
`;

export const UserContainer = styled('div')`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 6em;
  align-items: center;
  align-self: start;
  width: 63em;
  padding: 1em;
  border-radius: 18px;
  max-height: 400px;
  z-index: 998;
  background: linear-gradient(135deg, ${colors.DARK_BLUE} 0% , ${colors.AQUAMARINE} 60%, ${colors.SECONDARY_HOVER} 120%);

  @media (max-width: 460px) {
    width: calc(100% - 12px);
    padding: 6px;
    border-radius: 8px;
    gap: 8px;
  }
`;

interface IUserAvatar {
  $isHaveAvatar: boolean | null;
  $avatar: string | null;
}

export const UserAvatar = styled('picture')<IUserAvatar>`
  width: 286px;
  height: 286px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-image: ${props => props.$isHaveAvatar ? `url(${props.$avatar})` : 'url(/defaultAvatar.png)'};

  @media (max-width: 460px) {
    width: 146px;
    height: 146px;
  }
`;

export const UserInfo = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 26px;

  @media (max-width: 460px) {
    gap: 11px;
  }
`;

export const Username = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 70px;
  text-align: start;
  background: none;
  border: none;
  color: ${colors.WHITE};
  overflow: hidden;
  text-overflow: ellipsis;


  @media (max-width: 460px) {
    font-size: 19px;
  }
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 12px;

  @media (max-width: 460px) {
    gap: 8px;
  }
`;

export const Region = styled('div')`
  font-family: 'Urbanist', 'Noto Color Emoji', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 14px;
  }
`;

export const DescriptionContainer = styled('div')`
  display: flex;
  width: 66em;
  min-height: 46px;
  flex-direction: column;
  align-items: start;
  padding: 12px;
  gap: 24px;
  border-bottom: 1px solid ${colors.SECONDARY};

  @media (max-width: 460px) {
    width: calc(100% - 16px);
    min-height: 28px;
    padding: 8px;
    gap: 14px;
  }
`;

export const Description = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 15px;
  }
`;

export const DescriptionTitle = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: ${colors.SECONDARY};

  @media (max-width: 460px) {
    font-size: 22px;
  }
`;

export const Email = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 18px;

  @media (max-width: 460px) {
    font-size: 14px;
  }
`;

export const StatsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: max-content;
  gap: 12px;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    gap: 7px;
  }
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PlaylistContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 26px 0;
  gap: 24px;

  @media (max-width: 460px) {
    margin: 14px 0;
    gap: 11px;
  }
`;

export const NavigationContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  border-bottom: 1px solid ${colors.WHITE};
  gap: 8px;
`;

export const NavigationButton = styled('button')`
  background-color: transparent;
  color: ${colors.WHITE};
`;

interface DroplistProps {
  $isOpen: boolean;
}

export const Droplist = styled('button')<DroplistProps>`
  position: absolute;
  top: 8%;
  left: 93%;
  background-color: transparent;
  border: none;
  background-image: url('/settings.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 42px;
  width: 42px;
  transition: 0.3s ease;
  z-index: 997;
  cursor: pointer;
  padding: 0;

  &::after {
    display: flex;
    content: "";
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-image: url('/cross.png');
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 460px) {
    &::after {
      opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
    }
    background-image: url(${({ $isOpen }) => $isOpen ? 'none' : '/settings.png'});
    top: 0;
    left: initial;
    right: 0px;
    height: 32px;
    width: 32px;
  }
`;

interface IDroplistItemsContainer {
  $isOpen: boolean;
}

export const DroplistItemsContainer = styled('div')<IDroplistItemsContainer>`
  transition: 0.3s ease;
  position: absolute;
  width: 220px;
  background-image: none;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  display: flex;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  flex-direction: column;
  gap: 6px;
  border-radius: 8px;
  padding: 6px;
  align-items: start;
  top: 8%;
  left: 70%;

  @media (max-width: 460px) {
    width: 146px;
    border-radius: 6px;
    top: 30px;
    left: initial;
    right: 5px;
  }
`;

export const DroplistItem = styled('button')<IDroplistItemsContainer>`
  background-color: transparent;
  color: ${colors.WHITE};
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 600;
  border: none;
  transition: 0.3s ease;
  width: 100%;
  height: 32px;
  text-align: start;
  border-radius: 4px;
  cursor: ${props => props.$isOpen ? 'pointer' : 'default'};

  @media (max-width: 460px) {
    font-size: 15px;
    height: 24px;
  }

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY};
  }
`;