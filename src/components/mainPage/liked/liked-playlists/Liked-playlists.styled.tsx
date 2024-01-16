import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { IPlaylist } from "../../../../types/props";
import { API_URL } from "../../../../api/axiosConfig";
import { BUTTON } from "../../../../constants/styles.const";

interface IPlaylistIcon {
  $playlist: IPlaylist;
}

interface ITextButton {
  $type: 'name' | 'author';
}

interface ILikeButton {
  $isLiked: boolean;
}

export const Header = styled('div')`
  font-weight: 800;
  font-size: 28px;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 26px;
  width: 1200px;
  margin: 0 auto;
`;

export const PlaylistsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
`;

export const Border = styled('div')`
  border-bottom: 2px solid white;
  width: 100%;
`;

export const Playlist = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 12px;
  width: 1184px;
  background-image: linear-gradient(45deg, ${colors.BORDER} 0%, ${colors.SECONDARY} 120%);
`;

export const PlaylistIcon = styled('picture')<IPlaylistIcon>`
  width: 240px;
  height: 240px;
  background-size: cover;
  background-image: ${p => `url(${API_URL}/images/playlist/${p.$playlist.username}/${p.$playlist.name})`};
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
`;

export const DataContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const TextButton = styled('button')<ITextButton>`
  color: ${colors.WHITE};
  font-size: ${p => p.$type === 'name' ? '36px' : '18px'};
  font-weight: ${p => p.$type === 'name' ? '800' : '600'};
  font-family: ${p => p.$type === 'name' ? 'Raleway' : 'Urbanist'}, sans-serif;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const TextButtonsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

export const ManagementButtonsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const ManagementButton = styled('button')`
  height: 32px;
  width: 146px;
  ${BUTTON}
`;

export const LikeButton = styled('button')<ILikeButton>`
  border-radius: 6px;
  border: 2px solid ${colors.BORDER};
  background-color: ${colors.DARK_BLUE};
  background-image: ${p => p.$isLiked ? 'url(/like_hover.png)' : 'url(/like.png)'};
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  height: 32px;
  width: 32px;
  transition: 0.3s ease;

  &:hover {
    background-image: ${p => p.$isLiked ? 'url(/like.png)' : 'url(/like_hover.png)'};
    background-color: ${colors.BORDER};
  }
`;

