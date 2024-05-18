import { arrayCreate, arrayCreate2D } from "~/app/utils";

import { type Graph } from "../graph";
import { type EdgesHighlight } from "../graphEdge";
import { type VerticesHighlight } from "../graphNode";
import kruskalCode from "./kruskalCode";

export type KruskalsStep = {
  lineNumber: number;
  mstEdges: number[][];
  mstNumEdges: number;
  uncheckedEdge: [number, number, number] | null;
  sortedEdges: [number, number, number][];
};

export function kruskalGenerateSteps(graph: Graph): KruskalsStep[] {
  const res: KruskalsStep[] = [
    {
      lineNumber: 1,
      mstEdges: arrayCreate2D(graph.nV, graph.nV, 0),
      mstNumEdges: 0,
      uncheckedEdge: null,
      sortedEdges: [],
    },
  ];

  let stepNum = 0;

  while (res[stepNum]!.lineNumber != kruskalCode.length) {
    const step = kruskalStepDeepCopy(res[stepNum]!);
    const prevLine = step.lineNumber;

    switch (prevLine) {
      case 1:
        step.lineNumber = 2;
        step.sortedEdges = graphGetSortedEdges(graph);
        break;
      case 2:
        step.lineNumber = 3;
        break;
      case 3:
        if (step.mstNumEdges >= graph.nV - 1 || step.sortedEdges.length === 0) {
          step.lineNumber = 8;
        } else {
          step.lineNumber = 4;
          step.uncheckedEdge = step.sortedEdges.shift()!;
        }
        break;
      case 4:
        step.lineNumber = 5;
        step.mstEdges[step.uncheckedEdge![0]]![step.uncheckedEdge![1]] =
          step.uncheckedEdge![2];
        step.mstEdges[step.uncheckedEdge![1]]![step.uncheckedEdge![0]] =
          step.uncheckedEdge![2];
        break;
      case 5:
        if (kruskalHasCycle(step.mstEdges)) {
          step.lineNumber = 6;
          step.mstEdges[step.uncheckedEdge![0]]![step.uncheckedEdge![1]] = 0;
          step.mstEdges[step.uncheckedEdge![1]]![step.uncheckedEdge![0]] = 0;
        } else {
          step.lineNumber = 7;
          step.mstNumEdges++;
        }
        step.uncheckedEdge = null;
        break;
      case 6:
        step.lineNumber = 7;
        break;
      case 7:
        step.lineNumber = 3;
        break;
    }

    res.push(step);
    stepNum++;
  }

  return res;
}

function graphGetSortedEdges(graph: Graph): [number, number, number][] {
  const res: [number, number, number][] = [];

  for (let i = 0; i < graph.nV; i++) {
    for (let j = i + 1; j < graph.nV; j++) {
      if (graph.edges[i]![j]) {
        res.push([i, j, graph.edges[i]![j]!]);
      }
    }
  }

  res.sort((a, b) => a[2] - b[2]);

  return res;
}

function kruskalHasCycle(mstEdges: number[][]): boolean {
  const nV = mstEdges.length;

  for (let i = 0; i < nV; i++) {
    const visited = arrayCreate(nV, false);
    if (graphHasCycle(mstEdges, i, i, visited)) {
      return true;
    }
  }

  return false;
}

function graphHasCycle(
  mstEdges: number[][],
  v: number,
  prev: number,
  visited: boolean[],
): boolean {
  visited[v] = true;

  for (let i = 0; i < mstEdges.length; i++) {
    if (mstEdges[v]![i] && i !== prev) {
      if (visited[i]) return true;
      if (graphHasCycle(mstEdges, i, v, visited)) return true;
    }
  }

  return false;
}

function kruskalStepDeepCopy(step: KruskalsStep): KruskalsStep {
  return {
    lineNumber: step.lineNumber,
    mstEdges: step.mstEdges.map((row) => row.slice()),
    mstNumEdges: step.mstNumEdges,
    uncheckedEdge: step.uncheckedEdge,
    sortedEdges: step.sortedEdges.map((edge) => edge.slice()) as [
      number,
      number,
      number,
    ][],
  };
}

export function kruskalVerticesHighlight(): VerticesHighlight {
  return 0;
}

export function kruskalEdgesHighlight(
  graph: Graph,
  step: KruskalsStep,
  u: number,
  v: number,
): EdgesHighlight {
  if (
    step.uncheckedEdge &&
    step.uncheckedEdge[0] === u &&
    step.uncheckedEdge[1] === v
  ) {
    return 1;
  } else if (step.mstEdges[u]![v]) {
    return 2;
  } else {
    return 3;
  }
}
