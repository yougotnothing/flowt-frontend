import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";

export const OptionsContainer = styled('div')`
  width: 220px;
  position: absolute;
  align-self: end;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  background-color: ${COLORS.front};
  transition: all 0.3s;
  padding: 12px;
  gap: 4px;
`;

export const Select = styled('button')`
  width: 154px;
  height: 62px;
  align-items: end;
  background-color: ${COLORS.front};
  border: none;
  color: ${COLORS.firstFontHover};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${COLORS.firstFontHover};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    color: ${COLORS.firstFont};
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
  bacground-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;