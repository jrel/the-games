export enum Suit {
  diamonds,
  clubs,
  hearts,
  spades,
}

export enum Value {
  ACE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  QUEEN,
  JACK,
  KING,
}

export class Card {
  constructor(public suit: Suit, public value: Value) {}

  get id(): string {
    return `${this.suit}:${this.value}`;
  }
}
