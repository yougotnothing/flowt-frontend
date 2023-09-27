import styled from "styled-components";
import { colors } from "../../../../constants/colors.const";
import { BUTTON, TITLE } from "../../../../constants/styles.const";

export const ChangeRegionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 3em auto;
  align-items: center;
  width: 100%;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.FRONT};
  padding: 24px;
  gap: 12px;
  border-radius: 18px;
`;

export const Button = styled('button')`
  ${BUTTON};
  
  width: 124px;
  height: 36px;
`;

export const Droplist = styled('ul')`
  width: 268px;
  max-height: 227px; 
  background-color: ${colors.VERY_DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 4px;
  transition: 0.3s;
  gap: 4px;
`;

export const DroplistItem = styled('li')`
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.3s;
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', 'Noto Color Emoji', sans-serif;
  color: ${colors.DARK_WHITE};

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY}; 
  }
`;

export const ChosenRegion = styled('div')`
  font-family: 'Urbanist', 'Noto Color Emoji', sans-serif;
  font-weight: 600;
  font-size: 18px;
  max-width: 80%;
  color: ${colors.WHITE};
`;  

export const Title = styled('div')`${TITLE};`;