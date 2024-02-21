import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { TITLE, INPUT, BUTTON, VALIDATION, GO_BACK_CONTAINER } from "../../../../constants/styles.const";

export const ChangeEmailContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  margin: 5em auto;
  padding: 36px;
  background-color: ${colors.FRONT};
  border-radius: 18px;
`;

export const Header = styled('div')`
  ${TITLE};

  margin-bottom: 12px;

  @media (max-width: 460px) {
    margin-bottom: 8px;
    font-size: 22px;
  }
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

export const GoBackContainer = styled('div')`${GO_BACK_CONTAINER};`;