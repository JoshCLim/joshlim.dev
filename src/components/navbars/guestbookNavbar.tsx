import Link from "next/link";

import { PAGES } from "./homeNavbar";

export const GuestbookNavbar = ({
  currPage,
  fixed = false,
}: {
  currPage: string;
  fixed?: boolean;
}) => {
  return (
    <nav
      className={`${
        fixed ? "fixed" : ""
      } left-0 top-0 flex w-full flex-row items-center justify-center gap-3 text-white md:px-4`}
    >
      {PAGES.map((page) => (
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
    "rounded-xl bg-white/10 p-5 transition-colors hover:bg-white/30 flex flex-row gap-3";
  if (highlight) {
    classes += " bg-white/30";
  }

  return (
    <Link className={classes} href={href}>
      {icon}{" "}
      {href.substring(1).length > 0 && (
        <span className="hidden sm:inline">{href.substring(1)}</span>
      )}
    </Link>
  );
};
