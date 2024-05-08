import Link from "next/link";

import { cn } from "../utils";

import { ArrowLeft } from "iconoir-react";

export default function BackToGamesButton({
  className,
}: {
  className?: string;
}) {
  return (
    <Link
      href="/games"
      className={cn(
        "bg-shadow hard-shadow flex flex-row gap-3 rounded-xl border-2 border-[#000] bg-white p-3 text-black transition-colors",
        className,
      )}
    >
      <ArrowLeft /> Back to all games
    </Link>
  );
}
