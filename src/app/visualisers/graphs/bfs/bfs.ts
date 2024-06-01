import { arrayCreate, pairMatch } from "~/app/utils";

import { type Graph } from "../graph/graph";
import { type EdgesHighlight } from "../graph/graphEdge";
import { type VerticesHighlight } from "../graph/graphNode";
import bfsCode from "./bfsCode";

export type BfsStep = {
  lineNumber: number;
  vertexV: number;
  vertexU: number;
  visited: boolean[];
  queue: number[];
  pred: number[];
  highlightVertex: number;
  actuallyVisited: boolean[];
};

/**
 * returns an array of DfsStep objects representing the steps of the
 * DFS algorithm for a given graph and starting vertex
 */
export function bfsGenerateSteps(
  graph: Graph,
  startingVertex: number,
): BfsStep[] {
  const res: BfsStep[] = [
    {
      lineNumber: 0,
      vertexV: -1,
      vertexU: -1,
      visited: arrayCreate<boolean>(graph.nV, false),
      queue: [],
      pred: arrayCreate<number>(graph.nV, -1),
      highlightVertex: -1,
      actuallyVisited: arrayCreate<boolean>(graph.nV, false),
    },
  ];
  let stepNum = 0;

  // each case has the logic for the next line in the algorithm
  while (res[stepNum]!.lineNumber != bfsCode.length - 1) {
    switch (res[stepNum]!.lineNumber) {
      case 0:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 1,
            queue: [startingVertex],
          }),
        );
        break;
      case 1:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 2,
            visited: res[stepNum]!.visited.map((v, i) =>
              i === startingVertex ? true : v,
            ),
          }),
        );
        break;
      case 2:
        res.push(bfsStepCopy(res[stepNum]!, { lineNumber: 3 }));
        break;
      case 3:
        if (res[stepNum]!.queue.length === 0) {
          res.push(bfsStepCopy(res[stepNum]!, { lineNumber: 12 }));
        } else {
          const v = res[stepNum]!.queue[0]!;
          res.push(
            bfsStepCopy(res[stepNum]!, {
              lineNumber: 4,
              vertexV: v,
              queue: res[stepNum]!.queue.slice(1),
              highlightVertex: v,
              actuallyVisited: res[stepNum]!.actuallyVisited.map((val, i) =>
                i === v ? true : val,
              ),
            }),
          );
        }
        break;
      case 4:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 5,
            vertexU: 0,
          }),
        );
        break;
      case 5:
        if (res[stepNum]!.vertexU === graph.nV) {
          res.push(bfsStepCopy(res[stepNum]!, { lineNumber: 11 }));
        } else {
          res.push(
            bfsStepCopy(res[stepNum]!, {
              lineNumber: 6,
            }),
          );
        }
        break;
      case 6:
        if (
          !res[stepNum]!.visited[res[stepNum]!.vertexU] &&
          graph.edges[res[stepNum]!.vertexV]![res[stepNum]!.vertexU]! > 0
        ) {
          res.push(
            bfsStepCopy(res[stepNum]!, {
              lineNumber: 7,
              queue: [...res[stepNum]!.queue, res[stepNum]!.vertexU],
            }),
          );
        } else {
          res.push(bfsStepCopy(res[stepNum]!, { lineNumber: 10 }));
        }
        break;
      case 7:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 8,
            pred: res[stepNum]!.pred.map((v, i) =>
              i === res[stepNum]!.vertexU ? res[stepNum]!.vertexV : v,
            ),
          }),
        );
        break;
      case 8:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 9,
            visited: res[stepNum]!.visited.map((v, i) =>
              i === res[stepNum]!.vertexU ? true : v,
            ),
          }),
        );
        break;
      case 9:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 10,
          }),
        );
        break;
      case 10:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 5,
            vertexU: res[stepNum]!.vertexU + 1,
          }),
        );
        break;
      case 11:
        res.push(
          bfsStepCopy(res[stepNum]!, {
            lineNumber: 3,
            highlightVertex: -1,
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
function bfsStepCopy(
  step: BfsStep,
  {
    lineNumber,
    vertexV,
    vertexU,
    visited,
    queue,
    pred,
    highlightVertex,
    actuallyVisited,
  }: {
    lineNumber?: number;
    vertexV?: number;
    vertexU?: number;
    visited?: boolean[];
    queue?: number[];
    pred?: number[];
    highlightVertex?: number;
    actuallyVisited?: boolean[];
  },
): BfsStep {
  return {
    lineNumber: lineNumber ?? step.lineNumber,
    vertexV: vertexV ?? step.vertexV,
    vertexU: vertexU ?? step.vertexU,
    visited: visited ?? [...step.visited],
    queue: queue ?? [...step.queue],
    pred: pred ?? [...step.pred],
    highlightVertex: highlightVertex ?? step.highlightVertex,
    actuallyVisited: actuallyVisited ?? [...step.actuallyVisited],
  };
}

/**
 * returns what colour to highlight a vertex v based on the current step and graph
 */
export function bfsVerticesHighlight(
  graph: Graph,
  step: BfsStep,
  v: number,
): VerticesHighlight {
  if (step.highlightVertex === v) return 1;
  else if (step.actuallyVisited[v]) return 2;
  else if (step.vertexU === v && graph.edges[step.vertexV]![v]) return 3;
  else return 0;
}

/**
 * what colour to highlight an edge (u,v) based on the current step
 */
export function bfsEdgeHighlight(
  graph: Graph,
  step: BfsStep,
  u: number,
  v: number,
): EdgesHighlight {
  if (graph.directed) return step.vertexV === u && step.vertexU === v ? 1 : 0;
  else return pairMatch(step.vertexV, step.vertexU, v, u) ? 1 : 0;
}
