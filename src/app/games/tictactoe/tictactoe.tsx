"use client";

import { useState } from "react";

import { cn } from "~/app/utils";

import { motion, useSpring } from "framer-motion";

type Player = "X" | "O";
type Square = Player | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null | "draw">(null);

  const boardRotate = useSpring(0);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);

    boardRotate.set(Math.ceil(boardRotate.get() / 180) * 180 + 180);
  };

  const checkWinner = (squares: Square[]): Player | null => {
    const lines: [number, number, number][] = [
      [0, 1, 2], // horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonal
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a] ?? null;
      }
    }

    return null;
  };

  const move = (i: number) => {
    if (board[i] ?? winner) return;

    // update board
    const newBoard = [...board];
    newBoard[i] = turn;

    // check for draw
    if (newBoard.every((square) => square)) setWinner("draw");

    // check for winner
    const w = checkWinner(newBoard);
    if (w) setWinner(w);

    // set states
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl p-20 text-center text-xl text-black">
      {winner === "draw" ? (
        <p>Draw!</p>
      ) : winner ? (
        <p>{winner} is the winner!</p>
      ) : (
        <p>It is {turn}&apos;s turn.</p>
      )}
      <motion.div
        className="grid grid-cols-3 gap-1"
        style={{ rotateY: boardRotate }}
      >
        {board.map((square, i) => (
          <button
            key={i}
            className={cn(
              "h-16 w-16 bg-black/10 text-4xl transition-all sm:h-20 sm:w-20",
              !square && !winner ? "hover:bg-black/20" : "hover:bg-black/5",
            )}
            onClick={() => move(i)}
          >
            {square === "X" ? "X" : square === "O" ? "O" : ""}
          </button>
        ))}
      </motion.div>
      <button
        className="bg-shadow hard-shadow rounded-xl border-2 border-black px-3 py-2 text-base"
        onClick={reset}
        disabled={boardRotate.isAnimating()}
      >
        Reset Game
      </button>
    </div>
  );
}
