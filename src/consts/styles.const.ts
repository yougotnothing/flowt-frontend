import { COLORS } from "./colors.const";

export const TITLE = `
  font-family: 'Raleway', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: ${COLORS.firstFontHover};
`;

export const VALIDATION = `
  align-self: start;
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.krasniy};
`;

export const INPUT = `
  border: 2px solid ${COLORS.border};
  border-radius: 12px;
  background-color: ${COLORS.front};
  color: ${COLORS.firstFont};
  padding-left: 12px;
  outline: none;
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 18px;
  transition: 0.3s;

  &::placeholder {
    opacity: 1;
  }

  &:hover {
    background-color: ${COLORS.grey};
    color: ${COLORS.firstFontHover};
  }
`;

export const BUTTON = `
  margin-top: 12px;
  background-color: ${COLORS.secondary};
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${COLORS.firstFontHover};
  transition: 0.3s;

  &:hover {
    background-color: ${COLORS.border};
  }
`;

export const A_ = `
  cursor: pointer;
  border: none;
  text-align: center;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 22px;
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${COLORS.secondaryHover};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
`;

export const A_CONTAINER = `
  color: ${COLORS.firstFontHover};
  padding: 5px;
  align-self: end;
  border-radius: 8px;
  width: max-content;

  &:hover {
    background-color: ${COLORS.grey};
    color: ${COLORS.secondaryHover};
  }
`;

export const GO_BACK_CONTAINER = `
  display: flex;
  flex-direction: row;
  width: 100%;
  height: max-content;
  justify-content: end;
`;

export const NOT_REGISTERED = `
  margin: auto;
  align-self: start;
  font-family: 'Urbanist', sans-serif;
  font-weight: 300;
  background: none;
  background-color: none;
  border: none;
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