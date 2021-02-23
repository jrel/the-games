import { Player } from './player.enum';
import { Cell } from './cell.interface';
import { Board } from './board';

export class Game {
  readonly board: Board<Player>;
  private currentPlayer: Player;

  constructor() {
    this.board = new Board(3, 3);
    this.currentPlayer = Player.FIRST;
  }

  play(player: Player, cell: Cell) {
    if (this.isGameOver()) {
      throw new Error('Game over');
    }

    this.move(player, cell);
    this.currentPlayer =
      this.currentPlayer === Player.FIRST ? Player.SECOND : Player.FIRST;
  }

  move(player: Player, cell: Cell): void {
    if (player !== this.currentPlayer) {
      throw new Error('Illigal player move');
    }

    this.board.setOnCell(player, cell);
  }

  isGameOver(): boolean {
    return this.allCellsOccupied() || this.getWinLines().length > 0;
  }

  getWinPlayer() {
    const winLines = this.getWinLines();

    if (winLines.length === 0) {
      throw new Error('No winning player');
    }
    return winLines[0][0];
  }

  private allCellsOccupied() {
    const cells = [0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((column) => this.cellFactory([row, column])),
    );

    return cells.every((cell) => this.board.isOccupied(cell));
  }

  private getWinLines() {
    const lines: Array<[
      [number, number],
      [number, number],
      [number, number],
    ]> = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [0, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [2, 0],
        [1, 1],
        [0, 2],
      ],
    ];

    const cells = lines.map((line) =>
      line.map((cell) => this.cellFactory(cell)),
    );
    const playersOnLines = cells.map((line) =>
      line.map((cell) => this.board.getCell(cell)),
    );

    const linesWin = playersOnLines.filter(
      ([first, ...line]) =>
        first !== undefined && line.every((player) => player === first),
    );

    return linesWin;
  }

  private cellFactory([row, column]: [number, number]): Cell {
    return { row, column };
  }
}
