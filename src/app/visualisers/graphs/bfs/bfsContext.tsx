"use client";

import { createContext, useContext } from "react";

import { useLocalStorage } from "usehooks-ts";

type BfsContextType = {
  // starting vertex
  bfsStartingVertex: number;
  setBfsStartingVertex: React.Dispatch<React.SetStateAction<number>>;
};

const BfsContext = createContext<BfsContextType | null>(null);

export default function BfsContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [bfsStartingVertex, setBfsStartingVertex] = useLocalStorage<number>(
    "bfs-start-vertex",
    NaN,
  );

  return (
    <BfsContext.Provider
      value={{
        bfsStartingVertex,
        setBfsStartingVertex,
      }}
    >
      {children}
    </BfsContext.Provider>
  );
}

export function useBfsContext() {
  const context = useContext(BfsContext);

  if (!context) {
    throw new Error("useBfsContext must be used within a BfsContextProvider");
  }

  return context;
}
