import React from "react";
import * as DCard from "../../domain/Card";
import { Const } from "./const";
import "./styles.ts";
import { Container, Info, Value, Suit, Shadow } from "./styles";

interface Props extends Omit<DCard.Card, "id"> {
  highlight?: boolean;
  multiple?: boolean;
}

const Card: React.FC<Props> = ({
  suit,
  value,
  highlight,
  multiple = false,
}) => {
  const { symbol: valueSymbol } = Const.value[value];
  const { symbol: suitSymbol, color } = Const.suit[suit];

  return (
    <>
      <Container
        style={{ color }}
        className={highlight ? `highlight` : undefined}
      >
        {multiple && <Shadow />}
        <Info className="top">
          <Value>{valueSymbol}</Value>
          <Suit>{suitSymbol}</Suit>
        </Info>
        <Info className=" bottom">
          <Value>{valueSymbol}</Value>
          <Suit>{suitSymbol}</Suit>
        </Info>
      </Container>
    </>
  );
};
export default Card;
