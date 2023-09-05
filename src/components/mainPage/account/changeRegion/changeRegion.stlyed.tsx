import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";
import { TITLE } from "../../../../consts/styles.const";

export const ChangeRegionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.front};
  padding: 24px;
  gap: 24px;
  border-radius: 18px;
`;