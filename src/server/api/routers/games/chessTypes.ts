export enum pieceType {
  KING = "KING",
  QUEEN = "QUEEN",
  BISHOP = "BISHOP",
  KNIGHT = "KNIGHT",
  PAWN = "PAWN",
  ROOK = "ROOK",
}

export enum boardFile {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
}

export enum boardRank {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
}

export enum pieceColour {
  WHITE = "WHITE",
  BLACK = "BLACK",
}

export interface chessBoard {
  pieces: chessPiece[];
}

interface chessPiece {
  type: pieceType;
  file: boardFile;
  rank: boardRank;
  colour: pieceColour;
}

export const NEW_CHESS_BOARD: chessBoard = {
  pieces: [
    {
      type: pieceType.ROOK,
      file: boardFile.A,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.KNIGHT,
      file: boardFile.B,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.BISHOP,
      file: boardFile.C,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.QUEEN,
      file: boardFile.D,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.KING,
      file: boardFile.E,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.BISHOP,
      file: boardFile.F,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.KNIGHT,
      file: boardFile.G,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.ROOK,
      file: boardFile.H,
      rank: 1,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.A,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.B,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.C,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.D,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.E,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.F,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.G,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.H,
      rank: 2,
      colour: pieceColour.WHITE,
    },
    {
      type: pieceType.ROOK,
      file: boardFile.A,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.KNIGHT,
      file: boardFile.B,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.BISHOP,
      file: boardFile.C,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.QUEEN,
      file: boardFile.D,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.KING,
      file: boardFile.E,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.BISHOP,
      file: boardFile.F,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.KNIGHT,
      file: boardFile.G,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.ROOK,
      file: boardFile.H,
      rank: 8,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.A,
      rank: 7,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.B,
      rank: 7,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.C,
      rank: 7,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.D,
      rank: 7,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.E,
      rank: 7,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.F,
      rank: 7,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.G,
      rank: 7,
      colour: pieceColour.BLACK,
    },
    {
      type: pieceType.PAWN,
      file: boardFile.H,
      rank: 7,
      colour: pieceColour.BLACK,
    },
  ],
};
