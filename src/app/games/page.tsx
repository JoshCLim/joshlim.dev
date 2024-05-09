import Link from "next/link";

import NavbarBrutal from "~components/_navbars/gamesNavbar";

import { cn } from "../utils";

const allGames = [
  {
    name: "tic-tac-toe",
    href: "tictactoe",
    complete: true,
  },
  {
    name: "chess",
    href: "chess",
    complete: false,
  },
  {
    name: "snake",
    href: "snake",
    complete: false,
  },
  {
    name: "sudoku",
    href: "sudoku",
    complete: false,
  },
  {
    name: "2048",
    href: "2048",
    complete: false,
  },
  {
    name: "minesweeper",
    href: "minesweeper",
    complete: true,
  },
];

export default function Page() {
  return (
    <>
      <main
        className="fixed left-0 top-0 flex min-h-screen w-full flex-col flex-wrap items-center justify-between gap-5 
      overflow-hidden bg-amber-300 p-5 text-[#333]" // bg-gradient-to-b from-[#707400] to-[#232500]
      >
        <NavbarBrutal currPage="games" />
        <Games />
        <p>:)</p>
      </main>
    </>
  );
}

function Games() {
  return (
    <div className="container items-center justify-center p-7 md:max-w-4xl md:p-10">
      <div className="flex items-center gap-5">
        <h1 className="text-5xl font-extrabold text-[#000]">Games 🎉</h1>
        <p className=" bg-[#c2325d] px-4 py-3 text-center font-extrabold uppercase text-white">
          More Coming Soon!
        </p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 py-5 sm:justify-start">
        {allGames.map((game) => (
          <GameTile
            key={game.name}
            name={game.name}
            href={game.href}
            complete={game.complete}
          />
        ))}
      </div>
    </div>
  );
}

function GameTile({
  name,
  href,
  complete,
}: {
  name: string;
  href: string;
  complete: boolean;
}) {
  return (
    <Link href={complete ? `/games/${href}` : "#"}>
      <div
        className={cn(
          "hard-shadow flex cursor-pointer flex-col items-center justify-center rounded-xl border-2  border-[#000] bg-white  p-5 md:p-7",
          !complete && "blur",
        )}
      >
        <h3 className="text-2xl font-extrabold text-[#000]">{name}</h3>
      </div>
    </Link>
  );
}
