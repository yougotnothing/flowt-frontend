import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { API_URL } from "../../../../api/axiosConfig";
import { BUTTON } from "../../../../constants/styles.const";
import { IPlaylist } from "../../../../types/props";
import { ISongData } from "../../../../types/types";

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
  flex-direction: column;
  gap: 24px;
  width: 1200px;
  margin: 0 auto;

  @media (max-width: 460px) {
    width: 96%;
    margin: 0;
  }
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
  position: relative;

  @media (max-width: 460px) {
    padding: 5px;
    width: 96%;
  }
`;

export const PlaylistIcon = styled('picture')<IPlaylistIconProps & IPlaylistContainerProps>`
  width: ${props => props.$isEditing ? '320px' : '220px'};
  height: ${props => props.$isEditing ? '320px' : '220px'};
  border-radius: 6px;
  background-image: ${props => `url(${encodeURI(`${API_URL}/images/playlist/${props.$username}/${props.$name}`)})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 460px) {
    width: ${({ $isEditing }) => $isEditing ? '96px' : '78px'};
    height: ${({ $isEditing }) => $isEditing ? '96px' : '78px'};
    border-radius: 5px;
  }
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

  @media (max-width: 460px) {
    height: 60px;
    justify-content: space-evenly;
    width: 100px;
  }
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

  @media (max-width: 460px) {
    font-size: ${({ $type }) => $type === 'name' ? '16px' : '13px'};
  }

  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const PlaylistButton = styled('button')`
  ${BUTTON};

  margin: auto 24px auto auto;
  width: 140px;
  height: 34px;

  @media (max-width: 460px) {
    width: 84px;
    height: 28px;
    font-size: 14px;
    margin: auto 0 auto auto;
  }
`;

export const PlaylistButtonsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-self: center;
  gap: 24px;
  margin: auto 0 auto auto;

  @media (max-width: 460px) {
    gap: 12px;
  }
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

  @media (max-width: 460px) {
    left: initial;
    right: 99px;
    border-radius: 6px;
  }
`;

export const PlaylistItem = styled('button')`
  width: 168px;
  height: 32px;
  text-align: start;
  border: none !important;
  ${BUTTON}

  @media (max-width: 460px) {
    font-size: 14px;
    height: 29px;
    width: 120px;
    border-radius: 6px;

    &:hover {
      translate: 0 -2px;
    }
  }
`;

export const Header = styled('div')`
  font-size: 26px;
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 19px;
  }
`;

export const Settings = styled('button')`
  width: 34px;
  height: 34px;
  background-image: url('/settings.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const SettingsItemsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  border-radius: 6px;
  padding: 4px;
`;

export const PlaylistDataContainer = styled('div')`
  position: absolute;
  left: 80%;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 12px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
`;

export const PlaylistSongsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 14px;
  width: calc(100% - 16px);

  @media (max-width: 460px) {
    gap: 10px;
  }
`;

export const PlaylistSong = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 12px;
  width: 100%;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

interface PlaylistSongImageProps {
  $song: ISongData;
}

export const PlaylistSongImage = styled('button')<PlaylistSongImageProps>`
  width: 86px;
  height: 86px;
  border-radius: 8px;
  border: none;
  background-image: url(${({ $song }) => `${API_URL}/images/song/${$song.author}/${$song.name}`});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  padding: 0;
  transition: 0.3s ease;

  &::after {
    content: "";
    display: flex;
    opacity: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-image: url(/play_hover.png);
    background-size: 32px;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.4);
    background-position: center;
    transition: 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 460px) {
    width: 48px;
    height: 48px;
    border-radius: 5px;
    
    &::after {
      background-size: 24px;
      border-radius: 5px;
    }
  }
`;

export const PlaylistMainInfoWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 12px;

  @media (max-width: 460px) {
    gap: 8px;
  }
`;

export const PlaylistSongInfoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 140px;
  height: 44px;
  align-self: center;

  @media (max-width: 460px) {
    width: 50px;
  }
`;

interface PlaylistSongInfoProps {
  $name?: boolean;
  $author?: boolean;
  $likes?: boolean;
}

export const PlaylistSongInfo = styled('div')<PlaylistSongInfoProps>`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: ${({ $name, $author }) => $name ? '19px' : $author ? '16px' : '14px'};
  color: ${({ $name }) => $name ? colors.WHITE : colors.LIGHT_GREY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 460px) {
    font-size: ${({ $name, $author }) => $name ? '16px' : $author ? '14px' : '13px'};
  }
`;

interface LikeSongButtonProps {
  $isLiked: boolean | (() => boolean);  
}

export const LikeSongButton = styled('button')<LikeSongButtonProps>`
  width: 34px;
  height: 34px;
  background-image: url(${({ $isLiked }) => $isLiked ? '/like_hover.png' : '/like.png'});
  border: 2px solid ${({ $isLiked }) => $isLiked ? colors.BORDER : 'transparent'};
  border-radius: 6px;
  background-color: ${({ $isLiked }) => $isLiked ? colors.DARK_BLUE : 'transparent'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 18px;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${colors.BORDER};
    background-color: ${colors.DARK_BLUE};
  }
`;