import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { NEW_CHESS_BOARD } from "./chessTypes";
import { TRPCError } from "@trpc/server";
import type { ChessGame, Prisma } from "@prisma/client";
import {
  addUserDataToChessGame,
  addUserDataToChessGames,
} from "~/server/helpers/addUserDataToChessGame";

const MAX_GAMES = 6;

/**
 * Create a new chess game
 *
 * @param private Whether the game should be private
 * @param password The password for the game, if private
 *
 * @returns the new game board
 */
const gameNew = protectedProcedure
  .input(
    z
      .object({
        private: z.boolean(),
        password: z
          .string()
          .min(1, "Make sure your password is long enough.")
          .max(256, "Don't make your password too long -- that's overkill.")
          .optional(),
        playerWhite: z.boolean(),
      })
      .refine((input) => {
        if (input.private && !input.password) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "A password is required for a private game.",
          });
        }
        return true;
      })
  )
  .mutation(async ({ ctx, input }) => {
    const playerId = ctx.session.user.id;

    const [numGamesOwned, numGamesJoined] = await Promise.all([
      ctx.prisma.chessGame.count({
        where: { playerId: playerId },
      }),
      ctx.prisma.chessGame.count({
        where: { opponentId: playerId },
      }),
    ]);
    if (numGamesOwned + numGamesJoined >= MAX_GAMES) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `You can only have ${MAX_GAMES} games at a time.`,
      });
    }

    const chessGame = await ctx.prisma.chessGame.create({
      data: {
        playerId,
        playerWhite: input.playerWhite,
        public: !input.private,
        password: input.password,
        board: NEW_CHESS_BOARD as unknown as Prisma.JsonObject,
      },
    });

    return chessGame;
  });

/**
 * Join a game
 */
const gameJoin = protectedProcedure
  .input(z.object({ gameId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const playerId = ctx.session.user.id;

    // if game doesn't exist
    const game = await ctx.prisma.chessGame.findFirst({
      where: { id: input.gameId },
    });
    if (!game) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Game does not exist: ${input.gameId}`,
      });
    }

    // if player is already in game
    if (isAlreadyInGame(playerId, game)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Already are part of ${game.id}`,
      });
    }

    // if player already hit max number of games
    const [numGamesOwned, numGamesJoined] = await Promise.all([
      ctx.prisma.chessGame.count({
        where: { playerId: playerId },
      }),
      ctx.prisma.chessGame.count({
        where: { opponentId: playerId },
      }),
    ]);
    if (numGamesOwned + numGamesJoined >= MAX_GAMES) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `You can only have ${MAX_GAMES} games at a time.`,
      });
    }

    const chessGame = await ctx.prisma.chessGame.update({
      where: { id: input.gameId },
      data: { opponentId: playerId },
    });

    return chessGame;
  });

const listAllGames = publicProcedure.query(async ({ ctx }) => {
  const games = await ctx.prisma.chessGame.findMany();
  return addUserDataToChessGames(games);
});

const listMyGames = protectedProcedure.query(async ({ ctx }) => {
  const playerId = ctx.session.user.id;

  const games = await ctx.prisma.chessGame.findMany({
    where: { OR: [{ playerId: playerId }, { opponentId: playerId }] },
  });
  return addUserDataToChessGames(games);
});

const listNotMyGames = protectedProcedure.query(async ({ ctx }) => {
  const playerId = ctx.session.user.id;
  console.log(playerId);

  const games = await ctx.prisma.chessGame.findMany({
    where: {
      OR: [
        { AND: [{ NOT: { playerId: playerId } }, { opponentId: null }] },
        {
          AND: [
            { NOT: { playerId: playerId } },
            { NOT: { opponentId: playerId } },
          ],
        },
      ],
    },
  });
  return addUserDataToChessGames(games);
});

/**
 * Get the game board for a given game
 * @param gameId The ID of the game
 */
const getGame = publicProcedure
  .input(z.object({ gameId: z.string() }))
  .query(async ({ ctx, input }) => {
    const game = await ctx.prisma.chessGame.findFirst({
      where: { id: input.gameId },
    });

    if (!game) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Game does not exist: ${input.gameId}`,
      });
    }

    return addUserDataToChessGame(game);
  });

/**
 * make a move
 */
const makeMove = protectedProcedure
  .input(
    z.object({
      gameId: z.string(),
      from: z.string(),
      to: z.string(),
      whiteMove: z.boolean(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const playerId = ctx.session.user.id;

    const game = await ctx.prisma.chessGame.findFirst({
      where: { id: input.gameId },
    });
    if (!game) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Game does not exist: ${input.gameId}`,
      });
    }
    if (!isAlreadyInGame(playerId, game)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `You are not part of game: ${input.gameId}`,
      });
    }
    if (game.whiteTurn !== input.whiteMove) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `It is not your turn!`,
      });
    }
  });

export const chessRouter = createTRPCRouter({
  gameNew,
  gameJoin,
  listAllGames,
  listMyGames,
  listNotMyGames,
  getGame,
  makeMove,
});

const isAlreadyInGame = (playerId: string, game: ChessGame) => {
  return game.playerId === playerId || game.opponentId === playerId;
};
