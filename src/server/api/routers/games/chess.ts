import { createTRPCRouter, protectedProcedure } from "../../trpc";

const gameNew = protectedProcedure.mutation(({ ctx }) => {
  const playerId = ctx.session.user.id;

  return {};
});

export const chessRouter = createTRPCRouter({
  gameNew,
});
