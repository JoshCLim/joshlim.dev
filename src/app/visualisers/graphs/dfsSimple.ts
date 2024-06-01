import { arrayCreate } from "~/app/utils";

import { type Graph } from "./graph/graph";

type DfsSimpleStep = {
  vertexV: number;
  vertexU: number;
  visited: boolean[];
  stack: number[];
  pred: number[];
};

export function dfsSimpleGenerateSteps(
  graph: Graph,
  startingVertex: number,
): DfsSimpleStep[] {
  const res: DfsSimpleStep[] = [
    {
      vertexV: -1,
      vertexU: -1,
      visited: arrayCreate<boolean>(graph.nV, false),
      stack: [],
      pred: arrayCreate<number>(graph.nV, -1),
    },
  ];

  // push src onto stack
  res.push({
    vertexV: -1,
    vertexU: -1,
    visited: res[res.length - 1]!.visited,
    stack: [startingVertex],
    pred: res[res.length - 1]!.pred,
  });

  while (res[res.length - 1]!.stack.length > 0) {
    const lastResElem = res[res.length - 1]!;
    res.push({
      vertexV: lastResElem.stack[lastResElem.stack.length - 1]!,
      vertexU: -1,
      visited: lastResElem.visited,
      stack: lastResElem.stack.slice(0, -1),
      pred: lastResElem.pred,
    });
  }

  return res;
}
