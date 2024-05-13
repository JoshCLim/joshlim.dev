import { type Graph } from "./graph";

export type DfsStep = {
  lineNumber: number;
  vertexV: number;
  vertexU: number;
  visited: boolean[];
  stack: number[];
  pred: number[];
};

export const dfsCode = [
  { line: 0, tab: 0, code: "initialise visited, pred and stack s" },
  { line: 1, tab: 0, code: "StackPush(s, src)" },
  { line: 2, tab: 0, code: "while (!StackEmpty(s)):" },
  { line: 3, tab: 1, code: "Vertex v = StackPop(s);" },
  { line: 4, tab: 1, code: "if (visited[v]) continue;" },
  { line: 5, tab: 1, code: "visited[v] = true;" },
  { line: 6, tab: 1, code: "for (int u = graph.nV - 1; u >= 0; u--) {" },
  { line: 7, tab: 2, code: "if (!visited[u] && graph.edges[v][u]) {" },
  { line: 8, tab: 3, code: "StackPush(s, u);" },
  { line: 9, tab: 3, code: "pred[u] = v;" },
  { line: 10, tab: 2, code: "}" },
  { line: 11, tab: 1, code: "}" },
  { line: 12, tab: 0, code: "}" },
] as const;

export default function dfsGenerateSteps(
  graph: Graph,
  startingVertex: number,
): DfsStep[] {
  const res: DfsStep[] = [
    {
      lineNumber: 0,
      vertexV: -1,
      vertexU: -1,
      visited: new Array(graph.nV).fill(false) as boolean[],
      stack: [],
      pred: new Array(graph.nV).fill(-1) as number[],
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
        res.push(dfsStepCopy(res[stepNum]!, { lineNumber: 2 }));
        break;
      case 2:
        if (res[stepNum]!.stack.length === 0) {
          res.push(dfsStepCopy(res[stepNum]!, { lineNumber: 12 }));
        } else {
          const v = res[stepNum]!.stack[res[stepNum]!.stack.length - 1];
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
          res.push(dfsStepCopy(res[stepNum]!, { lineNumber: 2 }));
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
        res.push(dfsStepCopy(res[stepNum]!, { lineNumber: 2 }));
        break;
      case 12:
        return res;
    }

    stepNum++;
  }

  return res;
}

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
