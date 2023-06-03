import { type chessBoard } from "../chessTypes";

export class ChessController {
  private board: chessBoard;

  constructor(chessBoard: chessBoard) {
    this.board = chessBoard;
  }
}
