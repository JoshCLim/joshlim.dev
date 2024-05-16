import useAlgorithm from "../algorithms/useAlgorithm";

// for DFS-only components to use
// honestly pretty useless?
export default function useDfs() {
  const alg = useAlgorithm();

  if (alg.algorithm !== "DFS") return null;

  return alg;
}
