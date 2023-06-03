import type { ChessGame } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";

export const addUserDataToChessGames = async (games: ChessGame[]) => {
  const users = await prisma.user.findMany();

  return games.map((game) => {
    const player = users.find((user) => user.id === game.playerId);
    const opponent = users.find((user) => user.id === game.opponentId);

    if (!player || !player.name) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Owner of chess game ${game.id} not found`,
      });
    }

    return {
      ...game,
      playerName: player.name,
      playerPic: player.image ?? "",
      opponentName: opponent?.name,
      opponentPic: opponent?.image,
    };
  });
};

export const addUserDataToChessGame = async (game: ChessGame) => {
  const users = await prisma.user.findMany();

  const player = users.find((user) => user.id === game.playerId);
  const opponent = users.find((user) => user.id === game.opponentId);

  if (!player || !player.name) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Owner of chess game ${game.id} not found`,
    });
  }

  return {
    ...game,
    playerName: player.name,
    playerPic: player.image ?? "",
    opponentName: opponent?.name,
    opponentPic: opponent?.image,
  };
};
