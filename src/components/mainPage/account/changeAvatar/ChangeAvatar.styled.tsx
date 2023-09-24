import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";
import { BUTTON } from "../../../../consts/styles.const";

export const ChangeAvatarContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  gap: 24px;
  margin: 4em auto 0 auto;
`;

export const Title = styled('div')`
  align-self: start;
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 34px;
  color: ${COLORS.firstFontHover};
`;

export const Input = styled('input')`
  display: none;
`;

export const InputWrapper = styled('div')`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  background-color: ${COLORS.front};
  border-radius: 18px;
`;

export const Label = styled('label')`
  ${BUTTON};
  
  padding: 10px 15px;
`;

export const NewAvatar = styled('picture')`
  display: flex;
  width: 240px;
  height: 240px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

export const ButtonContainer = styled('div')`
  height: 20px;
`;

export const SetNewAvatarButton = styled('button')`
  border: none;
  background-color: ${COLORS.front};
  color: ${COLORS.firstFont};
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${COLORS.firstFontHover};
    border: 1px solid ${COLORS.firstFontHover};
    border-right-width: 0;
    border-top-width: 0;
    border-left-width: 0;
  }
`;
