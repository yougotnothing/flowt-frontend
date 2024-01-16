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
  
  .rhap_volume-controls {
    flex: none;
    margin: auto 12px auto auto;
    width: 100px !important;
  }
  
  .rhap_additional-controls {
    width: max-content !important;
    flex: none !important;
  }

  .rhap_controls-section {
    height: max-content;
  }

  .rhap_controls-section {
    align-items: center;
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
  width: 150px;
  gap: 12px;
  border-radius: 5px;
  align-self: start;
`;

export const SongInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  margin-right: auto;
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

export const SongCreatorLink = styled('a')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${colors.DARK_WHITE};
  cursor: pointer;
  
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
  margin-left: calc(50% - 150px - 100px);
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