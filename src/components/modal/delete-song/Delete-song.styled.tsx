import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

interface ModalProps {
  $isOpen: boolean;
}

export const Wrapper = styled('div')<ModalProps>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100svw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 9999;
`;

export const ModalWindow = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  height: max-content;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  padding: 12px;
  border-radius: 12px;
  gap: 10px;

  @media (max-width: 460px) {
    width: 90%;
  }
`;


