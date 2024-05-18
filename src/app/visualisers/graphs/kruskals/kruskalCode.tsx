import {
  CodeBracket,
  CodeFunction,
  CodeKeyword,
  CodeName,
  CodeNumber,
  CodeOther,
  CodeOther2,
  CodeType,
} from "~components/code";

const kruskalCode = [
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
        <CodeOther2>create</CodeOther2> <CodeName>list</CodeName> of all{" "}
        <CodeType>edges</CodeType> in <CodeName>g</CodeName>{" "}
        <CodeOther2>sorted</CodeOther2> by <CodeOther>weight</CodeOther>
      </>
    ),
  },
  {
    line: 3,
    tab: 0,
    code: (
      <>
        <CodeKeyword>while</CodeKeyword> <CodeName>mst.nE</CodeName>{" "}
        <CodeKeyword>{"<"}</CodeKeyword> <CodeName>g.nV</CodeName>{" "}
        <CodeKeyword>-</CodeKeyword> <CodeNumber>1</CodeNumber> and{" "}
        <CodeName>list</CodeName> <CodeFunction>not empty</CodeFunction>{" "}
        <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 4,
    tab: 1,
    code: (
      <>
        <CodeOther2>add</CodeOther2> next <CodeType>edge</CodeType>{" "}
        <CodeName>e</CodeName> in <CodeName>list</CodeName> with{" "}
        <CodeOther>smallest weight</CodeOther> to <CodeName>mst</CodeName>
      </>
    ),
  },
  {
    line: 5,
    tab: 1,
    code: (
      <>
        <CodeKeyword>if</CodeKeyword> <CodeName>mst</CodeName>{" "}
        <CodeFunction>has cycle</CodeFunction> after adding e{" "}
        <CodeBracket>{"{"}</CodeBracket>
      </>
    ),
  },
  {
    line: 6,
    tab: 2,
    code: (
      <>
        <CodeOther2>remove</CodeOther2> <CodeName>e</CodeName> from{" "}
        <CodeName>mst</CodeName>
      </>
    ),
  },
  {
    line: 7,
    tab: 1,
    code: <CodeBracket>{"}"}</CodeBracket>,
  },
  {
    line: 8,
    tab: 0,
    code: <CodeBracket>{"}"}</CodeBracket>,
  },
];

export default kruskalCode;
