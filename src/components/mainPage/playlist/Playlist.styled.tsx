import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON, INPUT } from "../../../constants/styles.const";

interface IIconProps {
  $isApply: boolean;
  $avatar: any;
}

interface IPlaylistProps {
  $type: 'username' | 'name' | 'description';
  $isNull: boolean;
}

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  gap: 24px;
`;

export const Header = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const PlaylistContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  background-image: linear-gradient(${colors.BORDER} -30%, ${colors.DARK_BLUE} 100%);
  border-radius: 14px;
  padding: 16px;
  width: 1168px;
`;

export const CreatePlaylist = styled('button')`
  ${BUTTON};
  width: 124px;
  height: 36px;
  margin: auto 46px auto auto;
`;

export const Navbar = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  background-color: ${colors.FRONT};
  border: 1px solid ${colors.BORDER};
  border-radius: 8px;
  width: 1190px;
  padding: 4px;
`;

interface INavItem {
  $isCurrentSetting: boolean;
}

export const NavItem = styled('button')`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};

  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const NavItemContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const PlaylistIcon = styled('label')<IIconProps>`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 6px;
  background-image: url(${props => props.$avatar});
  background-size: ${p => p.$isApply ? 'cover' : '64px'};
  background-color: ${p => p.$isApply ? 'transparent' : 'rgba(0, 0, 0, 0.2)'};
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: transparent;
  }
  
  &::after {
    content: ${p => p.$isApply ? '"Select another"' : '"Select avatar"'};
    transition: 0.3s;
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    color: transparent;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 6px;
    font-weight: 600;
    font-family: 'Urbanist', sans-serif;
  }

  &:hover::after {
    color: ${colors.WHITE};
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export const Input = styled('input')`
  display: none;
`;

export const InfoContainer = styled('div')`
  height: 200px;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: space-around;
`;

export const PrivacySettings = styled('span')`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const IsPrivateField = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 32px;
  width: 80px;
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.SECONDARY};
  border: 1px solid ${colors.SECONDARY};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  background-color: transparent;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${colors.SECONDARY_HOVER};
    border-color: ${colors.SECONDARY_HOVER};
  }
`;

export const PlaylistInfo = styled('input')<IPlaylistProps>`
  background-color: transparent;
  outline: none;
  border: ${props => props.$isNull ? `1px solid ${colors.WHITE}` : 'none'};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  font-family: ${p => p.$type !== 'name' ? 'Urbanist' : 'Raleway'}, sans-serif;
  font-weight: ${p => p.$type === 'username' ? '400' : p.$type === 'description' ? '600' : '800'};
  font-size: ${p => p.$type === 'name' ? '32px' : p.$type === 'username' ? '18px' : '16px'};
  color: ${p => p.$type !== 'name' ? colors.DARK_WHITE : colors.WHITE};

  &:placeholder {
    content: ${p => p.$type === 'name' ? 'Name' : 'Description'};
    opacity: 1;
  }
`;

export const CreatorName = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${colors.WHITE};
`;

export const InputContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: row;
  align-self: end;
`;

export const SearchSongs = styled('input')`
  width: 236px;
  height: 34px;
  outline: none;
  color: ${colors.WHITE};
  font-size: 16px;
  font-weight: 400;
  font-family: 'Urbanist', sans-serif;
  padding-left: 12px;
  background-color: ${colors.DARK_BLUE};
  border: 1px solid ${colors.BORDER};
  border-radius: 6px 0 0 6px;
  transition: 0.3s;
  border-right-width: 0;

  &:focus {
    + .addSongs {
      border-color: ${colors.SECONDARY};
      background-color: ${colors.SECONDARY};
      
      &:hover {
        background-color: ${colors.BORDER};
        border-color: ${colors.BORDER};
      }
    }
    border-color: ${colors.SECONDARY};
  }
`;

export const AddSongs = styled('button')`
  height: 38px;
  width: 38px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 16px;
  background-color: ${colors.BORDER};
  background-image: url("/scope.png");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  color: ${colors.WHITE};
  border: 1px solid ${colors.BORDER};
  border-left-width: 0;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.SECONDARY};
    border-color: ${colors.SECONDARY};
  }
`;

export const SearchSongsContainer = styled('div')`
  width: 1176px;
  display: flex;
  align-self: center;
  position: relative;
  flex-direction: column;
  align-items: center;
  border-radius: 14px;
  padding: 12px;
  gap: 12px;
`;

export const SearchSongsNav = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.BORDER};
  gap: 6px;
  padding-bottom: 6px;
`;

export const Song = styled('div')`
  border: none;
  background-color: transparent;
  position: relative;
  display: flex;
  width: 98%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  border-radius: 6px;
  transition: 0.3s;
  cursor: pointer;
  z-index: 998;
  margin-bottom: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const SongContainer = styled('div')`
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 100%;
`;

export const SongContainerText = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  border-bottom: 1px solid ${colors.BORDER};
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 4px;
  color: ${colors.WHITE};
`;

export const SongIcon = styled('picture')`
  height: 124px;
  width: 124px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const SongInfo = styled('button')`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.WHITE};
  font-size: 16px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  transition: 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  
  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const SongStats = styled('div')`
  color: ${colors.DARK_WHITE};
  font-size: 16px;
  font-weight: 400;
  margin-right: 6px;
  font-family: 'Raleway', sans-serif;
`;

export const SongStatsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  z-index: 1000;
`;

export const SongMainInfo = styled('div')`
  display: flex;
  width: 202px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 44px;
  padding: 4px;
  border-left: 1px solid ${colors.BORDER};
  border-radius: 0 6px 6px 0;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

export const AddSong = styled('button')`
  ${BUTTON};
  width: 80px;
  height: 34px;
`;

export const PlaylistOptionsButton = styled('button')`
  width: 34px;
  height: 34px;
  background-size: cover;
  background-image: url('/settings.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  z-index: 999;
  position: absolute;
  left: 1158px;
  top: 6px;
  cursor: pointer;
`;

interface IPlaylistOptionsContainer {
  $isOpen: boolean;
}

export const PlaylistOptionsContainer = styled('div')<IPlaylistOptionsContainer>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  border: 2px solid ${colors.BORDER};
  background-color: ${colors.VERY_DARK_BLUE};
  border-radius: 12px;
  padding: 4px;
  gap: 6px;
  position: absolute;
  left: 1026px;
  top: 42px;
`;

export const PlaylistOption = styled('button')`
  width: 146px;
  height: 32px;
  ${BUTTON}
`;