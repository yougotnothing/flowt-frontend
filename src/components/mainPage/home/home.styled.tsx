import styled from "styled-components";
import { COLORS } from "../../../colors.const";

export const HomeContainer = styled('div')`
  margin: 0;
  display: flex;
  flex-direction: row;
  width: 1720px;
`;

export const UtilsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 680px;
  height: 80vh;
  align-self: start;
`;

export const Utils = styled('div')`
  width: 640px;
  align-self: flex-start;
  border-radius: 0px 25px 25px 0px;
  background-color: ${COLORS.front};
`;

export const Settings = styled('button')`
  justify-self: start;
  width: 62px;
  height: 62px;
  background-image: url('/settings.png');
  background-size: 62px;
  background-color: ${COLORS.front};
  border: none;
  border-radius: 50%;

  &:hover {
    max-width: 168px;
    cursor: pointer;
  }
`;

export const SongContainer = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.container};
  align-items: center;
  padding: 20px;
  align-self: center;
`;