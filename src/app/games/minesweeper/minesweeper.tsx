"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "~/app/utils";

import Switch from "~components/switch";
import useClickAway from "~hooks/useClickAway";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Settings, Undo, Xmark } from "iconoir-react";

type Square = "mine" | "flaggedMine" | "flaggedEmpty" | "searched" | "empty";
type GameState = "playing" | "win" | "lose";

export default function Minesweeper() {
  const rowsInput = useRef<HTMLInputElement>(null);
  const colsInput = useRef<HTMLInputElement>(null);
  const mineCountInput = useRef<HTMLInputElement>(null);
  const settingsRef = useClickAway<HTMLDivElement>(() =>
    setShowSettings(false),
  );

  const [shortcutsEnabled, setShortcutsEnabled] = useState<boolean>(false);

  const [rows, setRows] = useState<number>(20);
  const [cols, setCols] = useState<number>(20);
  const [mineCount, setMineCount] = useState<number>(100);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [board, setBoard] = useState<Square[]>(
    Array(rows * cols).fill("empty"),
  );
  const [gameOver, setGameOver] = useState<GameState>("playing");

  const reset = useCallback(() => {
    const newBoard = Array(rows * cols).fill("empty");
    for (let i = 0; i < mineCount; i++) {
      const index = Math.floor(Math.random() * rows * cols);
      newBoard[index] = "mine";
    }
    setBoard(newBoard);
    setGameOver("playing");
  }, [cols, rows, mineCount]);

  useEffect(() => {
    reset();
  }, [reset]);

  const checkWin = (squares: Square[]): boolean => {
    return squares.every((square) => square !== "empty");
  };

  const neighbouringIndices = (i: number): number[] => {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const indices = [];

    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
          indices.push(r * cols + c);
        }
      }
    }

    return indices;
  };

  const orthogonalIndices = (i: number): number[] => {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const indices = [];

    for (let r = row - 1; r <= row + 1; r++) {
      if (r >= 0 && r < rows) {
        indices.push(r * cols + col);
      }
    }

    for (let c = col - 1; c <= col + 1; c++) {
      if (c >= 0 && c < cols) {
        indices.push(row * cols + c);
      }
    }

    return indices;
  };

  const countNeighbourMines = (i: number): number => {
    const count = neighbouringIndices(i).filter(
      (index) => board[index] === "mine" || board[index] === "flaggedMine",
    ).length;

    return count;
  };

  const countNeightbourFlags = (i: number): number => {
    const count = neighbouringIndices(i).filter(
      (index) =>
        board[index] === "flaggedMine" || board[index] === "flaggedEmpty",
    ).length;

    return count;
  };

  const countNeighbourUnsearched = (i: number): number => {
    const count = neighbouringIndices(i).filter(
      (index) =>
        board[index] === "empty" ||
        board[index] === "mine" ||
        board[index] === "flaggedMine" ||
        board[index] === "flaggedEmpty",
    ).length;

    return count;
  };

  const move = (i: number) => {
    // if game over do nothing
    if (gameOver !== "playing") return;

    // if click on mine, game over
    if (board[i] === "mine") {
      setGameOver("lose");
      return;
    }

    // do nothing if they click on a flag
    if (board[i] === "flaggedEmpty" || board[i] === "flaggedMine") {
      return;
    }

    if (shortcutsEnabled && board[i] === "searched") {
      // # of flags = # of mines, search all unsearched neighbours
      if (countNeightbourFlags(i) === countNeighbourMines(i)) {
        neighbouringIndices(i).forEach((index) => {
          if (board[index] === "empty") {
            setBoard((board) => {
              const newBoard = [...board];
              dfs(index, newBoard);
              return newBoard;
            });
          } else if (board[index] === "mine") {
            setGameOver("lose");
          }
        });
      }

      // if all neighbours are searched, flag all unsearched neighbours
      if (countNeighbourUnsearched(i) === countNeighbourMines(i)) {
        neighbouringIndices(i).forEach((index) => {
          if (board[index] === "empty" || board[index] === "mine") {
            toggleFlag(index);
          }
        });
      }

      return;
    }

    // standard dfs case
    const newBoard = [...board];
    newBoard[i] = "searched";

    orthogonalIndices(i).forEach((index) => {
      if (countNeighbourMines(index) === 0) {
        dfs(index, newBoard);
      }
    });

    if (checkWin(newBoard)) {
      setGameOver("win");
    }

    setBoard(newBoard);
  };

  const dfs = (i: number, board: Square[]) => {
    board[i] = "searched";

    if (countNeighbourMines(i) > 0) {
      return;
    }

    neighbouringIndices(i).forEach((index) => {
      if (board[index] === "empty") {
        dfs(index, board);
      }
    });
  };

  const toggleFlag = (i: number) => {
    setBoard((board) => {
      const newBoard = [...board];
      if (board[i] === "empty") {
        newBoard[i] = "flaggedEmpty";
      } else if (board[i] === "mine") {
        newBoard[i] = "flaggedMine";
      } else if (board[i] === "flaggedEmpty") {
        newBoard[i] = "empty";
      } else if (board[i] === "flaggedMine") {
        newBoard[i] = "mine";
      }

      return newBoard;
    });
  };

  const updateSettings = () => {
    const newRows = parseInt(rowsInput.current?.value ?? "20");
    const newCols = parseInt(colsInput.current?.value ?? "20");
    const newMineCount = parseInt(mineCountInput.current?.value ?? "100");

    if (isNaN(newRows) || isNaN(newCols) || isNaN(newMineCount)) {
      alert("Please enter valid numbers");
      return;
    }

    if (newRows < 1 || newCols < 1 || newMineCount < 0) {
      alert("Please enter positive numbers");
      return;
    }

    if (newMineCount >= newRows * newCols) {
      alert("Number of mines must be less than number of squares");
      return;
    }

    setRows(newRows);
    setCols(newCols);
    setMineCount(newMineCount);

    setShowSettings(false);
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl p-20 text-center text-xl text-black">
      <p>Left-click to search, right-click to flag.</p>
      <motion.div
        className="relative grid"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {gameOver === "win" && (
          <p className="hard-shadow absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-black bg-[#eee] p-5 px-8 text-4xl hover:left-[50%] hover:top-[50%] hover:translate-x-[-50%] hover:translate-y-[-50%]">
            You Win!
          </p>
        )}
        {board.map((square, i) => (
          <button
            key={i}
            className={cn(
              "h-10 w-10 text-xl transition-all hover:bg-black/20 sm:h-10 sm:w-10 ",
              (Math.floor(i / cols) + (i % cols)) % 2 === 0 &&
                (square === "searched" ? "bg-black/40" : "bg-black/10"),
              (Math.floor(i / cols) + (i % cols)) % 2 === 1 &&
                (square === "searched" ? "bg-black/30" : "bg-black/5"),
              square === "searched" ? "text-white" : "text-black",
            )}
            onClick={() => move(i)}
            onContextMenu={(e) => {
              e.preventDefault();
              toggleFlag(i);
            }}
          >
            {square === "flaggedMine" || square === "flaggedEmpty"
              ? "🚩"
              : square === "searched" && countNeighbourMines(i) !== 0
                ? countNeighbourMines(i)
                : square === "mine" && gameOver !== "playing"
                  ? "💥"
                  : ""}
          </button>
        ))}
      </motion.div>
      <div className="flex flex-row items-center justify-center gap-5">
        <button
          className="bg-shadow hard-shadow flex flex-row gap-1 rounded-xl border-2 border-black px-3 py-2 text-base"
          onClick={reset}
        >
          <Undo />
          Reset Game
        </button>
        <div className="relative" ref={settingsRef}>
          <button
            className="bg-shadow hard-shadow flex flex-row gap-1 rounded-xl border-2 border-black px-3 py-2 text-base"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings />
            Settings
          </button>
          <AnimatePresence>
            {showSettings && (
              <motion.form
                initial={{
                  opacity: 0,
                  scale: 0,
                  translateX: "25%",
                  translateY: "-30%",
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  translateX: "25%",
                  translateY: "-30%",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  translateX: "25%",
                  translateY: "-100%",
                }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                onSubmit={(e) => e.preventDefault()}
                className="hard-shadow absolute right-0 top-[-10px] space-y-1 overflow-hidden rounded-xl border-2 border-black bg-white p-5 text-base"
              >
                <div className="flex flex-row gap-1">
                  <p className="flex-shrink-0 flex-grow text-left">rows: </p>
                  <input
                    className="no-arrows min-w-0 flex-shrink flex-grow-0 focus-within:outline-none"
                    type="number"
                    defaultValue={rows}
                    ref={rowsInput}
                  />
                </div>
                <div className="flex flex-row gap-1">
                  <p className="flex-shrink-0 flex-grow text-left">cols: </p>
                  <input
                    className="no-arrows min-w-0 flex-shrink flex-grow-0 focus-within:outline-none"
                    type="number"
                    defaultValue={cols}
                    ref={colsInput}
                  />
                </div>
                <div className="flex flex-row gap-1">
                  <p className="flex-shrink-0 flex-grow text-left">
                    number of mines:{" "}
                  </p>
                  <input
                    className="no-arrows min-w-0 flex-shrink flex-grow-0 focus-within:outline-none"
                    type="number"
                    defaultValue={mineCount}
                    ref={mineCountInput}
                  />
                </div>
                <div className="flex flex-row gap-1">
                  <p className="flex-shrink-0 flex-grow text-left">
                    enable shortcuts{" "}
                  </p>
                  <Switch
                    value={shortcutsEnabled}
                    onClick={() => setShortcutsEnabled((prev) => !prev)}
                  />
                </div>
                <button
                  className="absolute right-9 top-0 rounded-full p-1 transition-all hover:bg-slate-50 active:bg-slate-100"
                  onClick={updateSettings}
                >
                  <Check height={24} color="#00aa00" />
                </button>
                <button
                  className="absolute right-1 top-0 rounded-full p-1 transition-all hover:bg-slate-50 active:bg-slate-100"
                  onClick={() => setShowSettings(false)}
                >
                  <Xmark height={24} color="#aa0000" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
