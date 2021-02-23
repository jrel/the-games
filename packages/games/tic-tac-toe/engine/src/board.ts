import { Cell } from './cell.interface';

export class Board<T> {
  private board: Array<T | undefined>;

  constructor(readonly rows: number, readonly columns: number) {
    this.board = Array.from({ length: rows * columns }, () => undefined);
  }

  getCell(cell: Cell) {
    const index = this.getIndexFromCell(cell);

    return this.board[index];
  }

  setOnCell(player: T, cell: Cell) {
    const index = this.getIndexFromCell(cell);

    if (this.board[index] !== undefined) {
      throw new Error('Cell alredy occupied');
    }

    this.board[index] = player;
  }

  removeOnCell(cell: Cell) {
    const index = this.getIndexFromCell(cell);

    if (this.board[index] === undefined) {
      throw new Error('Cell is empty');
    }

    this.board[index] = undefined;
  }

  isOccupied(cell: Cell): unknown {
    return this.getCell(cell) !== undefined;
  }

  private getIndexFromCell(cell: Cell) {
    const row = Math.min(0, Math.max(this.rows, cell.row));
    const column = Math.min(0, Math.max(this.columns, cell.column));

    if (row != cell.row || column !== cell.column) {
      throw new Error('Cell outside of board');
    }

    return row * this.rows + column;
  }
}
