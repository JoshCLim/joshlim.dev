import useAlgorithm from "../algorithms/useAlgorithm";

// for BFS-only components to use
// honestly pretty useless?
export default function useBfs() {
  const alg = useAlgorithm();

  if (alg.algorithm !== "BFS") return null;

  return alg;
}
