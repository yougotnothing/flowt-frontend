import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 620px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 14px;
  padding: 8px;
`;

export const SongAvatar = styled('picture')`
  width: 145px;
  height: 145px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid ${colors.BORDER};
  border-radius: 14px;
`;

export const DataContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: ${colors.DARK_BLUE};
  width: 260px;
  height: 129px;
  padding: 8px;
  gap: 12px;
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  justify-content: space-between;
`;

export const DataInfo = styled('button')`
  font-family: 'Urbanist', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: ${colors.WHITE};
  background-color: ${colors.DARK_BLUE};
  border: none;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: start;
  
  &:hover {
    color: ${colors.SECONDARY_HOVER};
  }
`;

export const UserName = styled('button')`
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: ${colors.DARK_WHITE};
  background-color: ${colors.DARK_BLUE};
  width: 100%;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const ListenButton = styled('button')`
  width: 58px;
  height: 58px;
  padding: 14px;
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/play_hover.png");
  background-color: ${colors.VERY_DARK_BLUE};
  border-radius: 50%;
  border: 2px solid ${colors.BORDER};
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: ${colors.BORDER};
  }
`;

export const StatsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  gap: 12px;
`;

export const StatsInfo = styled('div')`
  color: ${colors.DARK_WHITE};
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 400;
`;

export const StatsInfoContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  gap: 6px;
`;

export const StatsIcon = styled('picture')`
  height: 14px;
  width: 14px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;