import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";
import { TITLE, INPUT, VALIDATION, BUTTON } from "../../../../consts/styles.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3em;
  width: 324px;
  background-color: ${COLORS.front};
  gap: 26px;
  border-radius: 18px;
  align-self: center;
  margin: 4em auto auto auto;
`;

export const Input = styled('input')`
  ${INPUT};

  width: 80%;
  height: 46px;
`;

export const Button = styled('button')`
  ${BUTTON};  

  width: 144px;
  height: 46px;
`;

export const Header = styled('div')`${TITLE}`;

export const ChangeUsernameContainer = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
`;