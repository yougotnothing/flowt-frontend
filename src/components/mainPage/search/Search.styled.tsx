import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  width: 1200px;
  gap: 28px;
  margin: 0 auto;
`;

export const Header = styled('div')`
  position: absolute;
  align-self: start;
  z-index: 999;
  font-family: 'Raleway', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: ${colors.WHITE};
`;

export const ContentContainer = styled('div')`
  margin-top: 5em;
  display: flex;
  width: 700px;
  align-items: center;
  flex-direction: column;
  padding: 8px;
  gap: 6px;
  max-height: 780px;
  overflow-y: auto;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 6px;
`;

export const FiltersContainer = styled('div')`
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: max-content;
  height: max-content;
`;

export const SearchFilters = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: ${colors.FRONT};
  border: 1px solid ${colors.BORDER};
`;

export const SearchFilterButton = styled('button')`
  color: ${colors.WHITE};
  background-color: transparent;
  font-size: 18px;
  font-weight: 400;
  font-family: 'Urbanist', sans-serif;
  border-style: solid;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  border-color: transparent;
  width: 140px;
  height: 32px;
  transition: 0.3s;
  cursor: pointer;
  
  &:hover {
    color: ${colors.SECONDARY};
    border-color: ${colors.SECONDARY};
  }
`;

export const Card = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${colors.WHITE};
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  width: 670px;
  height: 74px;
  padding: 4px;
`;

export const CardIcon = styled('picture')`
  width: 66px;
  height: 66px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const CardInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 160px;
  height: 66px;
`;

export const CardInfo = styled('button')`
  background-color: transparent;
  color: ${colors.WHITE};
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  border: none;
  cursor: pointer;
  transition: 0.3s;
`;