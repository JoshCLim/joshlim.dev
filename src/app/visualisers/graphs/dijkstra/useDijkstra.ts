import useAlgorithm from "../algorithms/useAlgorithm";

// for DFS-only components to use
// honestly pretty useless?
export default function useDfs() {
  const alg = useAlgorithm();

  if (alg.algorithm !== "Dijkstra's") return null;

  return alg;
}
