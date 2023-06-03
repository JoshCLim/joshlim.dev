import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "~/components/loading";
import { type RouterOutputs, api } from "~/utils/api";
import Tilt from "react-parallax-tilt";

type ChessGameWithUserInfo = RouterOutputs["chess"]["getGame"];

const Chess: NextPage = () => {
  return (
    <>
      <nav className="fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between p-5 md:px-10 md:pt-7">
        <Link
          className="rounded-full border-2 border-white p-1 transition-all hover:bg-[#aaa]"
          href="/party"
        >
          <NavArrowLeft />
        </Link>
        <NamedWelcome />
      </nav>
      <main className="fixed z-0 flex h-full w-full flex-row gap-10 bg-slate-800 p-12 pt-[100px]">
        <div className="flex flex-col gap-10">
          <CreateChessGameWizard />
          <YourGames />
        </div>
        <div className="flex flex-col gap-10">
          <NotYourGames />
        </div>
      </main>
    </>
  );
};

const CreateChessGameWizard = () => {
  const { data: sessionData } = useSession();

  const ctx = api.useContext();

  const [privateGame, setPrivateGame] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [playerWhite, setPlayerWhite] = useState<boolean>(true);

  const { mutate: newGame, isLoading: isGenerating } =
    api.chess.gameNew.useMutation({
      onSuccess: () => {
        toast.success("Game created.");
        void ctx.chess.listMyGames.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.password;
        console.log(e.data);
        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0]);
        } else if (e.message) {
          toast.error(e.message);
        } else {
          toast.error("Failed to create a new game! Please try again later.");
        }
      },
    });

  if (sessionData?.user === undefined) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-transparent bg-slate-800 p-10 transition-all">
        Please <span className="">login</span>
        to create a new game.
      </div>
    );
  }

  return (
    <Tilt
      tiltReverse={true}
      glareEnable={true}
      tiltMaxAngleX={2}
      tiltMaxAngleY={2}
      glareMaxOpacity={0.2}
      glarePosition={"all"}
      glareColor={"#777"}
      className="overflow-visible"
      glareBorderRadius={"1.5rem"}
    >
      <div className="flex flex-col gap-3 rounded-3xl border-2 border-transparent bg-white/5 p-10 transition-all hover:border-red-300">
        <h2 className="text-3xl font-bold">Create a new game.</h2>
        <div className="flex flex-row gap-3">
          <input
            type="checkbox"
            onChange={(e) => setPrivateGame(e.target.checked)}
          />
          {!privateGame && (
            <span className="block border-2 border-transparent py-3">
              Private Game?
            </span>
          )}
          {!!privateGame && (
            <input
              type="text"
              placeholder="private game password"
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow rounded-3xl border-2 border-transparent bg-white/5 px-5 py-3 outline-none transition-all focus:border-white/50"
            />
          )}
        </div>
        <div className="flex flex-row justify-between gap-3">
          <button
            onClick={() => setPlayerWhite((prev) => !prev)}
            color="#fff"
            className={`h-20 w-20	rounded-xl p-3 align-middle transition-all  ${
              playerWhite ? "bg-white/10 text-white" : "bg-white/80 text-black"
            }`}
          >
            {/* <Bishop color={playerWhite ? "#fff" : "#111"} /> */}
            <span className="mt-[-10px] block text-5xl font-extrabold">
              &#9812;
            </span>
          </button>

          <button
            className="flex flex-grow items-center justify-center rounded-2xl bg-white/5 px-12 font-semibold transition-all hover:bg-white/20"
            onClick={() =>
              newGame(
                privateGame
                  ? { private: privateGame, password, playerWhite }
                  : { private: privateGame, playerWhite }
              )
            }
          >
            {!isGenerating ? (
              <span>
                New Game <NavArrowRight className="ml-3 mt-[-2px] inline" />
              </span>
            ) : (
              <span className="block px-11">
                <LoadingSpinner size={30} />
              </span>
            )}
          </button>
        </div>
      </div>
    </Tilt>
  );
};

const YourGames = () => {
  const { data: sessionData } = useSession();

  const { data: myChessGames, isLoading } = api.chess.listMyGames.useQuery();

  if (sessionData?.user === undefined) {
    return <></>;
  }

  return (
    <Tilt
      tiltReverse={true}
      glareEnable={true}
      tiltMaxAngleX={2}
      tiltMaxAngleY={2}
      glareMaxOpacity={0.3}
      glarePosition={"all"}
      glareColor={"#777"}
      className="overflow-visible"
      glareBorderRadius={"1.5rem"}
    >
      <div className="flex flex-col gap-3 rounded-3xl border-2 border-transparent bg-white/5 p-10 transition-all hover:border-red-300">
        <h2 className="text-3xl font-bold">Your games.</h2>
        {!!isLoading && <LoadingSpinner />}
        {myChessGames?.length === 0 && <div>No games to show.</div>}
        {!!myChessGames && (
          <div className="grid grid-cols-2 gap-3">
            {myChessGames.map((game) => (
              <GameTile game={game} key={game.id} />
            ))}
          </div>
        )}
      </div>
    </Tilt>
  );
};

const NotYourGames = () => {
  const { data: sessionData } = useSession();

  const { data: myChessGames, isLoading } = api.chess.listNotMyGames.useQuery();

  if (sessionData?.user === undefined) {
    return <></>;
  }

  return (
    <Tilt
      tiltReverse={true}
      glareEnable={true}
      tiltMaxAngleX={2}
      tiltMaxAngleY={2}
      glareMaxOpacity={0.3}
      glarePosition={"all"}
      glareColor={"#777"}
      className="overflow-visible"
      glareBorderRadius={"1.5rem"}
    >
      <div className="flex flex-col gap-3 rounded-3xl border-2 border-transparent bg-white/5 p-10 transition-all hover:border-red-300">
        <h2 className="text-3xl font-bold">Public games.</h2>
        {!!isLoading && <LoadingSpinner />}
        {myChessGames?.length === 0 && <div>No games to show.</div>}
        {!!myChessGames && (
          <div className="flex gap-3">
            {myChessGames.map((game) => (
              <GameTileOther game={game} key={game.id} />
            ))}
          </div>
        )}
      </div>
    </Tilt>
  );
};

const GameTile = ({ game }: { game: ChessGameWithUserInfo }) => {
  return (
    <Link
      className="flex items-center justify-between gap-3  rounded-3xl bg-white/5 px-7 py-5 transition-all hover:bg-white/20"
      href={`/games/chess/${game.id}`}
    >
      <div className="flex flex-col gap-1">
        <div>
          <Image
            src={game.playerPic}
            alt={`${game.playerName}'s profile picture`}
            width={20}
            height={20}
            className="mr-2 inline rounded-full"
          />
          <span>{game.playerName}</span>
          {!!game.opponentName && !!game.opponentPic && (
            <>
              <span className="mx-4">{` | `}</span>
              <Image
                src={game.opponentPic}
                alt={`${game.opponentName}'s profile picture`}
                width={20}
                height={20}
                className="mr-2 inline rounded-full"
              />
              <span>{game.opponentName}</span>
            </>
          )}
        </div>
        <div className="text-xs text-[#aaa]">{`id: ${game.id}`}</div>
      </div>
      <span>
        <NavArrowRight />
      </span>
    </Link>
  );
};

const GameTileOther = ({ game }: { game: ChessGameWithUserInfo }) => {
  const { data: sessionData } = useSession();

  const ctx = api.useContext();

  const { mutate: joinGame, isLoading: isJoining } =
    api.chess.gameJoin.useMutation({
      onSuccess: () => {
        toast.success("Game joined.");
        void ctx.chess.listMyGames.invalidate();
        void ctx.chess.listNotMyGames.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.password;
        console.log(e.data);
        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0]);
        } else if (e.message) {
          toast.error(e.message);
        } else {
          toast.error("Failed to join the game! Please try again later.");
        }
      },
    });

  const userId = sessionData?.user.id;
  const userInGame = game.playerId === userId || game.opponentId === userId;

  return (
    <div className="flex items-center justify-between gap-3  rounded-3xl bg-white/5 px-7 py-5 transition-all hover:bg-white/10">
      <div className="flex flex-col gap-1">
        <div>
          <Image
            src={game.playerPic}
            alt={`${game.playerName}'s profile picture`}
            width={20}
            height={20}
            className="mr-2 inline rounded-full"
          />
          <span>{game.playerName}</span>
          {!!game.opponentName && !!game.opponentPic && (
            <>
              <span className="mx-4">{` | `}</span>
              <Image
                src={game.opponentPic}
                alt={`${game.opponentName}'s profile picture`}
                width={20}
                height={20}
                className="mr-2 inline rounded-full"
              />
              <span>{game.opponentName}</span>
            </>
          )}
        </div>
        <div className="text-xs text-[#aaa]">{`id: ${game.id}`}</div>
      </div>
      {!userInGame && (
        <button
          className="rounded-2xl bg-white/5 p-3 transition-all hover:bg-white/20"
          onClick={() => joinGame({ gameId: game.id })}
        >
          Join
        </button>
      )}
    </div>
  );
};

const NamedWelcome: React.FC = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user === undefined)
    return (
      <button className="m-0 text-xl text-[#aaa]" onClick={() => void signIn()}>
        Login
      </button>
    );

  return (
    <p className="m-0 text-lg font-light text-white">
      Logged in as
      <span className="font-normal italic">{` ${
        sessionData.user.name ?? "[your name here]"
      }`}</span>
    </p>
  );
};

export default Chess;
