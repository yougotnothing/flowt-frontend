import styled from "styled-components";
import { colors } from "../../constants/colors.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  gap: 24px;
  align-self: center;
`;

export const AdminPanel = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export const getUserContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-evenly;
  background-color: ${colors.FRONT};
  padding: 8px;
  border-radius: 12px;
  
`;