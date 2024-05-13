"use client";

import { cn } from "~/app/utils";

import { useGraphContext } from "./graphContext";

const dfsCode = [
  { tab: 0, code: "initialise visited, pred and stack s" },
  { tab: 0, code: "StackPush(s, src)" },
  { tab: 0, code: "while (!StackEmpty(s)):" },
  { tab: 1, code: "Vertex v = StackPop(s);" },
  { tab: 2, code: "if (visited[v]) continue;" },
  { tab: 3, code: "visited[v] = true;" },
  { tab: 4, code: "for (int u = 0; u < graph.nV; u++) {" },
  { tab: 5, code: "if (!visited[u] && graph.edges[v][u]) {" },
  { tab: 6, code: "StackPush(s, u);" },
  { tab: 6, code: "pred[u] = v;" },
  { tab: 5, code: "}" },
  { tab: 4, code: "}" },
  { tab: 0, code: "}" },
];

export default function DfsAlgorithm() {
  const {
    dfsVisited,
    dfsPred,
    dfsLineNumber,
    dfsStartingVertex,
    dfsVertexU,
    dfsVertexV,
  } = useGraphContext();

  return (
    <div className="flex flex-grow flex-row gap-10">
      <div className="flex-grow rounded-2xl border border-slate-600 bg-white p-3 px-4 text-left text-sm">
        {dfsCode.map(({ tab, code }, i) => (
          <Code key={i} tab={tab} selected={dfsLineNumber === i}>
            {code}
          </Code>
        ))}
      </div>
      <div className="flex flex-grow flex-col items-center justify-center gap-10">
        <div className="flex flex-row justify-center text-white">
          <code className="rounded-l-full border-r border-white bg-teal-500 px-3 py-1 shadow-sm">
            src: {dfsStartingVertex}
          </code>
          <code className="bg-teal-500 px-3 py-1 shadow-sm">
            u: {dfsVertexU}
          </code>
          <code className="rounded-r-full border-l border-white bg-teal-500 px-3 py-1 shadow-sm">
            v: {dfsVertexV}
          </code>
        </div>
        <div>
          <div className="flex flex-row border-b border-black">
            <RowHeader>vertices</RowHeader>
            {dfsVisited.map((_, v) => (
              <div
                className={cn(
                  "flex aspect-square h-10 items-center justify-center",
                  v % 2 === 1 && "bg-slate-200",
                )}
                key={v}
              >
                {v}
              </div>
            ))}
          </div>
          <div className="flex flex-row border-b border-black">
            <RowHeader>visited</RowHeader>
            {dfsVisited.map((visited, v) => (
              <div
                className={cn(
                  "flex aspect-square h-10 items-center justify-center",
                  v % 2 === 0 && "bg-slate-200",
                )}
                key={v}
              >
                {visited ? 1 : 0}
              </div>
            ))}
          </div>
          <div className="flex flex-row">
            <RowHeader>pred</RowHeader>
            {dfsPred.map((pred, v) => (
              <div
                className={cn(
                  "flex aspect-square h-10 items-center justify-center",
                  v % 2 === 1 && "bg-slate-200",
                )}
                key={v}
              >
                {pred}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RowHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex w-20 items-center justify-center border-r border-black px-4">
      {children}
    </div>
  );
}

function Code({
  tab = 0,
  children,
  selected = false,
}: {
  children?: React.ReactNode;
  tab?: number;
  selected?: boolean;
}) {
  return (
    <code
      className={cn(
        "block rounded-lg p-[1px] px-1 transition-colors",
        selected && "bg-slate-200",
      )}
      style={{ marginLeft: `${tab * 20}px` }}
    >
      {children}
    </code>
  );
}
