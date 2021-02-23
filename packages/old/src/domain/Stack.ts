export class Stack<T> {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly items: T[] = []
  ) {}

  get length(): number {
    return this.items.length;
  }

  push(element: T) {
    this.items.push(element);
    return false;
  }

  pop() {
    const card = this.items.pop();
    if (card) return card;
    throw new Error("Underflow");
  }

  peek() {
    const card = this.items[this.items.length - 1];
    if (card) return card;
    throw new Error("Underflow");
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
