import Link from "next/link";

import { Home, ChatBubble, AngleTool, RubikCube, Menu } from "iconoir-react";
import { useState } from "react";

export const PAGES = [
  {
    href: "/",
    icon: <Home />,
  },
  {
    href: "/projects",
    icon: <AngleTool />,
  },
  {
    href: "/guestbook",
    icon: <ChatBubble />,
  },
  {
    href: "/party",
    icon: <RubikCube />,
  },
];

export const HomeNavbar = ({
  currPage,
}: {
  currPage: string;
  fixed?: boolean;
}) => {
  const [showNav, setShowNav] = useState<boolean>(false);

  const toggleShowNav = () => {
    setShowNav((curr) => !curr);
  };

  return (
    <div className="fixed left-0 top-0 flex w-full flex-row justify-center gap-5 py-7 sm:justify-start sm:px-7">
      <button
        onClick={toggleShowNav}
        className="py-5 sm:ps-5"
        data-aos="fade-in"
        data-aos-delay="1000"
        data-aos-duration="1000"
      >
        <Menu />
      </button>
      {!!showNav && <Navbar currPage={currPage} />}
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
      } left-0 top-0 flex flex-row items-center gap-3 text-white md:px-4`}
    >
      {PAGES.map((page, index) => (
        <NavLink
          key={page.href}
          href={page.href}
          icon={page.icon}
          highlight={page.href === `/${currPage}`}
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
      className={`flex flex-row gap-3 rounded-xl bg-white/10 p-5 transition-all hover:bg-white/30 ${
        highlight ? "bg-white/30" : ""
      }`}
      href={href}
      data-aos="fade-down"
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
