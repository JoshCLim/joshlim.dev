import BackToGamesButton from "~components/backGamesButton";

import TicTacToe from "./tictactoe";

export default function Page() {
  return (
    <>
      <div className="fixed left-5 top-5">
        <BackToGamesButton />
      </div>
      <div className="flex h-screen w-screen items-center justify-center bg-blue-300">
        <TicTacToe />
      </div>
    </>
  );
}
