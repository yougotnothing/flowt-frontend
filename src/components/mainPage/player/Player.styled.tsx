import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

interface ILikeButton {
  $isLiked: boolean;
}

export const PlayerContainer = styled('div')`
  display: flex;
  position: fixed;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  bottom: 12px;
  width: max-content;

  .rhap_container {
    width: 820px;
    border-radius: 12px;
    background-color: ${colors.VERY_DARK_BLUE};
    box-shadow: 0 0 12px 1px ${colors.BORDER};
    position: relative;
  }
  
  .rhap_time,
  .rhap_repeat-button,
  .rhap_volume-button,
  .rhap_main-controls-button {
    font-family: 'Urbanist', sans-serif;
    color: ${colors.WHITE} !important;
    
    :hover {
      color: ${colors.DARK_WHITE};
    }
  }

  .rhap_progress-bar {
    background-color: ${colors.DARK_WHITE};
    border-radius: 5px;
  }

  .rhap_main-controls {
    position: absolute;
    left: 40%;
  }
  
  .rhap_volume-controls {
    width: 100px !important;
  }
  
  .rhap_additional-controls {
    width: max-content !important;
    flex: none !important;
  }

  .rhap_controls-section {
    height: 60px;
  }

  .rhap_controls-section {
    align-items: center;
    height: 60px;
  }

  .rhap_progress-filled {
    background-color: ${colors.SECONDARY};
    border-radius: 5px;
  }

  .rhap_progress-indicator {
    width: 14px;
    height: 14px;
    z-index: 5;
    top: -5px;
    background: ${colors.WHITE};
    box-shadow: ${colors.BORDER} 0 0 5px !important;
  }
`;

export const SongPicture = styled('picture')`
  width: 45px;
  height: 45px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
`;

export const SongContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.DARK_BLUE};
  padding: 6px;
  width: 200px;
  gap: 12px;
  border-radius: 5px;
  position: absolute;
`;

export const SongInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  margin-right: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SongTitle = styled('div')`
  font-family: 'Urbanist', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
  height: 16px;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.WHITE};
`;

export const SongInfoDataWrapper = styled('div')`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.DARK_WHITE};
  transition: 0.3s ease;

  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const SongCreatorLink = styled('a')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${colors.DARK_WHITE};
  cursor: pointer;
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    color: ${colors.SECONDARY};
    border: 1px solid ${colors.SECONDARY};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
`;

export const ShuffleButton = styled('button')`
  cursor: pointer;
  display: flex;
  height: 24px;
  width: 24px;
  background-color: ${colors.VERY_DARK_BLUE};
  border: none;
  align-items: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  justify-content: center;
  position: absolute;
  left: 55.5%;  
`;

export const LikeButton = styled('button')<ILikeButton>`
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-image: url(${p => p.$isLiked ? '/like_hover.png' : '/like.png'});
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;