import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON } from "../../../constants/styles.const";

interface IModal {
  $isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    display: none;
    z-index: 0;
  }
  to {
    opacity: 1;
    display: inline-flex;
    z-index: 9999;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    display: inline-flex;
    z-index: 9999;
  }
  to {
    opacity: 0;
    dislay: none;
    z-index: 0;
  }
`;

export const Container = styled('div')<IModal>`
  display: ${props => props.$isOpen ? 'inline-flex' : 'none'} ;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  z-index: ${props => props.$isOpen ? '9999' : '0'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100svw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.4);
  transition: 0.3s ease;
  animation: ${props => props.$isOpen ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
`;

export const ModalWindow = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 6px;
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;
  background-color: ${colors.FRONT};
  gap: 12px;
  width: 220px;
  height: 284px;
`;

export const CloseButton = styled('button')`
  width: 25px;
  height: 25px;
  background-color: transparent;
  cursor: pointer;
  border: none;
  background-image: url('/cross.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const SubmitButton = styled('button')`
  ${BUTTON};
  margin: auto auto 0 auto;

  width: 134px;
  height: 32px;
`;

export const Select = styled('select')`
  width: 166px;
  height: 36px;
  background-color: ${colors.DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  font-family: 'Urbanist', sans-serif;
  color: ${colors.DARK_WHITE};
  font-size: 14px;
  font-weight: 400;
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

export const CloseButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  align-items: end;
  flex-direction: column;
`;

export const Option = styled('option')``;

export const OptionButton = styled('div')`
  width: 146px;
  height: 32px;
  font-family: 'Urbanist', sans-serif;
  background-color: transparent;
  color: ${colors.DARK_WHITE};
  cursor: pointer !important;
  transition: 0.3s ease;

  &:hover {
    background-color: ${colors.BORDER} !important;
    color: ${colors.SECONDARY} !important;
  }
`;

export const MainContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

export const MainContainerText = styled('div')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const TypeContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 14px;
`;