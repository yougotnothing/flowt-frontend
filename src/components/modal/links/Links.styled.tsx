import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON, INPUT } from "../../../constants/styles.const";

interface IModal {
  $isOpen: boolean;
}

export const Modal = styled('div')<IModal>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100svw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 999;
`;

export const ModalWindow = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  padding: 8px;
  border-radius: 12px;
  width: 720px;
  gap: 16px;
`;

export const Header = styled('div')`
  font-size: 22px;
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  color: ${colors.WHITE};
`;

export const CloseButton = styled('button')`
  width: 26px;
  height: 26px;
  align-self: flex-end;
  background-color: transparent;
  background-image: url('/cross.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

export const Input = styled('input')`
  ${INPUT}
  height: 30px;
  width: 208px;
`;

export const ConfirmButton = styled('button')`
  ${BUTTON}
  align-self: center;
  width: 142px;
  height: 34px;
`;

export const Guide = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${colors.WHITE};
`;

export const GuideContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

export const InputsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;