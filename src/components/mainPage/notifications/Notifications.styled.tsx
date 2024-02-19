import styled, { keyframes, css } from "styled-components";
import { colors } from "../../../constants/colors.const";
import { BUTTON, TITLE } from "../../../constants/styles.const";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export interface IDroplist {
  $isOpen: boolean;
}

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 1200px;
  align-self: center;
  margin: auto;
  gap: 36px;

  @media (max-width: 460px) {
    width: 96%;
    gap: 12px;
  }
`;

export const ContentContainer = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 24px;
  height: 700px;

  @media (max-width: 460px) {
    height: 100%;
    gap: 8px;
  }
`;

export const ButtonsContainer = styled("div")`
  display: flex;
  width: 25%;
  height: max-content;
  flex-direction: column;
  align-items: start;
  border: 2px solid ${colors.BORDER};
  border-radius: 16px;
  padding: 12px;
  gap: 14px;
`;

export const Button = styled("button")`
  ${BUTTON};

  width: 140px;
  height: 42px;
`;

export const NoticesContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  gap: 18px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 18px;
  width: 1000px;
  height: 672px;
  overflow-y: auto;
  margin: 0 auto;
`;

export const Notices = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  padding: 14px;
  gap: 24px;
  border: 2px solid ${colors.WHITE};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  background-color: ${colors.FRONT};
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: 460px) {
    width: 96%;
    padding: 8px;
    border-bottom-width: 1px;
  }
`;

export const Droplist = styled('div')<IDroplist>`
  padding: 6px;
  gap: 9px;
  display: flex;
  opacity: ${props => !props.$isOpen ? '0' : '1'};
  animation: ${props => props.$isOpen ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
  flex-direction: column;
  align-items: start;
  position: absolute;
  place-self: end;
  background-color: ${colors.FRONT_HOVER};
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;

  @media (max-width: 460px) {
    padding: 4px;
    gap: 5px;
    border-width: 1px;
    border-radius: 6px;
  }
`;

export const DroplistItem = styled('button')`
  width: 160px;
  height: 34px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.DARK_WHITE};
  background-color: transparent;
  border: 2px solid transparent;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  cursor: pointer;
  transition: 0.3s;

  @media (max-width: 460px) {
    width: max-content;
    height: 27px;
    font-size: 12px;
  }
  
  &:hover {
    color: ${colors.WHITE};
    border-color: ${colors.WHITE};
  }
`;

export const Title = styled("div")`
  ${TITLE};
`;

export const NoticeTitle = styled("div")`
  font-weight: 600;
  font-family: "Urbanist", sans-serif;
  font-size: 16px;
  color: ${colors.WHITE};

  @media (max-width: 460px) {
    font-size: 13px;
  }
`;

export const NoticeIcon = styled("picture")`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export const NoticeDataContainer = styled("div")`
  display: flex;
  flex-direction: row;
  background-color: ${colors.GREY};
  border-radius: 6px;
`;

export const NoticeDataTitle = styled("div")`
  font-family: "Urbanist", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.WHITE};
`;

export const NoticeHeader = styled('div')`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.WHITE};
`;

export const NoticeNav = styled('div')`
  max-width: 240px;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: start;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 10px;
  padding: 6px;
`;

export const SortButton = styled('button')`
  width: 120px;
  height: 42px;
  text-align: start;
  color: ${colors.WHITE};
  background-color: ${colors.FRONT};
  border: none;
  cursor: pointer;
  font-family: 'urbanist', sans-serif;
  font-size: 18px;
  font-weight: 600;
  transition: 0.3s;
  
  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const SortButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 4px;
  border: 1px solid ${colors.DARK_WHITE};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

export const ReadIcon = styled('picture')`
  width: 42px;
  height: 42px;
  background-image: url("/read.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;