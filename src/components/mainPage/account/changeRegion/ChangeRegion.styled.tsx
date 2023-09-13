import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";
import { BUTTON, TITLE } from "../../../../consts/styles.const";

export const ChangeRegionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 4em;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  width: 100%;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.front};
  padding: 24px;
  gap: 12px;
  border-radius: 18px;
`;

export const Button = styled('button')`
  width: 124px;
  height: 36px;
  background-color: ${COLORS.grey};
  color: ${COLORS.firstFont};
  border: 2px solid ${COLORS.border};
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', sans-serif;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 4px;
  display: flex;
  transition: 0.3s;
  gap: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.border};
    color: ${COLORS.secondary}; 
  }
`;

export const Droplist = styled('ul')`
  width: 268px;
  max-height: 227px; 
  background-color: ${COLORS.grey};
  border: 2px solid ${COLORS.border};
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
  font-family: 'Urbanist', sans-serif;
  color: ${COLORS.firstFont};

  &:hover {
    background-color: ${COLORS.border};
    color: ${COLORS.secondary}; 
  }
`;

export const ChoosenRegion = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  max-width: 80%;
  text-wrap: wrap;
  color: ${COLORS.firstFontHover};
`;  

export const Title = styled('div')`${TITLE};`;