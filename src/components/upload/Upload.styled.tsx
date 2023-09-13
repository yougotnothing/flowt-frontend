import styled from "styled-components";
import {A_, BUTTON, TITLE, INPUT, VALIDATION} from "../../consts/styles.const";
import {COLORS} from "../../consts/colors.const";

export const UploadContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
  width: 100%;
`;

export const Input = styled('input')`
  display: none;
`;

export const Label = styled('label')`
  ${BUTTON};
  
  margin: auto;
  width: 142px;
  height: 42px;
`;

export const SongName = styled('input')`
  ${INPUT};
  
  width: 240px;
  height: 36px;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 860px;
  padding: 32px;
  gap: 24px;
  border: 2px solid ${COLORS.border};
  border-radius: 16px;
  background-color: ${COLORS.front};
`;

export const DataContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 24px;
`;

export const AvatarInput = styled('input')`
  display: none;
`;

export const SongNameContainer = styled('div')`
  margin: 0 auto auto 0;
  height: 61px;
`;

export const SetAvatarLabel = styled('label')`
  ${A_};
  
  color: ${COLORS.firstFontHover};
  &:hover {
    color: ${COLORS.secondaryHover};
  }
`;

export const UploadButton = styled('a')`
  ${A_};
  
  color: ${COLORS.firstFontHover};
  &:hover {
    color: ${COLORS.secondaryHover};
  }
`;

export const Header = styled('div')`
  display: flex;
  flex-direction: row;
  align-self: start;
  width: 100%;
`;

export const SongAvatar = styled('picture')`
  width: 180px;
  height: 180px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 14px;
  align-self: start;
`;

export const Validation = styled('div')`
  ${VALIDATION};
`;

export const AvatarContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background-color: ${COLORS.grey};
  border-radius: 14px;
`;

export const Title = styled('div')`
  ${TITLE};
  
  align-self: start;
`;

export const ButtonsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 85%;
`;

export const SubmitContainer = styled('div')`
  margin: auto 0 auto 0;
`;

export const Genres = styled('ul')`
  width: 246px;
  max-height: 227px;
  background-color: ${COLORS.grey};
  border: 2px solid ${COLORS.border};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 4px;
  transition: 0.3s;
  gap: 4px;
`;

export const GenresItem = styled('li')`
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.3s;
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', sans-serif;
  color: ${COLORS.firstFont};

  &:hover {
    background-color: ${COLORS.border};
    color: ${COLORS.secondary};
  }
`;

export const AvatarAndGenre = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 36px;
`;

export const SongInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 24px auto auto 0;
  gap: 24px;
  background-color: ${COLORS.grey};
  border-radius: 14px;
  padding: 24px;
`;

export const SongInfoText = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${COLORS.firstFontHover};
`;