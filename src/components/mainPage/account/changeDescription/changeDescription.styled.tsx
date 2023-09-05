import styled from "styled-components";
import { COLORS } from "../../../../consts/colors.const";
import { TITLE } from "../../../../consts/styles.const";

export const Container = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
`;

export const ChangeDescriptionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2em;
  border-radius: 18px;
  gap: 24px;
  background-color: ${COLORS.front};
  width: max-content;
  height: max-content;
`;


export const Input = styled('textarea')`
  background-color: ${COLORS.input};
  color: ${COLORS.firstFont};
  padding: 12px;
  width: 92%;
  height: 220px;
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 400;
  border: none;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s;
  resize: none;

  &:hover {
    background-color: ${COLORS.inputHover};
    color: ${COLORS.firstFontHover};
  }

  &::placeholder {
    opacity: 1;
  }
`;

export const Button = styled('button')`
  width: 142px;
  height: 46px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.firstFontHover};
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 400;
  transition: all 0.3s;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.border};
    color: ${COLORS.firstFont};
  }
`;

export const Title = styled('div')`
  ${TITLE};
`;

export const Error = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size; 18px;
  color: ${COLORS.krasniy};
`;