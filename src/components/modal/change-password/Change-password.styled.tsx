import styled from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON } from "../../../constants/styles.const";

interface TextProps {
  $message?: boolean;
}

interface WrapperProps {
  $isOpen: boolean;
}

export const Wrapper = styled('div')<WrapperProps>`
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
  gap: 26px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  padding: 12px;
  border-radius: 14px;
`;

export const Text = styled('div')<TextProps>`
  font-size: ${({ $message }) => $message ? '18px' : '22px'};
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${({ $message }) => $message ? colors.SECONDARY : colors.WHITE};
`;

export const Button = styled('button')`
  ${BUTTON}
  width: 124px;
  height: 34px;
`;

export const CloseModal = styled('button')`
  width: 34px;
  height: 34px;
  border: none;
  align-self: end;
  background-color: transparent;
  background-image: url(/cross.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;

  @media (max-width: 460px) {
    width: 26px;
    height: 26px;
  }
`;