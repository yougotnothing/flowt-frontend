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
  align-items: center;
  gap: 26px;
  padding: 8px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  position: relative;
`;

export const Input = styled('input')`
  width: 189px;
  height: 32px;
  ${INPUT}
`;

export const ConfirmButton = styled('button')`
  width: 146px;
  height: 32px;
  ${BUTTON}
`;

export const CloseButton = styled('button')`
  width: 24px;
  height: 24px;
  align-self: end;
  border: none;
  background-color: transparent;
  background-image: url('/cross.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;