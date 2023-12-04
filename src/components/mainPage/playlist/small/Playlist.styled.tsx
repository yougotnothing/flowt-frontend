import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { API_URL } from "../../../../api/axiosConfig";

export interface IPlaylistProps {
  $type: 'username' | 'playlist name';
}

interface IPlaylistAvatarProps {
  $username: string | null;
  $name: string;
}

export const Container = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  height: 220px;
  border: 1px solid ${colors.BORDER};
  background-color: ${colors.DARK_BLUE};
  border-radius: 8px;
  cursor: pointer;
  color: ${colors.DARK_WHITE};
  transition: .3s ease;

  &:hover {
    background-color: ${colors.VERY_DARK_BLUE};
    color: ${colors.WHITE};
  }
`;

export const PlaylistImage = styled('picture')<IPlaylistAvatarProps>`
  width: 140px;
  height: 140px;
  border-radius: 4px;
  background-image: ${props => props.$name && props.$username && `url(${API_URL}/images/playlist/${props.$username}/${props.$name})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const InfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Info = styled('div')<IPlaylistProps>`
  font-family: 'Urbanist', sans-serif;
  font-size: ${props => props.$type === 'username' ? '16px' : '18px'};
  font-weight: ${props => props.$type === 'username' ? '400' : '600'};
`;