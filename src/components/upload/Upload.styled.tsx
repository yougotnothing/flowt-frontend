import styled from "styled-components";
import { A_, BUTTON, TITLE, INPUT, VALIDATION } from "../../constants/styles.const";
import { colors } from "../../constants/colors.const";

export const UploadContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
  width: 100%;

  @media (max-width: 460px) {
    width: 96%;
  }
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

  @media (max-width: 460px) {
    font-size: 14px;
    width: 165px;
    height: 28px;
  }
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 860px;
  padding: 32px;
  gap: 24px;
  border: 2px solid ${colors.BORDER};
  border-radius: 16px;
  background-color: ${colors.FRONT};

  @media (max-width: 460px) {
    width: 100%;
  }
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
  @media (max-width: 460px) {
    height: 100px;
    gap: 12px;
  }
`;

export const SetAvatarLabelContainer = styled('div')`
  margin: auto auto 0;
`;

export const SetAvatarLabel = styled('label')`
  ${A_};
  
  color: ${colors.WHITE};
  &:hover {
    color: ${colors.SECONDARY_HOVER};
  }
`;

export const UploadButton = styled('button')`
  ${A_};
  background-color: ${colors.FRONT};
  width: 80px;
  height: 35px;
  
  color: ${colors.WHITE};
  &:hover {
    color: ${colors.SECONDARY_HOVER};
  }
`;

export const Header = styled('div')`
  display: flex;
  flex-direction: row;
  align-self: start;
  width: 100%;

  @media (max-width: 460px) {
    height: max-content;
    flex-direction: column-reverse;
  }
`;

interface SongAvatarProps {
  $image: string | undefined;
}

export const SongAvatar = styled('picture')<SongAvatarProps>`
  width: 180px;
  height: 180px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 14px;
  background-image: ${({ $image }) => $image ? `url(${$image})` : 'none'};

  @media (max-width: 460px) {
    width: 100px;
    height: 100px;
    border-radius: 8px;
  }
`;

export const Validation = styled('div')`
  ${VALIDATION};
`;

export const AvatarContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: center;
  width: 180px;
  height: calc(255px - 36px);
  gap: 12px;
  padding: 18px;
  background-color: ${colors.VERY_DARK_BLUE};
  border-radius: 14px;

  @media (max-width: 460px) {
    height: 155px;
    width: 120px;
    padding: 7px;
    gap: 9px;
  }
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
  max-height: 240px;
  background-color: ${colors.VERY_DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 4px;
  transition: 0.3s ease;
  gap: 4px;
  margin: 0;

  @media (max-width: 460px) {
    width: max-content;
    height: 155px;
  }
`;

export const GenresItem = styled('li')`
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.3s;
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.DARK_WHITE};

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY};
  }
`;

export const AvatarAndGenre = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 36px;

  @media (max-width: 460px) {
    gap: initial;
    justify-content: space-between;
  }
`;

export const SongInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  background-color: ${colors.VERY_DARK_BLUE};
  border-radius: 14px;
  padding: 24px;
`;

export const SongInfoText = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.WHITE};
`;