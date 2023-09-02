import styled from "styled-components";
import { COLORS } from "../../../consts/colors.const";

export const AccountContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ChangeAvatar = styled('button')`
  width: 164px;
  height: 46px;
  background-color: ${COLORS.background};
  color: ${COLORS.firstFontHover};
  text-align: center;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
`;