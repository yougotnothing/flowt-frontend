import styled from "styled-components";
import { colors } from "../../../../consts/colors.const";
import { BUTTON, TITLE, INPUT } from "../../../../consts/styles.const";

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
  margin: 0 auto;
  padding: 2em;
  border-radius: 18px;
  gap: 24px;
  background-color: ${colors.FRONT};
  width: max-content;
  height: max-content;
`;


export const Input = styled('textarea')`
  ${INPUT};

  width: 92%;
  height: 220px;
  padding-top: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  resize: none;
`;

export const Button = styled('button')`
  ${BUTTON};

  width: 142px;
  height: 46px;
`;

export const Title = styled('div')`
  ${TITLE};
`;

export const Error = styled('div')`
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.RED};
`;