import BfsContextProvider from "../bfs/bfsContext";
import DfsContextProvider from "../dfs/dfsContext";
import DijkstraContextProvider from "../dijkstra/dijkstraContext";
import PrimsContextProvider from "../prims/primsContext";

export default function AlgorithmContexts({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <DfsContextProvider>
      <BfsContextProvider>
        <DijkstraContextProvider>
          <PrimsContextProvider>{children}</PrimsContextProvider>
        </DijkstraContextProvider>
      </BfsContextProvider>
    </DfsContextProvider>
  );
}
