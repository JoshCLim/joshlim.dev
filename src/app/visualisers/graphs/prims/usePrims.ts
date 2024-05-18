import useAlgorithm from "../algorithms/useAlgorithm";

export default function usePrims() {
  const alg = useAlgorithm();

  if (alg.algorithm !== "Prim's") return null;

  return alg;
}
