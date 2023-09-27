import styled from "styled-components";
import { colors } from "../../constants/colors.const";
import {BUTTON, TITLE} from "../../constants/styles.const";

export const SongsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export const Song = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding: 12px;
  gap: 24px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.FRONT};
  border-radius: 14px;
`;

export const SongImage = styled('picture')`
  width: 124px;
  height: 124px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 14px;
`;

export const SongTitle = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.VERY_DARK_BLUE};
  padding: 12px;
  margin: auto auto auto 0;
  border-radius: 12px;
  gap: 6px;
`;

export const SongName = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: ${colors.WHITE};
`;

export const SongCreatorName = styled('a')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${colors.DARK_WHITE};
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    color: ${colors.WHITE};
  }
`;

export const ListenSongButton = styled('button')`
  ${BUTTON};
  
  width: 102px;
  height: 42px;
  margin: auto 0 auto 0;
`;