import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { TITLE, BUTTON, INPUT, VALIDATION, NOT_REGISTERED, A_CONTAINER, A_ } from "../../../constants/styles.const";

export const LoginHeader = styled('div')`
  ${TITLE};
  
  margin-top: 16px;
`;

export const Span = styled('span')`
  color: ${colors.SECONDARY};
  font-family: 'Urbanist', sans-serif;
  font-weight: 800;
  font-size: 32px;

  @media (max-width: 460px) {
    font-size: 23px;
  }
`;

export const LoginCard = styled('div')`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: 4em;
  margin-left: auto;
  margin-right: auto;
  gap: 14px;
  padding: 24px;
  border-radius: 24px;
  background-color: ${colors.FRONT};

  @media (max-width: 460px) {
    width: 90%;
    padding: 12px;
  }
`;

export const LoginInput = styled('input')`
  ${INPUT};

  margin-top: 12px;
  height: 38px;
  width: 228px;
`;

export const LoginButton = styled('button')`
  ${BUTTON};

  margin-top: 12px;
  height: 38px;
  width: 124px;
`;

export const RegisteredButton = styled('button')`
  ${NOT_REGISTERED};

  height: 38px; 
`;

export const ValidationSpan = styled('span')`${VALIDATION};`;

export const InputContainer = styled('div')`
  display: flex;
  align-self: center;
  width: 250px;
  flex-direction: column;
`;

export const NotRegistered = styled('button')`
  ${NOT_REGISTERED};

  width: 98px;
  height: 38px;
`;

export const HelpButtons = styled('div')`
  display: flex;
  align-self: center;
  flex-direction: row;
  max-width: 100%;
  gap: 40px;
`;

export const AContainer = styled('div')`${A_CONTAINER}`;

export const A = styled('a')`${A_}`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const DescriptionTitle = styled('div')`${TITLE}`;