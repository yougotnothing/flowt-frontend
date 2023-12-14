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
  background-color: ${colors.FRONT};
  padding: 8px;
  border-radius: 12px;
  overflow-y: auto;
  max-height: 620px;
  border: 2px solid ${colors.BORDER};
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

export const Droplist = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: ${colors.FRONT};
  border: 2px solid ${colors.BORDER};
  border-radius: 8px;
  padding: 4px;
  width: 368px;
  max-height: 364px;
  overflow-y: scroll;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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

export const DroplistItemInfo = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  border-left: 1px soild ${colors.WHITE};
  background-color:#0000007a;
`;

export const DroplistItemButton = styled('div')`
  width: 120px;
  height: 32px;
  
  ${BUTTON}
`;