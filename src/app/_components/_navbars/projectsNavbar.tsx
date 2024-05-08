import Link from "next/link";

import { cn } from "~/app/utils";

import FadeInOut from "~components/_animations/fadeInOut";

import allPages from "./navbarPages";

export default function ProjectsNavbar({
  currPage,
}: {
  currPage: string;
  fixed?: boolean;
}) {
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full flex-row justify-center gap-5 border-black bg-white shadow-md sm:justify-start">
      <Navbar currPage={currPage} />
    </div>
  );
}

const Navbar = ({
  currPage,
  fixed = false,
}: {
  currPage: string;
  fixed?: boolean;
}) => {
  return (
    <nav
      className={cn(
        "left-0 top-0 flex flex-row items-center font-light text-black",
        fixed && "fixed",
      )}
    >
      {allPages.map((page, index) => (
        <NavLink
          key={page.href}
          href={page.href}
          icon={page.icon}
          highlight={page.href === `${currPage}`}
          index={index}
        />
      ))}
    </nav>
  );
};

const NavLink = ({
  href,
  icon,
  highlight,
  index,
}: {
  href: string;
  icon: React.ReactNode;
  highlight: boolean;
  index: number;
}) => {
  return (
    <FadeInOut
      delay={index * 50}
      duration={500}
      exitDelay={0}
      exitDuration={200}
    >
      <Link
        className={cn(
          "ms-[-1px] flex flex-row gap-3 p-5 transition-all duration-200 hover:bg-slate-200",
          highlight ? "bg-slate-200" : "bg-white",
        )}
        href={href}
      >
        {icon}{" "}
        {href.substring(1).length > 0 && (
          <span className="hidden sm:inline">{href.substring(1)}</span>
        )}
      </Link>
    </FadeInOut>
  );
};
