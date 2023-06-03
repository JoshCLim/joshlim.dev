import { NavArrowLeft } from "iconoir-react";
import type { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LoadingPage } from "~/components/loading";
import {
  type chessBoard,
  type boardRank,
  boardFile,
  pieceType,
  pieceColour,
} from "~/server/api/routers/games/chessTypes";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type RouterOutputs, api } from "~/utils/api";

enum ChessSquareColour {
  LIGHT,
  DARK,
}

const ChessGame: NextPage<{ gameId: string }> = ({ gameId }) => {
  const { data: session } = useSession();

  const { data, isLoading } = api.chess.getGame.useQuery({ gameId });

  if (session?.user.id === undefined) return <>Please log in.</>;

  if (isLoading) return <LoadingPage />;

  if (!data)
    return (
      <div className="no-scrollbar fixed left-0 top-0 z-0 flex h-full w-full flex-col justify-around overflow-scroll bg-slate-800">
        Error
      </div>
    );

  if (data.opponentId === null || data.opponentName === null) {
    return (
      <div className="no-scrollbar fixed left-0 top-0 z-0 flex h-full w-full flex-col items-center justify-center overflow-scroll bg-slate-800">
        <span className="mb-3 text-xl font-bold">
          No opponent has joined...
        </span>
        <Link
          href={`/games/chess/`}
          className="rounded-3xl bg-white/5 p-5 transition-all hover:bg-white/20"
        >
          <NavArrowLeft className="inline" /> Go Back
        </Link>
      </div>
    );
  }

  const playerIsWhite = checkPlayerIsWhite({
    game: data,
    userId: session.user.id,
  });

  return (
    <main className="no-scrollbar fixed left-0 top-0 z-0 flex h-full w-full flex-col justify-around overflow-scroll bg-slate-800">
      <PlayerBanners game={data} currPlayer={session.user.id}>
        <ChessBoard game={data} playerIsWhite={playerIsWhite} />
      </PlayerBanners>
    </main>
  );
};

const ChessBoard = ({
  game,
  playerIsWhite,
}: {
  game: RouterOutputs["chess"]["getGame"];
  playerIsWhite: boolean;
}) => {
  const numbers = [...Array(64).keys()];

  const board = game.board as unknown as chessBoard;
  const pieces = board.pieces.map((piece) => {
    const index = chessCoordsToIndex({
      file: piece.file,
      rank: piece.rank,
      playerIsWhite,
    });
    const child = chessPieceToUnicode({
      piece: piece.type,
      colour: piece.colour,
    });

    return { index, child };
  });

  return (
    <div className="flex justify-center p-2">
      <div className="grid aspect-square w-max grid-cols-8 grid-rows-[8] gap-0">
        {numbers.map((i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;

          let squareColour: ChessSquareColour;
          if (
            (playerIsWhite && (row % 2 === 0) === (col % 2 === 0)) ||
            (!playerIsWhite && (row % 2 === 0) !== (col % 2 === 0))
          ) {
            squareColour = ChessSquareColour.LIGHT;
          } else {
            squareColour = ChessSquareColour.DARK;
          }

          let piece: React.ReactNode = <></>;
          if (pieces.find((piece) => piece.index === i) !== undefined) {
            piece = pieces.find((piece) => piece.index === i)?.child;
          }

          return <ChessSquare colour={squareColour} piece={piece} key={i} />;
        })}
      </div>
    </div>
  );
};

const ChessSquare = ({
  colour,
  piece,
}: {
  colour: ChessSquareColour;
  piece: React.ReactNode;
}) => {
  const colourClass =
    colour === ChessSquareColour.LIGHT ? "bg-[#8a8]" : "bg-[#575]";
  return (
    <div
      className={`aspect-square w-20 text-7xl ${colourClass} flex items-center justify-center`}
    >
      {piece}
    </div>
  );
};

const PlayerBanners = (
  props: React.PropsWithChildren<{
    game: RouterOutputs["chess"]["getGame"];
    currPlayer: string;
  }>
) => {
  const { game: data, currPlayer } = props;

  const opponentBanner = (
    <PlayerBanner
      playerName={data?.opponentName ?? ""}
      playerPic={data?.opponentPic ?? ""}
    />
  );
  const playerBanner = (
    <PlayerBanner playerName={data.playerName} playerPic={data.playerPic} />
  );

  return (
    <>
      {currPlayer === data.playerId ? opponentBanner : playerBanner}
      {props.children}
      {currPlayer === data.playerId ? playerBanner : opponentBanner}
    </>
  );
};

const PlayerBanner = ({
  playerName,
  playerPic,
}: {
  playerName: string;
  playerPic: string;
}) => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-4 p-5 px-24">
      <Image
        src={playerPic}
        alt={`${playerName}'s profile picture`}
        width={40}
        height={40}
        className="rounded-full"
      />
      <span>{playerName}</span>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const gameId = context.params?.gameId;

  if (typeof gameId !== "string") throw new Error("no id");

  await ssg.chess.getGame.prefetch({ gameId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      gameId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

const chessCoordsToIndex = ({
  playerIsWhite,
  file,
  rank,
}: {
  file: boardFile;
  rank: boardRank;
  playerIsWhite: boolean;
}) => {
  const fileIndex = Object.keys(boardFile).indexOf(file);
  const rankIndex = playerIsWhite ? 8 - rank : rank - 1;
  return fileIndex + rankIndex * 8;
};

const chessPieceToUnicode = ({
  piece,
  colour,
}: {
  piece: pieceType;
  colour: pieceColour;
}) => {
  let colourClass = "text-white";
  if (colour === pieceColour.BLACK) {
    colourClass = "text-black";
  }
  switch (piece) {
    case pieceType.KING:
      return <span className={`${colourClass}`}>&#9812;</span>;
    case pieceType.QUEEN:
      return <span className={`${colourClass}`}>&#9813;</span>;
    case pieceType.ROOK:
      return <span className={`${colourClass}`}>&#9814;</span>;
    case pieceType.BISHOP:
      return <span className={`${colourClass}`}>&#9815;</span>;
    case pieceType.KNIGHT:
      return <span className={`${colourClass}`}>&#9816;</span>;
    default:
      return <span className={`${colourClass}`}>&#9817;</span>;
  }
};

const checkPlayerIsWhite = ({
  game,
  userId,
}: {
  game: RouterOutputs["chess"]["getGame"];
  userId: string;
}) => {
  if (game.playerWhite) {
    return game.playerId === userId;
  } else {
    return game.opponentId === userId;
  }
};

export default ChessGame;
