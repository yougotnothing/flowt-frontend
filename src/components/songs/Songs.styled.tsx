import styled from "styled-components";
import { COLORS } from "../../consts/colors.const";
import {BUTTON, TITLE} from "../../consts/styles.const";

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
  background-color: ${COLORS.front};
  border: 2px solid ${COLORS.front};
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
  background-color: ${COLORS.grey};
  padding: 12px;
  margin: auto auto auto 0;
  border-radius: 12px;
  gap: 6px;
`;

export const SongName = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: ${COLORS.firstFontHover};
`;

export const SongCreatorName = styled('a')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${COLORS.firstFont};
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    color: ${COLORS.firstFontHover};
  }
`;

export const ListenSongButton = styled('button')`
  ${BUTTON};
  
  width: 102px;
  height: 42px;
  margin: auto 0 auto 0;
`;