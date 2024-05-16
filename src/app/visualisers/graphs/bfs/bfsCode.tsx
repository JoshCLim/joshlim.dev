import {
  CodeBracket,
  CodeBracket2,
  CodeFunction,
  CodeKeyword,
  CodeName,
  CodeNumber,
  CodeType,
} from "~components/code";

// code for dfs to display
const bfsCode = [
  {
    line: 0,
    tab: 0,
    code: (
      <>
        create <CodeName>visited</CodeName>, <CodeName>pred</CodeName>{" "}
        <span className="italic">arrays</span> and{" "}
        <span className="italic">queue</span> <CodeName>q</CodeName>
      </>
    ),
  },
  {
    line: 1,
    tab: 0,
    code: (
      <>
        <CodeFunction>QueueEnqueue</CodeFunction>
        <CodeBracket>(</CodeBracket>
        <CodeName>q, src</CodeName>
        <CodeBracket>)</CodeBracket>
      </>
    ),
  },
  {
    line: 2,
    tab: 0,
    code: (
      <>
        <CodeName>visited</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>src</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>=</CodeKeyword>{" "}
        <CodeType>true</CodeType>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 3,
    tab: 0,
    code: (
      <>
        <CodeKeyword>while</CodeKeyword> <CodeBracket>(</CodeBracket>
        <CodeKeyword>!</CodeKeyword>
        <CodeFunction>QueueEmpty</CodeFunction>
        <CodeBracket2>(</CodeBracket2>
        <CodeName>q</CodeName>
        <CodeBracket2>)</CodeBracket2>
        <CodeBracket>)</CodeBracket> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 4,
    tab: 1,
    code: (
      <>
        <CodeType>int</CodeType> <CodeName>v</CodeName>{" "}
        <CodeKeyword>=</CodeKeyword> <CodeFunction>QueueDequeue</CodeFunction>
        <CodeBracket2>(</CodeBracket2>
        <CodeName>q</CodeName>
        <CodeBracket2>)</CodeBracket2>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 5,
    tab: 1,
    code: (
      <>
        <CodeType>for</CodeType> <CodeBracket>(</CodeBracket>
        <CodeType>int</CodeType> <CodeName>u</CodeName>{" "}
        <CodeKeyword>=</CodeKeyword> <CodeNumber>0</CodeNumber>
        <CodeName>;</CodeName> <CodeName>u</CodeName>{" "}
        <CodeKeyword>{"<"}</CodeKeyword> <CodeName>g.nV</CodeName>
        <CodeName>;</CodeName> <CodeName>u</CodeName>
        <CodeKeyword>++</CodeKeyword>
        <CodeBracket>)</CodeBracket> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 6,
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
    line: 7,
    tab: 3,
    code: (
      <>
        <CodeFunction>QueueEnqueue</CodeFunction>
        <CodeBracket>(</CodeBracket>
        <CodeName>q, u</CodeName>
        <CodeBracket>)</CodeBracket>
        <CodeName>;</CodeName>
      </>
    ),
  },
  {
    line: 8,
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
    line: 9,
    tab: 3,
    code: (
      <>
        <CodeName>visited</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>u</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>=</CodeKeyword>{" "}
        <CodeType>true</CodeType>
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

export default bfsCode;
