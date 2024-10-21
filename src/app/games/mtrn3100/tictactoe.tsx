"use client";

import { useState } from "react";

import { cn } from "~/app/utils";

import { motion, useSpring } from "framer-motion";

const BOARD_SIZE = 12;

export default function TicTacToe() {
  const [board, setBoard] = useState<boolean[][]>(
    Array.from(Array(BOARD_SIZE), () =>
      new Array<boolean>(BOARD_SIZE).fill(false),
    ),
  );

  const boardRotate = useSpring(0);

  const reset = () => {
    setBoard(
      Array.from(Array(BOARD_SIZE), () =>
        new Array<boolean>(BOARD_SIZE).fill(false),
      ),
    );
    boardRotate.set(Math.ceil(boardRotate.get() / 180) * 180 + 180);
  };

  const toggle = (i: number, j: number) => {
    setBoard((prev) => {
      const newBoard = prev.map((row) => row.slice());
      newBoard[i][j] = !newBoard[i][j];
      return newBoard;
    });
  };

  const erosion = () => {
    setBoard((prev) => {
      const newBoard = prev.map((row) => row.slice());
      for (let i = 1; i < BOARD_SIZE - 1; i++) {
        for (let j = 1; j < BOARD_SIZE - 1; j++) {
          if (
            prev[i][j] &&
            prev[i - 1][j] &&
            prev[i + 1][j] &&
            prev[i][j - 1] &&
            prev[i][j + 1] &&
            prev[i - 1][j - 1] &&
            prev[i - 1][j + 1] &&
            prev[i + 1][j - 1] &&
            prev[i + 1][j + 1]
          ) {
            newBoard[i][j] = true;
          } else {
            newBoard[i][j] = false;
          }
        }
      }
      return newBoard;
    });
  };

  const dilation = () => {
    setBoard((prev) => {
      const newBoard = prev.map((row) => row.slice());
      for (let i = 1; i < BOARD_SIZE - 1; i++) {
        for (let j = 1; j < BOARD_SIZE - 1; j++) {
          if (
            prev[i][j] ||
            prev[i - 1][j] ||
            prev[i + 1][j] ||
            prev[i][j - 1] ||
            prev[i][j + 1] ||
            prev[i - 1][j - 1] ||
            prev[i - 1][j + 1] ||
            prev[i + 1][j - 1] ||
            prev[i + 1][j + 1]
          ) {
            newBoard[i][j] = true;
          } else {
            newBoard[i][j] = false;
          }
        }
      }
      return newBoard;
    });
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl p-20 text-center text-xl text-black">
      <motion.div
        className="grid grid-cols-12 gap-1"
        style={{ rotateY: boardRotate }}
      >
        {board.map((squares, i) =>
          squares.map((square, j) => (
            <button
              key={`${i}-${j}`}
              className={cn(
                "h-16 w-16 bg-black/10 text-4xl transition-all sm:h-20 sm:w-20",
                !square ? "bg-black text-white" : "bg-white text-black",
              )}
              onClick={() => toggle(i, j)}
            >
              {square ? "1" : "0"}
            </button>
          )),
        )}
      </motion.div>
      <button
        className="bg-shadow hard-shadow rounded-xl border-2 border-black px-3 py-2 text-base"
        onClick={reset}
        disabled={boardRotate.isAnimating()}
      >
        Reset Game
      </button>
      <button
        className="bg-shadow hard-shadow rounded-xl border-2 border-black px-3 py-2 text-base"
        onClick={erosion}
        disabled={boardRotate.isAnimating()}
      >
        Erosion
      </button>
      <button
        className="bg-shadow hard-shadow rounded-xl border-2 border-black px-3 py-2 text-base"
        onClick={dilation}
        disabled={boardRotate.isAnimating()}
      >
        Dilation
      </button>
    </div>
  );
}
