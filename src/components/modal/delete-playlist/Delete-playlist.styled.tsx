import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON } from "../../../constants/styles.const";

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
  justify-content: space-between;
  gap: 24px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  padding: 8px;
  border-radius: 12px;
  position: relative;
`;

export const Text = styled('div')`
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 14px;
  }
`;

export const ConfirmButton = styled('button')`
  width: 146px;
  height: 34px;
  ${BUTTON}

  @media (max-width: 460px) {
    font-size: 14px;
    width: 120px;
    height: 29px;
  }
`;

export const CloseButton = styled('button')`
  border: none;
  background-color: transparent;
  background-image: url('/cross.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-self: end;
`;