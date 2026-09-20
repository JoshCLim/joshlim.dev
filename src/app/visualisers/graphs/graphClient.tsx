"use client";

import dynamic from "next/dynamic";

import AlgorithmContexts from "./algorithms/algorithmContexts";
import GraphContextProvider from "./graph/graphContext";

function GraphProviders({ children }: { children: React.ReactNode }) {
  return (
    <GraphContextProvider>
      <AlgorithmContexts>{children}</AlgorithmContexts>
    </GraphContextProvider>
  );
}

// The graph workspace depends on browser state and must not prerender.
export default dynamic(() => Promise.resolve(GraphProviders), { ssr: false });
