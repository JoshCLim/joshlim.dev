import { Code, CodeWrapper } from "~components/code";

import primsCode from "./primsCode";
import usePrims from "./usePrims";

export default function PrimsState() {
  const alg = usePrims();

  if (!alg) return <></>;

  return (
    <div className="flex flex-grow flex-col items-center gap-10">
      <code className="rounded-full border-r border-white bg-teal-500 px-5 py-2 font-mono text-xl text-white shadow-sm">
        src: {alg.startingVertex}
      </code>
      <CodeWrapper className="text-base">
        {primsCode.map(({ tab, code, line }, i) => (
          <Code
            key={i}
            line={line}
            tab={tab}
            selected={alg.steps?.[alg.stepIndex]?.lineNumber === line}
          >
            {code}
          </Code>
        ))}
      </CodeWrapper>
    </div>
  );
}
