import Link from "next/link";

import { Home, ChatBubble, AngleTool } from "iconoir-react";

const pages = [
  {
    href: "/",
    icon: <Home />,
  },
  {
    href: "/guestbook",
    icon: <ChatBubble />,
  },
  {
    href: "/projects",
    icon: <AngleTool />,
  },
];

export const Navbar = ({ currPage }: { currPage: string }) => {
  return (
    <nav className="left-0 top-0 flex w-full flex-row items-center justify-center gap-3 text-white md:p-4">
      {pages.map((page) => (
        <NavLink
          key={page.href}
          href={page.href}
          icon={page.icon}
          highlight={page.href === `/${currPage}`}
        />
      ))}
    </nav>
  );
};

const NavLink = ({
  href,
  icon,
  highlight,
}: {
  href: string;
  icon: React.ReactNode;
  highlight: boolean;
}) => {
  let classes =
    "rounded-xl bg-white/10 p-5 transition-colors hover:bg-white/30";
  if (highlight) {
    classes += " bg-white/30";
  }

  return (
    <Link className={classes} href={href}>
      {icon}
    </Link>
  );
};
