import BackToGamesButton from "~components/backGamesButton";

import Minesweeper from "./minesweeper";

export default function Page() {
  return (
    <>
      <div className="fixed left-5 top-5">
        <BackToGamesButton />
      </div>
      <div className="flex h-screen w-screen items-center justify-center bg-slate-300">
        <Minesweeper />
      </div>
    </>
  );
}
