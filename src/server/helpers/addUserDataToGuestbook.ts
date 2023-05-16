import type { Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";

export const addUserDataToGuestbook = async (messages: Post[]) => {
  const users = await prisma.user.findMany();

  return messages.map((message) => {
    const user = users.find((user) => user.id === message.authorId);

    if (!user || !user.name) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Author of this guestbook message not found",
      });
    }

    return {
      ...message,
      authorName: user?.name ?? "Unknown",
      authorPic: user.image ?? "",
    };
  });
};
