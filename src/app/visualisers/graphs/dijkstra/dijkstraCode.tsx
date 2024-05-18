import {
  CodeBracket,
  CodeBracket2,
  CodeKeyword,
  CodeName,
  CodeNumber,
  CodeOther,
  CodeOther2,
  CodeType,
} from "~components/code";

// code for dfs to display
const dijkstraCode = [
  {
    line: 0,
    tab: 0,
    code: (
      <>
        create <CodeName>pred</CodeName> and <CodeName>dist</CodeName>{" "}
        <span className="italic">arrays</span> and{" "}
        <span className="italic">set</span> <CodeName>vSet</CodeName>
      </>
    ),
  },
  {
    line: 1,
    tab: 0,
    code: (
      <>
        <CodeName>dist</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>src</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>=</CodeKeyword>{" "}
        <CodeNumber>0</CodeNumber>
      </>
    ),
  },
  {
    line: 2,
    tab: 0,
    code: (
      <>
        <CodeKeyword>while</CodeKeyword> <CodeName>vSet</CodeName> has{" "}
        <CodeType>vertex</CodeType> <CodeName>u</CodeName> with{" "}
        <CodeName>dist</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>u</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>!=</CodeKeyword>{" "}
        <CodeNumber>infinity</CodeNumber> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 3,
    tab: 1,
    code: (
      <>
        <CodeOther2>find</CodeOther2> <CodeType>vertex</CodeType>{" "}
        <CodeName>v</CodeName> in <CodeName>vSet</CodeName> with{" "}
        <CodeOther>smallest</CodeOther> <CodeName>dist</CodeName>
        <CodeKeyword>[</CodeKeyword>
        <CodeName>v</CodeName>
        <CodeKeyword>]</CodeKeyword>
      </>
    ),
  },
  {
    line: 4,
    tab: 1,
    code: (
      <>
        <CodeKeyword>for</CodeKeyword> each outgoing <CodeType>edge</CodeType>{" "}
        <CodeOther>(</CodeOther>
        <CodeName>v</CodeName>, <CodeName>w</CodeName>,{" "}
        <CodeName>weight</CodeName>
        <CodeOther>)</CodeOther> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 5,
    tab: 2,
    code: (
      <>
        <CodeKeyword>if</CodeKeyword> <CodeBracket>(</CodeBracket>
        <CodeName>dist</CodeName>
        <CodeBracket2>[</CodeBracket2>
        <CodeName>v</CodeName>
        <CodeBracket2>]</CodeBracket2> <CodeKeyword>+</CodeKeyword>{" "}
        <CodeName>weight</CodeName> <CodeKeyword>{"<"}</CodeKeyword>{" "}
        <CodeName>dist</CodeName>
        <CodeBracket2>[</CodeBracket2>
        <CodeName>w</CodeName>
        <CodeBracket2>]</CodeBracket2>
        <CodeBracket>)</CodeBracket> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 6,
    tab: 3,
    code: (
      <>
        <CodeName>pred</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>w</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>=</CodeKeyword>{" "}
        <CodeName>v</CodeName> and <CodeName>dist</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>w</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>=</CodeKeyword>{" "}
        <CodeName>dist</CodeName>
        <CodeBracket>[</CodeBracket>
        <CodeName>v</CodeName>
        <CodeBracket>]</CodeBracket> <CodeKeyword>+</CodeKeyword>{" "}
        <CodeName>weight</CodeName>
      </>
    ),
  },
  {
    line: 7,
    tab: 2,
    code: (
      <>
        <CodeBracket>{"}"}</CodeBracket>
      </>
    ),
  },
  {
    line: 8,
    tab: 1,
    code: (
      <>
        <CodeBracket>{"}"}</CodeBracket>
      </>
    ),
  },
  {
    line: 9,
    tab: 1,
    code: (
      <>
        <CodeOther2>remove</CodeOther2> <CodeName>v</CodeName> from{" "}
        <CodeName>vSet</CodeName>
      </>
    ),
  },
  {
    line: 10,
    tab: 0,
    code: (
      <>
        <CodeBracket>{"}"}</CodeBracket>
      </>
    ),
  },
] as const;

export default dijkstraCode;
