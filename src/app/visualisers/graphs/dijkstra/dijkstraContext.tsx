"use client";

import { createContext, useContext } from "react";

import { useLocalStorage } from "usehooks-ts";

type DijkstraContextType = {
  dijkstraStartingVertex: number;
  setDijkstraStartingVertex: React.Dispatch<React.SetStateAction<number>>;
};

const DijkstraContext = createContext<DijkstraContextType | null>(null);

export default function DijkstraContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [dijkstraStartingVertex, setDijkstraStartingVertex] =
    useLocalStorage<number>("dijkstra-start-vertex", NaN);

  return (
    <DijkstraContext.Provider
      value={{
        dijkstraStartingVertex,
        setDijkstraStartingVertex,
      }}
    >
      {children}
    </DijkstraContext.Provider>
  );
}

export function useDijkstraContext() {
  const context = useContext(DijkstraContext);

  if (!context) {
    throw new Error(
      "useDijkstraContext must be used within a DijkstraContextProvider",
    );
  }

  return context;
}
