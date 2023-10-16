import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON } from "../../../constants/styles.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.FRONT};
`;

export const SongAvatar = styled('picture')`
  width: 145px;
  height: 145px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 14px;
`;

export const DataContainer = styled('div')`
  background-color: ${colors.DARK_BLUE};
  width: 360px;
  height: 180px;
  padding: 8px;
  gap: 12px;
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
`;

export const DataInfo = styled('button')`
  font-family: 'Raleway', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${colors.WHITE};
  background-color: ${colors.DARK_BLUE};
  border: none;
`;

export const ListenButton = styled('button')`
  width: 68px;
  height: 68px;
  background-size: cover;
  background-image: url("/play-47.svg");
  
  &path {
    fill: ${colors.DARK_WHITE};
  }
  ${BUTTON};
`;

