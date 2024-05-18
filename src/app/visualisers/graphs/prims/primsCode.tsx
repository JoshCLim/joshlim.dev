import {
  CodeBracket,
  CodeFunction,
  CodeKeyword,
  CodeName,
  CodeOther,
  CodeOther2,
  CodeType,
} from "~components/code";

const primsCode = [
  {
    line: 1,
    tab: 0,
    code: (
      <>
        <CodeOther2>create</CodeOther2> <CodeName>mst</CodeName>{" "}
        <CodeType>graph</CodeType> with <CodeName>g.nV</CodeName>{" "}
        <CodeType>vertices</CodeType> and (initially) no{" "}
        <CodeType>edges</CodeType>
      </>
    ),
  },
  {
    line: 2,
    tab: 0,
    code: (
      <>
        consider <CodeName>src</CodeName> to be{" "}
        <CodeOther>&apos;in&apos;</CodeOther> the <CodeName>mst</CodeName>
      </>
    ),
  },
  {
    line: 3,
    tab: 0,
    code: (
      <>
        <CodeKeyword>while</CodeKeyword>{" "}
        <CodeFunction>there exists</CodeFunction> edges between a vertex{" "}
        <CodeOther>&apos;in&apos;</CodeOther> <CodeName>mst</CodeName> and a
        vertex <CodeOther>not &apos;in&apos;</CodeOther>{" "}
        <CodeName>mst</CodeName> <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 4,
    tab: 1,
    code: (
      <>
        <CodeOther2>add</CodeOther2> the <CodeOther>smallest</CodeOther>{" "}
        weighted such <CodeType>edge</CodeType> to <CodeName>mst</CodeName>
      </>
    ),
  },
  {
    line: 5,
    tab: 0,
    code: <CodeBracket>{"}"}</CodeBracket>,
  },
];

export default primsCode;
