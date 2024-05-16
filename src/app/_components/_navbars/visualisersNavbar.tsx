"use client";

import Link from "next/link";

import { useRef, useState } from "react";

import { cn } from "~/app/utils";

import useWindowSize from "~hooks/useWindowSize";

import allPages from "./navbarPages";

import { AnimatePresence, motion } from "framer-motion";
import { IconoirProvider, Lock, LockSlash } from "iconoir-react";

export default function NavbarVisualisers({
  currPage,
  showUnlock = true,
}: {
  currPage: string;
  showUnlock?: boolean;
}) {
  const navRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const [locked, setLocked] = useState<boolean>(true);

  console.log(windowSize);

  return (
    <>
      <motion.nav className="flex flex-row flex-wrap justify-stretch bg-[#eeeeeeaa] font-light text-black shadow-2xl sm:hidden">
        <IconoirProvider iconProps={{ strokeWidth: 1 }}>
          {allPages.map((page) => (
            <NavLink
              key={page.href}
              href={page.href}
              icon={page.icon}
              highlight={page.href === `/${currPage}`}
            />
          ))}
        </IconoirProvider>
      </motion.nav>
      <motion.nav
        drag={locked ? false : "x"}
        dragConstraints={{
          left: 0,
          right: windowSize.width - (navRef.current?.offsetWidth ?? 0),
        }}
        whileDrag={{ cursor: "grabbing", backgroundColor: "#eeeeeeaa" }}
        className="fixed left-0 top-0 z-50 hidden h-screen max-w-56 flex-col items-start justify-start bg-white font-light text-black shadow-2xl sm:flex"
        ref={navRef}
      >
        <IconoirProvider iconProps={{ strokeWidth: 1 }}>
          {allPages.map((page) => (
            <NavLink
              key={page.href}
              href={page.href}
              icon={page.icon}
              highlight={page.href === `/${currPage}`}
            />
          ))}
        </IconoirProvider>
        {/* <h1 className="flex flex-grow flex-col justify-center text-wrap px-7 pb-24 text-center text-2xl">
        Visualising Data Structures + Algorithms
      </h1> */}
        {showUnlock && (
          <button
            className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-center p-7"
            onClick={() => setLocked((prev) => !prev)}
          >
            <AnimatePresence>
              {locked ? (
                <LockAnimationWrapper key={"lock"}>
                  <Lock />
                </LockAnimationWrapper>
              ) : (
                <LockAnimationWrapper key={"unlock"}>
                  <LockSlash />
                </LockAnimationWrapper>
              )}
            </AnimatePresence>
          </button>
        )}
      </motion.nav>
    </>
  );
}

function NavLink({
  href,
  icon,
  highlight,
}: {
  href: string;
  icon: React.ReactNode;
  highlight: boolean;
}) {
  return (
    <Link
      className={cn(
        "group flex flex-grow flex-row gap-3 px-5 py-3 sm:w-full sm:flex-grow-0 sm:p-8 sm:pe-16",
        highlight && "shadow-[inset_0_-2px_9px_rgba(0,0,0,0.1)] brightness-90",
      )}
      href={href}
    >
      <div className="flex w-full flex-row gap-3 transition-all group-hover:translate-x-2">
        {icon}
        {href.substring(1).length > 0 ? (
          <span>{href.substring(1)}</span>
        ) : (
          "home"
        )}
      </div>
    </Link>
  );
}

function LockAnimationWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      {children}
    </motion.div>
  );
}
