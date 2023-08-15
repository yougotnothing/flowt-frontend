import styled from "styled-components";
import { COLORS } from "../../../colors.const";

export const LoginHeader = styled('div')`
  font-family: 'Urbanist' sans-serif;
  font-weight: 800;
  font-size: 36px;
  margin: 24px;
  color: ${COLORS.firstFontHover};
`;

export const Span = styled('span')`
  color: ${COLORS.secondary};
  font-family: 'Urbanist' sans-serif;
  font-weight: 800;
  font-size: 36px;
`;

export const LoginCard = styled('div')`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: 7%;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
  box-shadow: 0px 0px 16px 0px ${COLORS.border};
  border-radius: 24px;
  background-color: ${COLORS.front};
`;

export const LoginInput = styled('input')`
  display: flex;
  align-self: center;
  width: 228px;
  height: 38px;
  border: none;
  border-radius: 10px;
  padding-left: 20px;
  background-color: ${COLORS.input};
  color: #bdbdbd;
  outline: none;
  transition: all 0.5s;

  &::placeholder {
    font-size: 18px;
    font-family: 'Urbanist', sans-serif;
    font-weight: 300;
  }

  &:hover {
    transition: all 0.5s;
    color: white;
    background-color: ${COLORS.inputHover};
  } 
`;

export const LoginButton = styled('button')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  height: 38px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.firstFontHover};
  border: none;
  margin: 16px;
  border-radius: 12px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 300;
  font-size: 16px;

  .link {
    position: absolute;
    opacity: 0;
    width: 124px;
    height: 38px;
  }

  &:hover {
    background-color: ${COLORS.border};
    color: ${COLORS.firstFont};
    cursor: pointer;
    transition: all 0.2s;
  }
`;

export const RegisteredButton = styled('button')`
  margin: auto;
  font-family: 'Urbanist', sans-serif;
  font-weight: 300;
  background: none;
  background-color: none;
  border: none;
  width: 98px;
  height: 38px;
  color: ${COLORS.secondary};
  justify-content: center;
  align-self: end;

  &:hover {
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid ${COLORS.secondaryHover};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    color: ${COLORS.secondaryHover};
  }
`;

export const ValidationSpan = styled('span')`
  display: flex;
  align-self: top;
  font-family: 'Urbanist' sans-serif;
  font-weight: 700;
  color: ${COLORS.krasniy};
`;

export const InputContainer = styled('div')`
  display: flex;
  align-self: center;
  width: 250px;
  flex-direction: column;
  gap: 10px;
`;