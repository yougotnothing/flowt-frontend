import styled from "styled-components";
import { colors } from "../../../../consts/colors.const";
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
  color: ${colors.WHITE};
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
  background-color: ${colors.FRONT};
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
  background-color: ${colors.FRONT};
  color: ${colors.DARK_WHITE};
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${colors.WHITE};
    border: 1px solid ${colors.WHITE};
    border-right-width: 0;
    border-top-width: 0;
    border-left-width: 0;
  }
`;
