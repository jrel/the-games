import { Card, Suit, Value } from "./Card";

export class Deck {

  private static factory(): Card[] {
    function keys<O extends object>(obj: O): (keyof O)[] {
      return Object.keys(obj).filter((key) =>
        Number.isNaN(+key)
      ) as (keyof O)[];
    }

    const suits = keys(Suit).map((suit) => Suit[suit]);
    const values = keys(Value).map((value) => Value[value]);

    return suits
      .concat(suits)
      .reduce(
        (deck, suit) =>
          deck.concat(values.map((value) => new Card(suit, value))),
        new Array<Card>()
      );
  }

  constructor(private items: Card[] = Deck.factory()) {}

  shuffle() {
    const cards = this.items;

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return this;
  }

  pop() {
    const card = this.items.pop();
    if (card) return card;
    throw new Error("Underflow");
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
