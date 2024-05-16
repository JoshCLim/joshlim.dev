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
const dfsCode = [
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

export default dfsCode;
