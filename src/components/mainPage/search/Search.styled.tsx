import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../constants/colors.const";

interface ICardType {
  $type: 'user' | 'song';
  $src: string | null;
}

interface ICardButtonsContainer {
  $isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  position: relative;
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
  display: flex;
  width: 760px;
  align-items: center;
  flex-direction: column;
  margin:  5em auto 0 auto;
  padding: 8px;
  gap: 6px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 6px;
`;

export const FiltersContainer = styled('div')`
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 18px;
  width: max-content;
  height: max-content;
`;

export const SearchFilters = styled('div')`
  display: flex;
  flex-direction: column;
  position: fixed;
  gap: 6px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;
  padding: 4px;
`;

export const SearchFilterButton = styled('button')`
  color: ${colors.WHITE};
  background-color: transparent;
  font-size: 19px;
  font-weight: 600;
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
  display: inline-flex;
  flex-direction: row;
  z-index: 1;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border: 1px solid ${colors.WHITE};
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  width: 670px;
  height: 146px;
  padding: 4px;
`;

export const CardIcon = styled('picture')<ICardType>`
  width: 126px;
  height: 126px;
  border-radius: ${props => props.$type === 'user' ? '50%' : '4px'};
  background-image: ${props => `url(${props.$src})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const CardInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 218px;
  height: 66px;
`;

export const CardInfo = styled('button')`
  background-color: transparent;
  color: ${colors.WHITE};
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  text-align: start;
  font-family: 'Urbanist', sans-serif;
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.3s;
`;

export const CardDiv = styled('div')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const CardButtonsContainer = styled('div')<ICardButtonsContainer>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  padding: 4px;
  gap: 6px;
  border-radius: 6px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  animation: ${props => props.$isOpen ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
`;

export const CardButton = styled('button')`
  background-color: transparent;
  border: none;
  border-radius: 6px;
  color: ${colors.DARK_WHITE};
  font-weight: 600;
  font-size: 16px;
  font-family: 'Urbanist', sans-serif;
  height: 28px;
  width: 140px;
  text-align: start;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY};

  }
`;