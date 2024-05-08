import Link from "next/link";

import { cn } from "~/app/utils";

import allPages from "./navbarPages";

import { IconoirProvider } from "iconoir-react";

export default function NavbarBrutal({ currPage }: { currPage: string }) {
  return (
    <nav className="left-0 top-0 flex w-full flex-row items-center justify-center gap-3 text-black md:p-4">
      <IconoirProvider iconProps={{ strokeWidth: 2 }}>
        {allPages.map((page) => (
          <NavLinkBrutal
            key={page.href}
            href={page.href}
            icon={page.icon}
            highlight={page.href === `/${currPage}`}
          />
        ))}
      </IconoirProvider>
    </nav>
  );
}

function NavLinkBrutal({
  href,
  icon,
  highlight,
}: {
  href: string;
  icon: React.ReactNode;
  highlight: boolean;
}) {
  const classes =
    "rounded-xl border border-2 border-[#000] bg-shadow p-5 transition-colors hard-shadow flex flex-row gap-3";

  return (
    <Link className={cn(classes, highlight && "bg-white/30")} href={href}>
      {icon}
      {href.substring(1).length > 0 && <span>{href.substring(1)}</span>}
    </Link>
  );
}
