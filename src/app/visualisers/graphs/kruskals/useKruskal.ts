import useAlgorithm from "../algorithms/useAlgorithm";

export default function useKruskal() {
  const alg = useAlgorithm();

  if (alg.algorithm !== "Kruskal's") {
    return null;
  }

  return alg;
}
