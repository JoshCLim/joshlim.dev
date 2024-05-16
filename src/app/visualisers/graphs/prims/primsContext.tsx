"use client";

import { createContext, useContext } from "react";

import { useLocalStorage } from "usehooks-ts";

type PrimsContextType = {
  primStartingVertex: number;
  setPrimStartingVertex: React.Dispatch<React.SetStateAction<number>>;
};

const PrimsContext = createContext<PrimsContextType | null>(null);

export default function PrimsContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [primStartingVertex, setPrimStartingVertex] = useLocalStorage<number>(
    "prim-start-vertex",
    NaN,
  );

  return (
    <PrimsContext.Provider
      value={{
        primStartingVertex,
        setPrimStartingVertex,
      }}
    >
      {children}
    </PrimsContext.Provider>
  );
}

export function usePrimsContext() {
  const context = useContext(PrimsContext);

  if (!context) {
    throw new Error(
      "usePrimsContext must be used within a PrimsContextProvider",
    );
  }

  return context;
}
