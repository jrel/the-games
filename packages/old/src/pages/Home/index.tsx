import React, { useState, useEffect, useMemo, useCallback, FC } from "react";

import { Container, Board } from "./styles";
import { Game } from "../../domain/Game";
import { Card as DCard } from "../../domain/Card";
import Card from "../../componets/Card";
import { Stack } from "../../domain/Stack";
import Shadow, { Vector } from "../../componets/Shadow";
import Move from "../../componets/Move";

let KEY = 1;
const Home: FC = () => {
  const [game, setGame] = useState(new Game());
  const [ativeStack, setAtiveStack] = useState<Stack<DCard>>();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [shadows, setShadows] = useState<
    { key: number; card: DCard; from: Vector; to: Vector }[]
  >([]);

  useEffect(() => setGame((prev) => prev.start()), [setGame]);

  const disableGiveButton = useMemo(() => {
    return game.deckIsEmpty();
  }, [game]);

  const onGive = useCallback(() => {
    setGame(game.give());
  }, [game, setGame]);

  const onDragStart = useCallback(
    (e: React.MouseEvent, stack: Stack<DCard>) => {
      e.preventDefault();
      setAtiveStack(stack);

      const offset = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
      setOffset(offset);

      const origin = { x: e.clientX - offset.x, y: e.clientY - offset.y };

      const onMouseleave = (e: MouseEvent) => {
        document.removeEventListener("mouseup", onMouseleave);
        const from = { x: e.clientX - offset.x, y: e.clientY - offset.y };

        if (stack.isEmpty()) {
          const card = stack.peek();

          setShadows((prev) =>
            prev.concat({ key: KEY++, to: origin, card, from })
          );
        }
        setAtiveStack(undefined);
      };
      document.addEventListener("mouseup", onMouseleave);
    },
    [setAtiveStack]
  );

  const onDrop = useCallback(
    (event: React.MouseEvent, stack?: Stack<DCard>) => {
      event.preventDefault();
      if (ativeStack) {
        if (stack) game.move(ativeStack, stack);
        else game.trash(ativeStack);
      }
      setGame((prev) => prev.clone());
      setAtiveStack(undefined);
    },
    [ativeStack, setGame, setAtiveStack, game]
  );
  const activeCard = ativeStack?.peek();
  return (
    <Container>
      <button type="button" onClick={onGive} disabled={disableGiveButton}>
        Give
      </button>

      {activeCard && (
        <Shadow offset={offset}>
          <Card value={activeCard.value} suit={activeCard.suit} highlight />
        </Shadow>
      )}
      {shadows.map((shadow) => (
        <Move
          key={shadow.key}
          to={shadow.to}
          from={shadow.from}
          duration=".2s"
          onAnimationEnd={() => {
            setShadows((prev) => prev.filter((item) => shadow !== item));
          }}
        >
          <Card value={shadow.card.value} suit={shadow.card.suit} />
        </Move>
      ))}
      <Board>
        {game.grid.map((stack, i) => {
          if (!stack.isEmpty()) {
            const card = stack.peek();

            return (
              <div
                key={i}
                onMouseDown={(event) => onDragStart(event, stack)}
                onMouseUp={(event) => onDrop(event, stack)}
              >
                <Card
                  value={card.value}
                  suit={card.suit}
                  highlight={card === activeCard}
                  multiple={stack.length !== 1}
                />
              </div>
            );
          }
          return <div key={i} onMouseUp={(event) => onDrop(event, stack)} />;
        })}
      </Board>
      <div onMouseUp={(event) => onDrop(event)}>Trash</div>
    </Container>
  );
};

export default Home;
