import { arrayCreate } from "~/app/utils";

import { type Graph } from "../graph";
import { type EdgesHighlight } from "../graphEdge";
import { type VerticesHighlight } from "../graphNode";
import dijkstraCode from "./dijkstraCode";

export type DijkstraStep = {
  lineNumber: number;
  vSet: number[];
  dist: (number | null)[]; // null to represent infinity
  pred: number[];
  vertexV: number;
  vertexW: number;
};

export function dijkstraGenerateSteps(
  graph: Graph,
  start: number,
): DijkstraStep[] {
  const res: DijkstraStep[] = [
    {
      lineNumber: 0,
      vSet: Array.from({ length: graph.nV }, (_, i) => i),
      dist: arrayCreate<number | null>(graph.nV, null),
      pred: arrayCreate<number>(graph.nV, -1),
      vertexV: -1,
      vertexW: -1,
    },
  ];

  let stepNum = 0;

  while (res[stepNum]!.lineNumber < dijkstraCode.length - 1) {
    const step = dijkstraStepDeepCopy(res[stepNum]!);
    const prevLine = step.lineNumber;

    switch (prevLine) {
      case 0:
        step.lineNumber = 1;
        step.dist[start] = 0;
        break;
      case 1:
        step.lineNumber = 2;
        break;
      case 2:
        if (step.vSet.some((v) => step.dist[v] !== null)) {
          step.lineNumber = 3;
          const finiteDistVertices = step.vSet.filter(
            (v) => step.dist[v] !== null,
          );
          step.vertexV = finiteDistVertices.reduce(
            (minV, v) => (step.dist[v]! < step.dist[minV]! ? v : minV),
            finiteDistVertices[0]!,
          );
        } else {
          step.lineNumber = 10;
          step.vertexV = -1;
        }
        break;
      case 3:
        step.lineNumber = 4;
        step.vertexW = -1;
        break;
      case 4:
        let w = step.vertexW + 1;
        for (; w < graph.nV; w++) {
          if (graph.edges[step.vertexV]![w]! > 0) {
            break;
          }
        }
        if (w < graph.nV) {
          step.lineNumber = 5;
          step.vertexW = w;
        } else {
          step.vertexW = -1;
          step.lineNumber = 8;
        }
        break;
      case 5:
        const newDist =
          step.dist[step.vertexV]! + graph.edges[step.vertexV]![step.vertexW]!;
        if (
          step.dist[step.vertexW] === null ||
          newDist < step.dist[step.vertexW]!
        ) {
          step.lineNumber = 6;
          step.pred[step.vertexW] = step.vertexV;
          step.dist[step.vertexW] = newDist;
        } else {
          step.lineNumber = 7;
        }
        break;
      case 6:
        step.lineNumber = 7;
        break;
      case 7:
        step.lineNumber = 4;
        break;
      case 8:
        step.lineNumber = 9;
        step.vSet = step.vSet.filter((v) => v !== step.vertexV);
        break;
      case 9:
        step.lineNumber = 2;
        break;
    }

    res.push(step);
    stepNum++;
  }

  return res;
}

function dijkstraStepDeepCopy(step: DijkstraStep): DijkstraStep {
  return {
    lineNumber: step.lineNumber,
    vSet: [...step.vSet],
    dist: [...step.dist],
    pred: [...step.pred],
    vertexV: step.vertexV,
    vertexW: step.vertexW,
  };
}

export function dijkstraVertexHighlight(
  graph: Graph,
  step: DijkstraStep,
  v: number,
): VerticesHighlight {
  if (step.vertexV === v) return 1;
  else if (!step.vSet.includes(v)) return 2;
  else if (step.vertexW === v) return 3;
  return 0;
}

export function dijkstraEdgeHighlight(
  graph: Graph,
  step: DijkstraStep,
  v: number,
  w: number,
): EdgesHighlight {
  if (step.vertexV === v && step.vertexW === w) return 1;
  else if (!graph.directed && step.vertexV === w && step.vertexW === v)
    return 1;
  return 0;
}
