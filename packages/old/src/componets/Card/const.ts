import { Suit, Value } from "../../domain/Card";

export const Const = {
  suit: {
    [Suit.diamonds]: { symbol: "♦", color: "#ff0000" },
    [Suit.clubs]: { symbol: "♣", color: "#000000" },
    [Suit.hearts]: { symbol: "♥", color: "#ff0000" },
    [Suit.spades]: { symbol: "♠", color: "#000000" },
  },
  value: {
    [Value.ACE]: { symbol: "A" },
    [Value.TWO]: { symbol: "2" },
    [Value.THREE]: { symbol: "3" },
    [Value.FOUR]: { symbol: "4" },
    [Value.FIVE]: { symbol: "5" },
    [Value.SIX]: { symbol: "6" },
    [Value.SEVEN]: { symbol: "7" },
    [Value.EIGHT]: { symbol: "8" },
    [Value.NINE]: { symbol: "9" },
    [Value.TEN]: { symbol: "10" },
    [Value.QUEEN]: { symbol: "Q" },
    [Value.JACK]: { symbol: "J" },
    [Value.KING]: { symbol: "K" },
  },
};
