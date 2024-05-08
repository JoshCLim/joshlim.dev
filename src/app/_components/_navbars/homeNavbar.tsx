"use client";

import Link from "next/link";

import { useState } from "react";

import { cn } from "~/app/utils";

import FadeIn from "~components/_animations/fadeIn";
import FadeInOut from "~components/_animations/fadeInOut";
import RotateScaleInOut from "~components/_animations/rotateScaleInOut";

import allPages from "./navbarPages";

import { AnimatePresence } from "framer-motion";
import { Menu, Xmark } from "iconoir-react";

export default function HomeNavbar({
  currPage,
}: {
  currPage: string;
  fixed?: boolean;
}) {
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <div className="fixed left-0 top-0 flex w-full flex-row justify-center gap-5 py-5 sm:justify-start sm:px-7 sm:py-7">
      <FadeIn delay={1000} duration={1000}>
        <button
          onClick={() => setShowNav((curr) => !curr)}
          className="relative translate-x-[-50%] px-[20px] py-5 sm:translate-x-0 sm:px-0 sm:ps-8"
        >
          <AnimatePresence>
            {showNav ? (
              <RotateScaleInOut
                key={1}
                className="absolute left-[50%] top-[50%]"
                duration={300}
              >
                <Xmark height={24} width={24} />
              </RotateScaleInOut>
            ) : (
              <RotateScaleInOut
                key={2}
                className="absolute left-[50%] top-[50%]"
                duration={300}
              >
                <Menu height={24} width={24} />
              </RotateScaleInOut>
            )}
          </AnimatePresence>
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
          "flex flex-row gap-3 rounded-xl p-5 transition-all hover:bg-white/5",
          highlight && "bg-white/10 hover:bg-white/15",
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
