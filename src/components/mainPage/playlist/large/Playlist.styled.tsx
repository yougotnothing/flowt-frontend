import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { API_URL } from "../../../../api/axiosConfig";
import { BUTTON } from "../../../../constants/styles.const";

interface IPlaylistIconProps {
  $name: string | null;
  $username: string | null;
}

interface IPlaylistContainerProps {
  $isEditing?: boolean;
}

interface IPlaylistInfoProps {
  $type: 'name' | 'username';
}

interface IPlaylistDroplist {
  $isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    display: none;
    opacity: 0;
  }
  to {
    display: flex;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    display: flex;
    opacity: 1;
  }
  to {
    display: none;
    opacity: 0;
  }
`;

export const ContentContainer = styled('div')`
  display: flex;
  width: 1200px;
  margin: 0 auto;
`;

export const Container = styled('div')<IPlaylistContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
  width: ${props => props.$isEditing ? '1180px' : '80%'};
  background-color: ${colors.FRONT};
  border-radius: 8px;
  border: 2px solid ${colors.BORDER};
`;

export const PlaylistIcon = styled('picture')<IPlaylistIconProps & IPlaylistContainerProps>`
  width: ${props => props.$isEditing ? '320px' : '220px'};
  height: ${props => props.$isEditing ? '320px' : '220px'};
  border-radius: 6px;
  background-image: ${props => `url(${API_URL}/images/playlist/${props.$username}/${props.$name})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const PlaylistInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  border-left: 1px solid ${colors.BORDER};
  border-radius: 0 6px 6px 0;
  height: 160px;
  width: 240px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const PlaylistInfo = styled('button')<IPlaylistInfoProps>`
  background-color: transparent;
  color: ${colors.WHITE};
  font-size: ${props => props.$type === 'name' ? '28px' : '22px'};
  font-weight: ${props => props.$type === 'name' ? '800' : '600'};
  font-family: ${props => props.$type === 'name' ? 'Raleway' : 'Urbanist'}, sans-serif;
  border: none;
  width: 100%;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const PlaylistButton = styled('button')`
  ${BUTTON};

  margin: auto 24px auto auto;
  width: 140px;
  height: 34px;
`;

export const PlaylistDroplist = styled('div')<IPlaylistDroplist>`
  display: ${p => p.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: start;
  background-color: ${colors.VERY_DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
  position: absolute;
  left: 71%;
  opacity: ${p => p.$isOpen ? '1' : '0'};
  animation: ${p => p.$isOpen ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
`;

export const PlaylistItem = styled('button')`
  width: 168px;
  height: 32px;
  text-align: start;
  border: none !important;
  
  ${BUTTON}
`;

export const Header = styled('div')`
  font-size: 26px;
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};
`;