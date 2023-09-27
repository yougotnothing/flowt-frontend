import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON, TITLE } from "../../../constants/styles.const";

export const PlaylistContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 14px;
  gap: 24px;
  border: 2px solid ${colors.BORDER};
  background-color: ${colors.FRONT};
`;

export const TitleImage = styled('picture')`
  width: 184px;
  height: 184px;
  border: none;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 12px;
  border-radius: 12px;
  background-color: ${colors.VERY_DARK_BLUE};
  gap: 12px;
`;

export const PlaylistText = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.WHITE};
`;

export const OpenPlaylistButton = styled('button')`
  ${BUTTON};
  
  width: 146px;
  height: 42px;
`;

export const OpenPlaylistContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0 auto auto; 
`;

export const PlaylistName = styled('div')`${TITLE}`;
