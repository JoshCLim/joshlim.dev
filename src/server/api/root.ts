import { createTRPCRouter } from "~/server/api/trpc";
import { guestbookRouter } from "./routers/guestbook";
import { chessRouter } from "./routers/games/chess";
import { projectsRouter } from "./routers/projects";
import { notesRouter } from "./routers/notes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  guestbook: guestbookRouter,
  games: {
    chess: chessRouter,
  },
  projects: projectsRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
