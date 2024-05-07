"use client";

import Link from "next/link";

import { Menu } from "iconoir-react";
import { useState } from "react";
import allPages from "./navbarPages";
import FadeIn from "../_animations/fadeIn";
import { cn } from "~/app/utils";
import FadeInOut from "../_animations/fadeInOut";
import { AnimatePresence } from "framer-motion";

export default function HomeNavbar({
  currPage,
}: {
  currPage: string;
  fixed?: boolean;
}) {
  const [showNav, setShowNav] = useState<boolean>(false);

  const toggleShowNav = () => {
    setShowNav((curr) => !curr);
  };

  return (
    <div className="fixed left-0 top-0 flex w-full flex-row justify-center gap-5 py-7 sm:justify-start sm:px-7">
      <FadeIn delay={1000} duration={1000}>
        <button
          onClick={toggleShowNav}
          className="py-5 sm:ps-5"
          data-aos="fade-in"
          data-aos-delay="1000"
          data-aos-duration="1000"
        >
          <Menu />
        </button>
      </FadeIn>
      <AnimatePresence>
        {!!showNav && <Navbar currPage={currPage} />}
      </AnimatePresence>
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
        "left-0 top-0 flex flex-row items-center gap-3 text-white md:px-4",
        fixed && "fixed",
      )}
    >
      {allPages.map((page, index) => (
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
    <FadeInOut
      delay={index * 50}
      duration={500}
      exitDelay={0}
      exitDuration={200}
    >
      <Link
        className={cn(
          "flex flex-row gap-3 rounded-xl bg-white/10 p-5 transition-all hover:bg-white/30",
          highlight && "bg-white/30",
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
