import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { addUserDataToGuestbook } from "~/server/helpers/addUserDataToGuestbook";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";
// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

const createMessage = protectedProcedure
  .input(
    z.object({
      content: z
        .string()
        .min(1, "Please enter a message")
        .max(50, "Keep your messages short and sweet :)"),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.session.user.id;

    const { success } = await ratelimit.limit(authorId);
    if (!success)
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Slow down. Reflect. Be thoughtful.",
      });

    const message = await ctx.prisma.post.create({
      data: {
        authorId,
        content: input.content,
      },
    });

    return message;
  });

const getAllMessages = publicProcedure.query(async ({ ctx }) => {
  const messages = await ctx.prisma.post.findMany({
    take: 100,
    orderBy: [{ createdAt: "desc" }],
  });

  return await addUserDataToGuestbook(messages);
});

export const guestbookRouter = createTRPCRouter({
  createMessage,
  getAllMessages,
});
