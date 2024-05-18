import { Code, CodeWrapper } from "~components/code";

import kruskalCode from "./kruskalCode";
import useKruskal from "./useKruskal";

import { motion } from "framer-motion";
import { ArrowRight } from "iconoir-react";

export default function KruskalState() {
  const alg = useKruskal();

  if (!alg) return <></>;

  const currEdge = alg.steps?.[alg.stepIndex]?.uncheckedEdge;
  const numShownEdges = currEdge ? 5 : 6;

  return (
    <div className="flex flex-grow flex-col items-center gap-10">
      <CodeWrapper className="text-base">
        {kruskalCode.map(({ tab, code, line }, i) => (
          <Code
            key={i}
            line={line}
            tab={tab}
            selected={alg.steps?.[alg.stepIndex]!.lineNumber === line}
          >
            {code}
          </Code>
        ))}
      </CodeWrapper>
      <motion.div
        layout
        className="flex flex-row divide-x divide-white rounded-full font-mono text-lg text-white"
      >
        <motion.p
          layout
          className="bg-black px-2 py-1 first:rounded-l-full first:ps-3 last:rounded-r-full last:pe-3"
        >
          EdgesList
        </motion.p>
        {currEdge && (
          <motion.p
            layout
            initial={{ y: 0 }}
            animate={{ y: "-8px" }}
            exit={{ y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="flex flex-row items-center bg-yellow-700 px-2 py-1 first:rounded-l-full first:ps-3 last:rounded-r-full last:pe-3"
          >
            ({currEdge[0]}
            <ArrowRight height={12} width={12} strokeWidth={3} />
            {currEdge[1]},{currEdge[2]})
          </motion.p>
        )}
        {alg.steps?.[alg.stepIndex]?.sortedEdges
          .slice(0, numShownEdges)
          .map((edge) => (
            <motion.p
              layout
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: 0 }}
              key={`${edge[0]}-${edge[1]}-${edge[2]}`}
              className="flex flex-row items-center bg-slate-700 px-2 py-1 first:rounded-l-full first:ps-3 last:rounded-r-full last:pe-3"
            >
              ({edge[0]}
              <ArrowRight height={12} width={12} strokeWidth={3} />
              {edge[1]},{edge[2]})
            </motion.p>
          ))}
        {(alg.steps?.[alg.stepIndex]?.sortedEdges.length ?? 0) >
          numShownEdges && (
          <p className="bg-slate-700 px-2 py-1 first:rounded-l-full first:ps-3 last:rounded-r-full last:pe-3">
            ...
          </p>
        )}
      </motion.div>
    </div>
  );
}
