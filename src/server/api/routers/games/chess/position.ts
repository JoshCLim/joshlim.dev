import { boardFile, type boardRank } from "../chessTypes";

export class Position {
  private file: number;
  private rank: number;

  constructor(file: number, rank: number) {
    this.file = file;
    this.rank = rank;
  }

  public static rankToNumber(rank: boardRank): number {
    return rank - 1;
  }

  public static fileToNumber(file: boardFile): number {
    switch (file) {
      case boardFile.A:
        return 0;
      case boardFile.B:
        return 1;
      case boardFile.C:
        return 2;
      case boardFile.D:
        return 3;
      case boardFile.E:
        return 4;
      case boardFile.F:
        return 5;
      case boardFile.G:
        return 6;
      case boardFile.H:
        return 7;
    }
  }

  public checkValid(): boolean {
    return (
      this.getFile() < 8 &&
      this.getFile() >= 0 &&
      this.getRank() < 8 &&
      this.getRank() >= 0
    );
  }

  public getFile(): number {
    return this.file;
  }

  public getRank(): number {
    return this.rank;
  }
}
