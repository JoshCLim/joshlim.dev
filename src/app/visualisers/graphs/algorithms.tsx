import DfsState from "./dfs/dfsState";

// list of algorithms available
export const algorithms = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Kruskal's",
  "Prim's",
] as const;
export type AlgorithmType = (typeof algorithms)[number];

export function algorithmStateComponent(algorithmName: AlgorithmType) {
  switch (algorithmName) {
    case "DFS":
      return <DfsState />;
    default:
      return null;
  }
}

// which algorithms require a starting vertex
export const startingVertexAlgorithms: AlgorithmType[] = [
  "DFS",
  "BFS",
  "Dijkstra's",
  "Prim's",
] as const;

export function algorithmToTitle(algorithm: AlgorithmType | null): string {
  if (!algorithm) return "select an algorithm...";

  switch (algorithm) {
    case "DFS":
      return "depth-first search";
    case "BFS":
      return "breadth-first search";
    case "Dijkstra's":
      return "Dijkstra's algorithm (shortest path)";
    case "Kruskal's":
      return "Kruskal's algorithm (minimum spanning tree)";
    case "Prim's":
      return "Prim's algorithm (minimum spanning tree)";
  }
}
