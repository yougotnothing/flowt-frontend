import styled, { css, keyframes } from "styled-components";
import { colors } from "../../constants/colors.const";
import { BUTTON, INPUT } from "../../constants/styles.const";

interface IGetUserData {
  $type: 'username' | 'else';
}

interface IDroplist {
  $isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  gap: 24px;
  margin: 0 auto;
`;

export const AdminPanel = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 8px;
  width: 100%;
  padding-bottom: 6px;
  border-bottom: 2px solid ${colors.SECONDARY};
`;

export const AdminPanelButtons = styled('button')`
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.SECONDARY};
  }
`;

export const GetUserContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-evenly;
  background-image: linear-gradient(60deg, #586c6c 0%, #5bceb5 210%);
  padding: 8px;
  border-radius: 12px;
  overflow-y: auto;
  width: 1180px;
  justify-content: space-between;
  border: 2px solid ${colors.BORDER};
`;

export const GetUserMainInfoContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const GetUserInput = styled('input')`
  ${INPUT}

  border-radius: 8px !important;
  width: 260px;
  height: 32px;
`;

export const GetUserInputButton = styled('button')`
  width: 38px;
  height: 38px;
  background-color: ${colors.SECONDARY};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-image: url('/scope.png');
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
  border: none;

  &:hover {
    background-color: ${colors.SECONDARY_HOVER};
  }
`;

export const GetUserAvatar = styled('img')`
  object-fit: cover;
  width: 280px;
  height: 280px;
  border-radius: 50%;
`;

export const GetUserDataContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: rgba(0, 0, 0, 0.3);
  border-left: 1px solid white;
  padding: 4px;
  gap: 10px;
`;

export const GetUserData = styled('div')<IGetUserData>`
  font-size: ${props => props.$type === 'username' ? '22px' : '18px'};
  font-family: 'Urbanist', sans-serif;
  font-weight: ${props => props.$type === 'username' ? '800' : '600'};
  color: ${props => props.$type === 'username' ? colors.WHITE : colors.DARK_WHITE};
`;

export const GetUserInputContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const DroplistContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 16px;
  border-radius: 12px;
  width: 816px;
  padding: 4px;
`;

export const Droplist = styled('div')<IDroplist>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  position: absolute;
  gap: 4px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;
  padding: 4px;
  width: 428px;
  min-height: 120px;
  max-height: 364px;
  overflow-y: scroll;
  top: 50px;
`;

export const DroplistItem = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${colors.WHITE};
`;

export const DroplistAvatar = styled('img')`
  object-fit: cover;
  border-radius: 50%;
  height: 120px;
  width: 120px;
`;

export const DroplistItemInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  border-left: 1px soild ${colors.WHITE};
  background-color:#0000007a;
`;

export const DroplistItemInfo = styled('div')`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const DroplistItemButton = styled('button')`
  ${BUTTON}
`;

export const Menu = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  align-self: center;
  gap: 8px;
  padding: 6px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 6px;
`;

export const MenuItem = styled('button')`
  font-family: 'Urbanist', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.WHITE};
  text-align: start;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  transition: border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${colors.WHITE};
  }
`;

export const Message = styled('div')`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
  margin: auto;
`;

export const ReportsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 6px;
  border-radius: 8px;
  border: 2px solid ${colors.BORDER};
  background-color: ${colors.FRONT};
  gap: 6px;
  width: 1184px;
`;

export const Report = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom: 1px solid ${colors.WHITE};
  width: 100%;
  padding: 4px;
`;

interface IReportTextProps {
  $type: 'report mail' | 'info';
}

export const ReportText = styled('div')<IReportTextProps>`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.WHITE};
  ${props => props.$type === 'report mail' && 'margin: auto;'};
`;

interface IReportButtonProps {
  $isOpen: boolean;
}

export const ReportButtonsContainer = styled('div')<IReportButtonProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 6px;
  background-color: ${colors.DARK_BLUE};
  border: 2px solid ${colors.BORDER};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  animation: ${props => props.$isOpen ? css`${fadeIn} 0.3s ease` : css`${fadeOut} 0.3s ease`};
`;

export const ReportButton = styled('button')`
  ${BUTTON}

  border-radius: 4px;
  border-color: transparent;
  height: 32px;
`;

export const ReportTextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
`;

export const ReportNav = styled('div')`
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 8px;
  padding: 4px;
  border-bottom: 2px solid ${colors.BORDER};
`;

export const ReportNavButton = styled('button')`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  transition: 0.3s ease;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;

  &:hover {
    color: ${colors.SECONDARY};
    border-color: ${colors.SECONDARY_HOVER};
  }
`;

export const Header = styled('div')`
  display: flex;
  align-self: flex-start;
  font-size: 22px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const UserInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 1188px;
  border: 2px solid ${colors.BORDER};
  background-color: ${colors.FRONT};
  border-radius: 6px;
  padding: 4px;
  gap: 12px;
`;

export const UserInfo = styled('div')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const UserInfoSpan = styled('span')`
  color: ${colors.SECONDARY};
`;

export const UserInfoDescriptionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 6px;
  gap: 12px;
  border: 2px solid ${colors.BORDER};
  padding: 4px;
  background-color: ${colors.FRONT};
`;

export const VerifyArtistsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 1200px;
  gap: 24px;
`;

export const ArtistDataContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  padding: 8px;
  border-radius: 12px;
  gap: 8px;
`;

export const ArtistDataSpan = styled('span')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.WHITE};
`;

export const ArtistData = styled('div')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.DARK_WHITE};
`;

export const ArtistDataLink = styled('a')`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Urbanist', sans-serif;
  color: ${colors.SECONDARY};
`;

interface IArtistDataButton {
  $type: 'apply' | 'decline';
}

export const ArtistDataButton = styled('button')<IArtistDataButton>`
  ${BUTTON}
  height: 34px;
  width: 146px;

  &:hover {
    background-color: ${({ $type }) => $type === 'apply' ? colors.GREEN : colors.RED} !important;
    color: ${colors.WHITE} !important;
  }
`;

export const ArtistDataButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 319.55px;
`;

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  gap: 18px;
`;