import styled from "styled-components";

const GOLD_NUMBER = (1 + Math.sqrt(5)) / 2;

export const Container = styled.div`
  position: relative;
  width: calc(${80 / 4 / GOLD_NUMBER}vh - ${16 / 3}px);
  height: calc(${80 / 4}vh - ${16 / 3}px);

  background: #eeeeee;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  &.highlight {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 6px #55f548;
  }
`;

export const Shadow = styled.div`
  position: absolute;
  top: 5px;
  left: 3px;
  z-index: -1;

  height: 100%;
  width: 100%;

  background: #eeeeee;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  align-items: center;
  position: absolute;

  &.top {
    left: 10px;
    top: 10px;
  }

  &.bottom {
    right: 10px;
    bottom: 10px;

    transform: rotate(-180deg);
  }
`;
export const Value = styled.div`
  font-size: 48px;
`;
export const Suit = styled.div`
  font-size: 48px;
  line-height: 24px;
`;
