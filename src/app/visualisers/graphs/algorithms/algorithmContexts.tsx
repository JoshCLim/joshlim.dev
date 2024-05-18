import BfsContextProvider from "../bfs/bfsContext";
import DfsContextProvider from "../dfs/dfsContext";
import DijkstraContextProvider from "../dijkstra/dijkstraContext";
import KruskalContextProvider from "../kruskals/kruskalsContext";
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
          <KruskalContextProvider>
            <PrimsContextProvider>{children}</PrimsContextProvider>
          </KruskalContextProvider>
        </DijkstraContextProvider>
      </BfsContextProvider>
    </DfsContextProvider>
  );
}
