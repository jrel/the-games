import styled, { keyframes } from "styled-components";
import { Vector } from "../Shadow";

interface Props {
  from: Vector;
  to: Vector;
}

const keyframesFactory = ({ from, to }: Props) =>
  keyframes`
    from{
        left: ${from.x}px;
        top: ${from.y}px;
    }
    to {
        left: ${to.x}px;
        top: ${to.y}px;
     }
`;

export const Container = styled.div<Props>`
  position: absolute;
  animation-name: ${keyframesFactory};
  z-index: 10;
`;
