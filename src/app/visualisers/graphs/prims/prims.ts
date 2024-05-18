import { arrayCreate, arrayCreate2D } from "~/app/utils";

import { type Graph } from "../graph";
import { type EdgesHighlight } from "../graphEdge";
import { type VerticesHighlight } from "../graphNode";
import primsCode from "./primsCode";

export type PrimsStep = {
  lineNumber: number;
  mstVertices: boolean[];
  mstEdges: number[][];
  highlightCandidateEdges: boolean;
};

export function primGenerateSteps(
  graph: Graph,
  startVertex: number,
): PrimsStep[] {
  const res: PrimsStep[] = [
    {
      lineNumber: 1,
      mstVertices: arrayCreate(graph.nV, false),
      mstEdges: arrayCreate2D(graph.nV, graph.nV, 0),
      highlightCandidateEdges: false,
    },
  ];

  let stepNum = 0;

  while (res[stepNum]!.lineNumber < primsCode.length) {
    const step = primStepDeepCopy(res[stepNum]!);
    const prevLine = step.lineNumber;

    switch (prevLine) {
      case 1:
        step.mstVertices[startVertex] = true;
        step.lineNumber = 2;
        break;
      case 2:
        step.lineNumber = 3;
        step.highlightCandidateEdges = true;
        break;
      case 3:
        let minWeight = Infinity;
        let minEdge: [number, number] = [-1, -1];
        for (let i = 0; i < graph.nV; i++) {
          for (let j = i + 1; j < graph.nV; j++) {
            if (
              step.mstVertices[i] !== step.mstVertices[j] &&
              graph.edges[i]![j]! !== 0 &&
              graph.edges[i]![j]! < minWeight
            ) {
              minWeight = graph.edges[i]![j]!;
              minEdge = [i, j];
            }
          }
        }
        if (isFinite(minWeight)) {
          step.mstVertices[minEdge[0]] = true;
          step.mstVertices[minEdge[1]] = true;
          step.mstEdges[minEdge[0]]![minEdge[1]] = minWeight;
          step.mstEdges[minEdge[1]]![minEdge[0]] = minWeight;
          step.lineNumber = 4;
        } else {
          step.lineNumber = 5;
        }
        step.highlightCandidateEdges = false;
        break;
      case 4:
        step.lineNumber = 3;
        step.highlightCandidateEdges = true;
        break;
    }

    res.push(step);
    stepNum++;
  }

  return res;
}

function primStepDeepCopy(step: PrimsStep): PrimsStep {
  return {
    lineNumber: step.lineNumber,
    mstVertices: [...step.mstVertices],
    mstEdges: step.mstEdges.map((row) => [...row]),
    highlightCandidateEdges: step.highlightCandidateEdges,
  };
}

export function primsVertexHighlight(
  grpah: Graph,
  step: PrimsStep,
  v: number,
): VerticesHighlight {
  if (!step.mstVertices[v]) return 4;
  return 0;
}

export function primsEdgeHighlight(
  _: Graph,
  step: PrimsStep,
  u: number,
  v: number,
): EdgesHighlight {
  if (step.mstEdges[u]![v] !== 0) return 2;
  if (
    step.highlightCandidateEdges &&
    step.mstVertices[u] !== step.mstVertices[v]
  )
    return 1;
  return 3;
}
