import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON } from "../../../constants/styles.const";

interface ISongInfo {
  $type: 'name' | 'else';
}

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
`;

export const Song = styled('div')`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  width: 78em;
  gap: 6em;
  padding: 1em;
  background: linear-gradient(100deg, ${colors.SECONDARY} 0%, ${colors.AQUAMARINE} 30%, ${colors.DARK_BLUE} 120%);
  border-radius: 12px;
`;

export const SongAvatar = styled('img')`
  object-fit: contain;
  width: 280px;
  height: 280px;
  border-radius: 8px;
  border: none;
`;

export const SongInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1em;
`;

export const SongInfo = styled('div')<ISongInfo>`
  font-family: 'Raleway', sans-serif;
  font-weight: ${props => props.$type === 'name' ? '800' : '600'};
  font-size: ${props => props.$type === 'name' ? '32px' : '18px'};
  color: ${colors.WHITE};
`;

export const SongButton = styled('div')`
  margin: auto 0 auto auto;
  width: 142px;
  height: 36px;
  ${BUTTON}
`;

export const SongDataContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1em;
  padding: 1em;
  width: 78em;
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  background-color: ${colors.FRONT};
`;

export const SongDataSpan = styled('span')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.SECONDARY};
`;

export const SongData = styled('div')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;