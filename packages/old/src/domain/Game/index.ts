import { Deck } from "../Deck";
import { Stack } from "../Stack";
import { Card, Value } from "../Card";
import { rowValidators } from "./stack-validator";

export class Game {
  private deck: Deck;
  public grid: Stack<Card>[];
  private history = new Array<{ from: Stack<Card>; to: Stack<Card> }>();

  constructor() {
    this.deck = new Deck().shuffle();

    this.grid = Array.from(
      { length: 8 * 4 },
      (_, i) => new Stack(i % 8, Math.floor(i / 8))
    );
  }

  start() {
    this.grid.slice(0, 8 * 3).forEach((place) => place.push(this.deck.pop()));

    return this.clone();
  }

  give() {
    this.grid.slice(8 * 3).forEach((place) => place.push(this.deck.pop()));

    return this.clone();
  }

  deckIsEmpty(): any {
    return this.deck.isEmpty();
  }

  move(from: Stack<Card>, to: Stack<Card>) {
    const rowValidator = rowValidators[to.y];
    const card = from.peek();
    if (rowValidator(card, to)) {
      to.push(from.pop());
      this.history.push({ from, to });
    }
  }

  trash(from: Stack<Card>) {
    const card = from.peek();
    if (card.value === Value.ACE) {
      from.pop();
    }
  }
  clone() {
    const game = new Game();

    game.deck = this.deck;
    game.grid = this.grid;

    return game;
  }
}
