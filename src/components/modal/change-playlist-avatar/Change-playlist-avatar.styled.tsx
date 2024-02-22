import styled from "styled-components";
import { colors } from "../../../constants/colors.const";

interface IModal {
  $isOpen: boolean;
}

interface IChangeAvatarButton {
  $isChanged: boolean;
  $image: string | null;
}

export const Modal = styled('div')<IModal>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
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
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  padding: 6px;
`;

export const Input = styled('input')`
  display: none;
`;

export const SetAvatarButton = styled('button')`
  width: 124px;
  height: 32px;
  background-color: transparent;
  border-width: 0;
  border-color: transparent;
  transition: 0.3s ease;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.WHITE};
  cursor: pointer;

  &:hover {
    color: ${colors.SECONDARY};
    border-bottom-width: 1px;
    border-bottom-color: ${colors.SECONDARY};
  }
`;

export const ChangeAvatarButton = styled('label')<IChangeAvatarButton>`
  background-image: ${
    ({ $isChanged, $image }) => $isChanged && $image ? `url(${encodeURI($image)})` : 'url(/plus.png)'
  };
  background-size: ${({ $isChanged }) => $isChanged ? 'cover' : '56px'};
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 248px;
  height: 248px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const CloseButton = styled('button')`
  width: 34px;
  height: 34px;
  border: none;
  align-self: end;
  background-color: transparent;
  background-size: cover;
  background-image: url(/cross.png);
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  @media (max-width: 460px) {
    width: 26px;
    height: 26px;
  }
`;