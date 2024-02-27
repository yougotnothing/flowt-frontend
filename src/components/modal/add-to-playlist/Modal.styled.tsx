import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../constants/colors.const";

interface IModalContainer {
  $isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    z-index: 0;
    display: none;
  }
  to {
    opacity: 1;
    z-index: 9999;
    display: inline-flex;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    z-index: 9999;
    display: inline-flex;
  }
  to {
    opacity: 0;
    z-index: 0;
    display: none;
  }
`;

export const ModalContainer = styled('div')<IModalContainer>`
  width: 100svw;
  height: 100svh;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  position: fixed;
  display: ${props => props.$isOpen ? 'inline-flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.$isOpen ? '9999' : '0'};
  background-color: rgba(0, 0, 0, 0.4);
  animation: ${props => props.$isOpen ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
`;

export const ModalWindow = styled('div')`
  display: flex;
  width: 380px;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  padding: 0 6px 6px;
  border-radius: 8px;
  max-height: 320px;
  overflow-y: auto;
  gap: 6px;
`;

export const ModalText = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: fixed;
  background-color: ${colors.FRONT};
  width: 380px;
  font-size: 22px;
  font-weight: 800;
  height: 32px;
  justify-content: space-between;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};
`;

export const ContentContainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 6px;
`;

export const CloseModal = styled('button')`
  background-color: transparent;
  border: none;
  width: 22px;
  height: 22px;
  background-image: url('/cross.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-self: end;
  cursor: pointer;
`;

export const ModalStatus = styled('div')`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
  margin-top: 36px;
`;