import { arrayCreate, pairMatch } from "~/app/utils";

import { type Graph } from "../graph/graph";
import { type EdgesHighlight } from "../graph/graphEdge";
import { type VerticesHighlight } from "../graph/graphNode";
import dfsCode from "./dfsCode";

export type DfsStep = {
  lineNumber: number;
  vertexV: number;
  vertexU: number;
  visited: boolean[];
  stack: number[];
  pred: number[];
};

/**
 * returns an array of DfsStep objects representing the steps of the
 * DFS algorithm for a given graph and starting vertex
 */
export function dfsGenerateSteps(
  graph: Graph,
  startingVertex: number,
): DfsStep[] {
  const res: DfsStep[] = [
    {
      lineNumber: 0,
      vertexV: -1,
      vertexU: -1,
      visited: arrayCreate<boolean>(graph.nV, false),
      stack: [],
      pred: arrayCreate<number>(graph.nV, -1),
    },
  ];
  let stepNum = 0;

  while (res[stepNum]!.lineNumber != dfsCode.length - 1) {
    switch (res[stepNum]!.lineNumber) {
      case 0:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 1,
            stack: [startingVertex],
          }),
        );
        break;
      case 1:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 2,
          }),
        );
        break;
      case 2:
        if (res[stepNum]!.stack.length === 0) {
          res.push(dfsStepCopy(res[stepNum]!, { lineNumber: 12 }));
        } else {
          const v = res[stepNum]!.stack[res[stepNum]!.stack.length - 1]!;
          res.push(
            dfsStepCopy(res[stepNum]!, {
              lineNumber: 3,
              vertexV: v,
              stack: res[stepNum]!.stack.slice(0, -1),
            }),
          );
        }
        break;
      case 3:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 4,
          }),
        );
        break;
      case 4:
        if (res[stepNum]!.visited[res[stepNum]!.vertexV]) {
          res.push(
            dfsStepCopy(res[stepNum]!, {
              lineNumber: 2,
            }),
          );
        } else {
          res.push(
            dfsStepCopy(res[stepNum]!, {
              lineNumber: 5,
              visited: res[stepNum]!.visited.map((v, i) =>
                i === res[stepNum]!.vertexV ? true : v,
              ),
            }),
          );
        }
        break;
      case 5:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 6,
            vertexU: graph.nV - 1,
          }),
        );
        break;
      case 6:
        if (res[stepNum]!.vertexU < 0) {
          res.push(dfsStepCopy(res[stepNum]!, { lineNumber: 11 }));
        } else {
          res.push(
            dfsStepCopy(res[stepNum]!, {
              lineNumber: 7,
            }),
          );
        }
        break;
      case 7:
        if (
          !res[stepNum]!.visited[res[stepNum]!.vertexU] &&
          graph.edges[res[stepNum]!.vertexV]![res[stepNum]!.vertexU]! > 0
        ) {
          res.push(
            dfsStepCopy(res[stepNum]!, {
              lineNumber: 8,
              stack: [...res[stepNum]!.stack, res[stepNum]!.vertexU],
            }),
          );
        } else {
          res.push(dfsStepCopy(res[stepNum]!, { lineNumber: 10 }));
        }
        break;
      case 8:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 9,
            pred: res[stepNum]!.pred.map((v, i) =>
              i === res[stepNum]!.vertexU ? res[stepNum]!.vertexV : v,
            ),
          }),
        );
        break;
      case 9:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 10,
          }),
        );
        break;
      case 10:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 6,
            vertexU: res[stepNum]!.vertexU - 1,
          }),
        );
        break;
      case 11:
        res.push(
          dfsStepCopy(res[stepNum]!, {
            lineNumber: 2,
          }),
        );
        break;
      case 12:
        return res;
      default:
        throw new Error("Invalid line number");
    }

    stepNum++;
  }

  return res;
}

/**
 * returns a deep copy of a DfsStep object with the specified fields updated
 */
function dfsStepCopy(
  step: DfsStep,
  {
    lineNumber,
    vertexV,
    vertexU,
    visited,
    stack,
    pred,
  }: {
    lineNumber?: number;
    vertexV?: number;
    vertexU?: number;
    visited?: boolean[];
    stack?: number[];
    pred?: number[];
  },
): DfsStep {
  return {
    lineNumber: lineNumber ?? step.lineNumber,
    vertexV: vertexV ?? step.vertexV,
    vertexU: vertexU ?? step.vertexU,
    visited: visited ?? [...step.visited],
    stack: stack ?? [...step.stack],
    pred: pred ?? [...step.pred],
  };
}

/**
 * returns what colour to highlight a vertex v based on the current step and graph
 */
export function dfsVerticesHighlight(
  graph: Graph,
  step: DfsStep,
  v: number,
): VerticesHighlight {
  if (step.vertexV === v) return 1;
  else if (step.visited[v]) return 2;
  else if (step.vertexU === v && graph.edges[step.vertexV]![v]) return 3;
  else return 0;
}

/**
 * what colour to highlight an edge (u,v) based on the current step
 */
export function dfsEdgeHighlight(
  graph: Graph,
  step: DfsStep,
  u: number,
  v: number,
): EdgesHighlight {
  if (graph.directed) return step.vertexV === u && step.vertexU === v ? 1 : 0;
  else return pairMatch(step.vertexV, step.vertexU, v, u) ? 1 : 0;
}
