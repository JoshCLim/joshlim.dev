import Link from "next/link";

import { PAGES } from "./homeNavbar";

export const ProjectsNavbar = ({
  currPage,
}: {
  currPage: string;
  fixed?: boolean;
}) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full flex-row justify-center gap-5 border-b border-black bg-white sm:justify-start">
      <Navbar currPage={currPage} />
    </div>
  );
};

const Navbar = ({
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
      } left-0 top-0 flex flex-row items-center font-light text-black`}
    >
      {PAGES.map((page, index) => (
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
    <Link
      className={`ms-[-1px] flex flex-row gap-3 p-5 transition-all duration-200 hover:bg-slate-200 ${
        highlight ? "bg-slate-200" : "bg-white"
      }`}
      href={href}
      data-aos="fade-in"
      data-aos-delay={`${index * 100 + 200}`}
      data-aos-offset="50"
    >
      {icon}{" "}
      {href.substring(1).length > 0 && (
        <span className="hidden sm:inline">{href.substring(1)}</span>
      )}
    </Link>
  );
};
