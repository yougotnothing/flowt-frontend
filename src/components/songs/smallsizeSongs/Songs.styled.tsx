import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

export const SongContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.FRONT};
  justify-content: space-between;
  width: 300px;
  height: max-content;
  padding: 8px;
  border-radius: 6px;
  gap: 24px;
  border: 1px solid ${colors.BORDER};
`;

export const SongData = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: ${colors.DARK_BLUE};
  padding: 2px;
  border-radius: 4px;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: start;
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
  text-align: start;
  background-color: ${colors.DARK_BLUE};
  color: ${colors.WHITE};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    color: ${colors.AQUAMARINE};
  }
`;

export const StatsTitle = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${colors.DARK_WHITE};
`;

export const SongListensIcon = styled('picture')`
  height: 14px;
  width: 14px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/play.png");
`;

export const SongLikedIcon = styled('picture')`
  height: 14px;
  width: 14px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/like.png");
`;

export const SongStatsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

export const Stats = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  gap: 4px;
`

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

export const LikeSongButton = styled('button')`
  width: 36px;
  height: 36px;
  background-color: ${colors.FRONT};
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 6px;
  transition: 0.3s;
  cursor: pointer;
  border: 2px solid ${colors.FRONT};
  
  &:hover {
    background-color: ${colors.BORDER};
    border-color: ${colors.AQUAMARINE};
  }
`;