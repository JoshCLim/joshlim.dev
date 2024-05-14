import {
  CodeBracket,
  CodeBracket2,
  CodeFunction,
  CodeKeyword,
  CodeName,
  CodeNumber,
  CodeType,
} from "~components/code";

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
  {
    line: 0,
    tab: 0,
    code: (
      <>
        create <CodeName>visited</CodeName>, <CodeName>pred</CodeName>{" "}
        <span className="italic">arrays</span> and{" "}
        <span className="italic">stack</span> <CodeName>s</CodeName>
      </>
    ),
  },
  {
    line: 1,
    tab: 0,
    code: (
      <>
        <CodeFunction>StackPush</CodeFunction>
        <CodeBracket>(</CodeBracket>
        <CodeName>s, src</CodeName>
        <CodeBracket>)</CodeBracket>
      </>
    ),
  },
  {
    line: 2,
    tab: 0,
    code: (
      <>
        <CodeKeyword>while</CodeKeyword> <CodeBracket>(</CodeBracket>
        <CodeKeyword>!</CodeKeyword>
        <CodeFunction>StackEmpty</CodeFunction>
        <CodeBracket2>(</CodeBracket2>
        <CodeName>s</CodeName>
        <CodeBracket2>)</CodeBracket2>
        <CodeBracket>)</CodeBracket> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 3,
    tab: 1,
    code: (
      <>
        <CodeType>int</CodeType> <CodeName>v</CodeName>{" "}
        <CodeKeyword>=</CodeKeyword> <CodeFunction>StackPop</CodeFunction>
        <CodeBracket2>(</CodeBracket2>
        <CodeName>s</CodeName>
        <CodeBracket2>)</CodeBracket2>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 4,
    tab: 1,
    code: (
      <>
        <CodeKeyword>if</CodeKeyword> <CodeBracket>(</CodeBracket>
        <CodeName>visited</CodeName>
        <CodeBracket2>[</CodeBracket2>
        <CodeName>v</CodeName>
        <CodeBracket2>]</CodeBracket2>
        <CodeBracket>)</CodeBracket> <CodeKeyword>continue</CodeKeyword>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 5,
    tab: 1,
    code: (
      <>
        <CodeName>visited</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>v</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>=</CodeKeyword>{" "}
        <CodeType>true</CodeType>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 6,
    tab: 1,
    code: (
      <>
        <CodeType>for</CodeType> <CodeBracket>(</CodeBracket>
        <CodeType>int</CodeType> <CodeName>u</CodeName>{" "}
        <CodeKeyword>=</CodeKeyword> <CodeName>g.nV</CodeName>{" "}
        <CodeKeyword>-</CodeKeyword> <CodeNumber>1</CodeNumber>
        <CodeName>;</CodeName> <CodeName>u</CodeName>{" "}
        <CodeKeyword>{">="}</CodeKeyword> <CodeNumber>0</CodeNumber>
        <CodeName>;</CodeName> <CodeName>u</CodeName>
        <CodeKeyword>--</CodeKeyword>
        <CodeBracket>)</CodeBracket> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 7,
    tab: 2,
    code: (
      <>
        <CodeKeyword>if</CodeKeyword> <CodeBracket>(</CodeBracket>
        <CodeKeyword>!</CodeKeyword>
        <CodeName>visited</CodeName>
        <CodeBracket2>[</CodeBracket2>
        <CodeName>u</CodeName>
        <CodeBracket2>]</CodeBracket2> <CodeKeyword>&&</CodeKeyword>{" "}
        <CodeName>g.edges</CodeName>
        <CodeBracket2>[</CodeBracket2>
        <CodeName>v</CodeName>
        <CodeBracket2>][</CodeBracket2>
        <CodeName>u</CodeName>
        <CodeBracket2>]</CodeBracket2>
        <CodeBracket>)</CodeBracket> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 8,
    tab: 3,
    code: (
      <>
        <CodeFunction>StackPush</CodeFunction>
        <CodeBracket>(</CodeBracket>
        <CodeName>s, u</CodeName>
        <CodeBracket>)</CodeBracket>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 9,
    tab: 3,
    code: (
      <>
        <CodeName>pred</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>u</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>=</CodeKeyword>{" "}
        <CodeName>v</CodeName>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 10,
    tab: 2,
    code: (
      <>
        <CodeBracket>{"}"}</CodeBracket>
      </>
    ),
  },
  {
    line: 11,
    tab: 1,
    code: (
      <>
        <CodeBracket>{"}"}</CodeBracket>
      </>
    ),
  },
  {
    line: 12,
    tab: 0,
    code: (
      <>
        <CodeBracket>{"}"}</CodeBracket>
      </>
    ),
  },
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
