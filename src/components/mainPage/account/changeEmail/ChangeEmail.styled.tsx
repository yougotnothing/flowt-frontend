import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";
import { TITLE, INPUT, BUTTON, VALIDATION, GO_BACK_CONTAINER } from "../../../../consts/styles.const";

export const ChangeEmailContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5em;
  margin-left: auto;
  margin-right: auto;
  padding: 36px;
  background-color: ${COLORS.front};
  border-radius: 18px;
`;

export const Header = styled('div')`
  ${TITLE};

  margin-bottom: 12px;
`;

export const Input = styled('input')`
  ${INPUT};

  width: 264px;
  height: 48px;  
`;

export const Button = styled('button')`
  ${BUTTON};

  width: 124px;
  height: 42px;
`;


export const ContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Error = styled('div')`${VALIDATION};`;

export const GoBackContianer = styled('div')`${GO_BACK_CONTAINER};`;