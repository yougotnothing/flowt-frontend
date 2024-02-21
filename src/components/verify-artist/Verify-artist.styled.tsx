import styled, { css, keyframes } from "styled-components";
import { colors } from "../../constants/colors.const";
import { BUTTON, INPUT } from "../../constants/styles.const";

interface IBirthdayDataButton {
  $type: 'Mounth' | 'Switch';
}

interface IBirthdayContainer {
  $isOpen: boolean;
}

const onError = keyframes`
  from {
    border-color: ${colors.BORDER};
  }
  to {
    border-color: ${colors.RED};
  }
`;

const noError = keyframes`
  from {
    border-color: ${colors.RED};
  }
  to {
    border-color: ${colors.BORDER};
  }
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 26px;
  margin: 0 auto;
  width: 1200px;
`;

export const Card = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  padding: 6px;
  border-radius: 12px;
  position: relative;
  justify-content: space-between;
  @media (max-width: 460px) {
    width: max-content;
    height: max-content;
  }
`;

export const PersonalDataContainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: 12px;

  @media (max-width: 460px) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const PersonalData = styled('input')`
  height: 34px;
  width: 234px;
  ${INPUT}
`;

export const ConfirmButton = styled('button')`
  width: 163px;
  height: 34px;
  ${BUTTON}
`;

export const BirthdayMounthContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.BORDER};
  width: 100%;
`;

export const BirthdayMountData = styled('button')<IBirthdayDataButton>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: ${({ $type }) => $type === 'Mounth' ? '22px' : '17px'};
  color: ${colors.WHITE};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.DARK_WHITE};
  }
`;

export const DataContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Date = styled('button')`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.WHITE};

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY};
  }
`;

export const Header = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 19px;
  }
`;

export const BirthdayButton = styled('button')`
  background-color: ${colors.DARK_BLUE};
  color:  ${colors.DARK_WHITE};
  border: 2px solid ${colors.BORDER};
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  width: 120px;
  height: 34px;
  transition: 0.3s ease;
  border-radius: 34px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY};
  }
`;

interface IInput {
  $isError: boolean;
  $width?: string;
}

export const Input = styled('input')<IInput>`
  width: ${({ $width }) => $width ? $width : '140px'};
  height: 32px;
  border: 2px solid ${({ $isError }) => $isError ? colors.RED : colors.BORDER};
  border-radius: 12px;
  background-color: ${colors.VERY_DARK_BLUE};
  color: ${colors.DARK_WHITE};
  padding-left: 12px;
  outline: none;
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 18px;
  transition: all 0.3s ease;
  border-color: ${({ $isError }) => $isError ? colors.RED : colors.BORDER} !important;
  animation: ${({ $isError }) => $isError ? css`${onError} 0.3s ease` : css`${noError} 0.3s ease`};

  &::placeholder {
    opacity: 1;
  }

  &:hover {
    background-color: ${colors.DARK_BLUE};
    color: ${colors.WHITE};
  }

  @media (max-width: 460px) {
    font-size: 13px;
    height: 26px;
    width: 126px;
    border-radius: 8px;
    padding-left: 6px;
  }
`;

export const BirthdayButtonsContainer = styled('div')<IBirthdayContainer>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  background-color: ${colors.DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  gap: 6px;
  padding: 8px;
  max-height: 280px;
  border-radius: 8px;
  overflow-y: scroll;
`;

export const BirthdayDroplistButton = styled('button')`
  background: none;
  color: ${colors.WHITE};
  border: 2px solid transparent;
  font-weight: 600;
  font-size: 18px;
  font-family: 'Urbanist', sans-serif;
  transition: 0.3s ease-in-out;
  width: 88px;
  text-align: start;
  cursor: pointer;

  &:hover {
    color: ${colors.DARK_WHITE};
    border-bottom-color: ${colors.DARK_WHITE};
  }
`;

export const BirthdayContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 12px;

  @media (max-width: 460px) {
    flex-direction: column;
    align-self: flex-start;
    gap: 8px;
  }
`;

export const LinksContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const LinkButton = styled('button')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.DARK_WHITE};
  background-color: ${colors.DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  height: 34px;
  border-radius: 34px;
  width: 142px;
  transition: 0.3s ease;
  cursor: pointer;

  @media (max-width: 460px) {
    font-size: 14px;
    width: 82px;
    height: 28px;
  }

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY};
  }
`;

interface ICountryContainer {
  $isOpen: boolean;
}

export const CountryContainer = styled('div')<ICountryContainer>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  top: 182px;
  flex-direction: column;
  gap: 6px;
  border: 2px solid ${colors.BORDER};
  padding: 6px;
  border-radius: 12px;
  background-color: ${colors.DARK_BLUE};
  overflow-y: auto;
  max-height: 240px;
  position: absolute;

  @media (max-width: 460px) {
    top: 204px;
  }
`;

export const CountryTextWrapper = styled('div')`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CountryButton = styled('button')`
  border: none;
  border-radius: 6px;
  width: 164px;
  background-color: ${colors.VERY_DARK_BLUE};
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.DARK_WHITE};
  transition: 0.3s ease;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${colors.BORDER};
    color: ${colors.SECONDARY};
  }

  @media (max-width: 460px) {
    font-size: 14px;
    width: 122px;
  }
`;

interface P_Props {
  $align: 'flex-start' | 'center' | 'flex-end';
}

export const P = styled('div')<P_Props>`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    align-self: ${({ $align }) => $align};
    font-size: 13px;
  }
`;

export const CountryContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const FooterContent = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: end;

  @media (max-width: 460px) {
    flex-direction: column-reverse;
    gap: 14px;
    align-items: center;
  }
`;