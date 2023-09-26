import styled from "styled-components";
import { colors } from "../../../consts/colors.const";

export const Spinner = styled('div')`
  width: 3em;
  height: 3em;
  border: 6px solid;
  margin: auto;
  border-color: ${colors.SECONDARY} transparent ${colors.SECONDARY} transparent;
  border-radius: 50%;
  animation: spin-anim 0.8s linear infinite;

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const PageLoaderContainer = styled('div')`
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 55%;
  left: 50%;
`;