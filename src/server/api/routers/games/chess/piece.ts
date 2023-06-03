import type { chessBoard } from "../chessTypes";
import type { Position } from "./position";

export abstract class Piece {
  private position: Position;
  private colour: "WHITE" | "BLACK";

  constructor(position: Position, colour: "WHITE" | "BLACK") {
    this.position = position;
    this.colour = colour;
  }

  public getPosition(): Position {
    return this.position;
  }

  public getColour(): "WHITE" | "BLACK" {
    return this.colour;
  }

  public abstract getValidMoves(board: chessBoard): Position[];
}
