import { Board } from './board';
import { Player } from './player.enum';

describe('Board', () => {
  let board: Board<Player>;

  beforeEach(() => {
    board = new Board(3, 3);
  });

  it('shold be create internal array with 9 cells', () => {
    expect((board as any).board.length).toEqual(9);
  });
  describe('should be possible get', () => {
    it('the rows', () => {
      expect(board.rows).toBeDefined();
    });

    it('the columns', () => {
      expect(board.columns).toBeDefined();
    });

    it('the info presente in cell', () => {
      expect(board.getCell({ column: 0, row: 0 })).toBe(undefined);

      board.setOnCell(Player.FIRST, { column: 0, row: 0 });

      expect(board.getCell({ column: 0, row: 0 })).toBe(Player.FIRST);
    });
  });

  it('should be throw a error on occupied cell', () => {
    const cell = { column: 0, row: 0 };
    // const plyaer = board.getCell(cell);

    board.setOnCell(Player.FIRST, cell);

    expect(() => board.setOnCell(Player.SECOND, cell)).toThrowError();
  });
  describe('should be have', () => {
    it('3 rows', () => {
      expect(board.rows).toEqual(expect.arrayContaining([0, 1, 2]));
    });

    it('3 columns', () => {
      expect(board.columns).toEqual(expect.arrayContaining([0, 1, 2]));
    });
  });
});
