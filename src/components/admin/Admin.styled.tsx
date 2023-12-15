import styled from "styled-components";
import { colors } from "../../constants/colors.const";
import { BUTTON, INPUT } from "../../constants/styles.const";

interface IGetUserData {
  $type: 'username' | 'else';
}

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
  flex-direction: column;
  align-items: start;
  width: 100%;
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
  width: 800px;
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
  width: 210px;
  height: 210px;
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
  gap: 16px;
  border-radius: 12px;
  width: 816px;
  padding: 4px;
`;

export const Droplist = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;
  padding: 4px;
  width: 428px;
  min-height: 120px;
  max-height: 364px;
  overflow-y: scroll;
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
  align-items: center;
  gap: 4px;
  width: 168px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 6px;
`;

export const MenuItem = styled('button')`
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
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
