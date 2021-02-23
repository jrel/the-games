import { Card, Value } from "../Card";
import { Stack } from "../Stack";

export interface StackValidator {
  (item: Card, items: Stack<Card>): boolean;
}

function rowValidatorFacotry(objective: Value[]): StackValidator {
  return (item, { items }) => {
    const next = items.concat(item);

    if (next.length > 4) {
      return false;
    }

    const stackSuit = item.suit;

    return (
      next.every(({ suit }) => suit === stackSuit) &&
      next.every(({ value }, i) => value === objective[i])
    );
  };
}
export const rowValidators: [
  StackValidator,
  StackValidator,
  StackValidator,
  StackValidator
] = [
  rowValidatorFacotry([Value.TWO, Value.FIVE, Value.EIGHT, Value.QUEEN]),
  rowValidatorFacotry([Value.THREE, Value.SIX, Value.NINE, Value.JACK]),
  rowValidatorFacotry([Value.FOUR, Value.SEVEN, Value.TEN, Value.KING]),
  () => false,
];
