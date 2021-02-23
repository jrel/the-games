import { Game } from './game';
import { Board } from './board';

describe('The Game', () => {
  it('should be have a board', () => {
    const game = new Game();

    const board = game.board;

    expect(board).toBeInstanceOf(Board);
  });
});
