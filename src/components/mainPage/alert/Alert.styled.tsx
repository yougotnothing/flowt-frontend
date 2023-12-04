import styled from 'styled-components';
import { colors } from '../../../constants/colors.const';

interface IAlert {
  $type: 'Warning' | 'Success';
}

export const Container = styled('div')<IAlert>`
  background-color: ${props => props.$type === 'Warning' ? '#d5c01edfa' : '#30dc3bf'};
  color: ${props => props.$type === 'Warning' ? `${colors.DARK_BLUE}` : `${colors.WHITE}`};
`;