import DfsContextProvider from "./dfs/dfsContext";

export default function AlgorithmContexts({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <DfsContextProvider>{children}</DfsContextProvider>;
}
