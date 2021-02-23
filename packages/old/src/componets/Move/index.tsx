import React, { CSSProperties } from "react";
import { Vector } from "../Shadow";
import { Container } from "./styles";

interface Props {
  from: Vector;
  to: Vector;
  children: React.ReactNode;

  onAnimationEnd: (event: React.AnimationEvent<HTMLDivElement>) => void;

  duration?: CSSProperties["animationDuration"];
  timingFunction?: CSSProperties["animationTimingFunction"];
  delay?: CSSProperties["animationDelay"];
  iterationCount?: CSSProperties["animationIterationCount"];
  direction?: CSSProperties["animationDirection"];
  fillMode?: CSSProperties["animationFillMode"];
  playState?: CSSProperties["animationPlayState"];
}

const Move: React.FC<Props> = ({
  from,
  to,
  children,
  duration,
  timingFunction,
  delay,
  iterationCount,
  direction,
  fillMode,
  playState,
  onAnimationEnd,
}) => {
  return (
    <Container
      from={from}
      to={to}
      style={{
        animationDuration: duration,
        animationTimingFunction: timingFunction,
        animationDelay: delay,
        animationIterationCount: iterationCount,
        animationDirection: direction,
        animationFillMode: fillMode ?? "forwards",
        animationPlayState: playState,
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </Container>
  );
};
export default Move;
