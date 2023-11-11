import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../../constants/colors.const";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export interface OptionsProps {
  $isVisible: boolean;
}

export const OptionsContainer = styled('div')<OptionsProps>`
  width: 280px;
  position: absolute;
  border: 2px solid ${colors.BORDER};
  place-self: end;
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  flex-direction: column;
  border-radius: 14px;
  background-color: ${colors.FRONT};
  transition: all 0.3s;
  padding: 12px;
  gap: 8px;
  opacity: ${props => props.$isVisible ? '1' : '0'};
  animation: ${props => props.$isVisible ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
`;

export const Select = styled('button')`
  width: 154px;
  height: 62px;
  align-items: end;
  background-color: ${colors.FRONT};
  border: none;
  color: ${colors.WHITE};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${colors.WHITE};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    color: ${colors.DARK_WHITE};
  }
`;

export const SelectText = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-size: 18px;
  font-weight: 400;
  text-align: start;
`;

export const CloseOptions = styled('button')`
  position: absolute;
  align-self: end;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 6px;
  background-image: url('/cross.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;