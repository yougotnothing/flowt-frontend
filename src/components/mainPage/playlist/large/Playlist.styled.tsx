import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background-color: linear-gradient(90deg, ${colors.SECONDARY} 0%, transparent 100%);
  border-radius: 8px;
`;