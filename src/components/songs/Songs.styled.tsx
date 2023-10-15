import styled, { keyframes } from "styled-components";
import { colors } from "../../constants/colors.const";
import { BUTTON, TITLE } from "../../constants/styles.const";

export const SongContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.FRONT};
  width: 420px;
  height: max-content;
  padding: 6px;
  border-radius: 6px;
  gap: 9px;
  border: 1px solid ${colors.BORDER};
`;

export const SongData = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: ${colors.DARK_BLUE};
  padding: 4px;
  border-radius: 4px;
`;

export const SongImage = styled('picture')`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  height: 75px;
  width: 75px;
`;

export const SongTitle = styled('button')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 18px;
  background-color: ${colors.DARK_BLUE};
  color: ${colors.WHITE};
  border: none;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    color: ${colors.AQUAMARINE};
  }
`;

export const SongStats = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${colors.WHITE};
`;

export const SongStatsIcon = styled('picture')`
  
`;

export const SongButton = styled('button')`
  width: 75px;
  height: 75px;
  padding: 4px;
  transition: 0.3s;
  opacity: 0;
  background-color: rgba(48, 58, 63, 0.6);
  background-image: url("/play_hover.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 30px;
  border: none;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }
`;