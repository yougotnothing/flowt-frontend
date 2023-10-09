  import { colors } from "./colors.const";

export const TITLE = `
  font-family: 'Raleway', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: ${colors.WHITE};
`;

export const VALIDATION = `
  align-self: start;
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.RED};
`;

export const INPUT = `
  border: 2px solid ${colors.BORDER};
  border-radius: 12px;
  background-color: ${colors.VERY_DARK_BLUE};
  color: ${colors.DARK_WHITE};
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
    background-color: ${colors.DARK_BLUE};
    color: ${colors.WHITE};
  }
`;

export const BUTTON = `
  display: flex;
  background-color: ${colors.DARK_BLUE};
  color: ${colors.DARK_WHITE};
  border: 2px solid ${colors.BORDER};
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', sans-serif;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY}; 
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
    border: 1px solid ${colors.SECONDARY_HOVER};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
`;

export const A_CONTAINER = `
  color: ${colors.WHITE};
  padding: 5px;
  align-self: end;
  border-radius: 8px;
  width: max-content;

  &:hover {
    background-color: ${colors.DARK_BLUE};
    color: ${colors.SECONDARY_HOVER};
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
  color: ${colors.SECONDARY};
  justify-content: center;
  align-self: end;

  &:hover {
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid ${colors.SECONDARY_HOVER};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    color: ${colors.SECONDARY_HOVER};
  }
`;