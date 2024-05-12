"use client";

import { useState } from "react";

import NavbarVisualisers from "~/app/_components/_navbars/visualisersNavbar";
import useClickAway from "~/app/_hooks/useClickAway";

import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "iconoir-react";

export default function PageNavbar() {
  // for handling showing / hiding the navbar
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const navRef = useClickAway<HTMLDivElement>(() => setShowNavbar(false));

  return (
    <>
      <motion.div
        initial={{ translateX: "0%" }}
        animate={{ translateX: showNavbar ? "0%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        ref={navRef}
        className="z-50"
      >
        <NavbarVisualisers currPage="graphs/dfs" showUnlock={false} />
      </motion.div>
      <AnimatePresence>
        {!showNavbar && (
          <motion.button
            whileTap={{
              scale: 0.6,
              transition: { type: "spring", stiffness: 50 },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            exit={{ opacity: 0, transition: { delay: 0 } }}
            className="absolute z-30 p-6"
            onClick={() => setShowNavbar(true)}
          >
            <Menu color="#000" height={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
