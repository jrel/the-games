import styled from "styled-components";
const GOLD_NUMBER = (1 + Math.sqrt(5)) / 2;
export const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(
    8,
    calc(${80 / 4 / GOLD_NUMBER}vh - ${16 / 3}px)
  );
  grid-template-rows: repeat(4, calc(${80 / 4}vh - ${16 / 3}px));
  grid-gap: 16px;
`;
