import styled from "styled-components";
import { COLORS } from "../../../consts/colors.const";

export const UserContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 24px;
  background-color: ${COLORS.background};
`;

export const CustomizeUser = styled('button')`
  background: none;
  border: none;
`;