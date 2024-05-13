"use client";

import { cn } from "~/app/utils";

import { dfsCode } from "./dfs";
import { useGraphContext } from "./graphContext";

import { motion } from "framer-motion";

export default function DfsState() {
  const { dfsStartingVertex, dfsSteps, dfsStepIndex } = useGraphContext();

  if (!dfsSteps) return <></>;

  return (
    <div className="flex flex-grow flex-row gap-10">
      <motion.div
        className="flex-grow rounded-2xl border border-slate-600 bg-slate-800 p-3 px-4 text-left text-sm text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {dfsCode.map(({ tab, code }, i) => (
          <Code
            key={i}
            tab={tab}
            selected={dfsSteps[dfsStepIndex]!.lineNumber === i}
          >
            {code}
          </Code>
        ))}
      </motion.div>
      <div className="flex flex-grow flex-col items-center justify-center gap-8 font-mono">
        <div className="flex flex-row justify-center text-xl text-white">
          <code className="rounded-l-full border-r border-white bg-teal-500 px-5 py-2 shadow-sm">
            src: {dfsStartingVertex}
          </code>
          <code className="bg-teal-500 px-5 py-2 shadow-sm">
            v: {dfsSteps[dfsStepIndex]!.vertexV}
          </code>
          <code className="rounded-r-full border-l border-white bg-teal-500 px-5 py-2 shadow-sm">
            u: {dfsSteps[dfsStepIndex]!.vertexU}
          </code>
        </div>
        <div className="font-light">
          <div className="flex flex-row border-b border-r border-t border-black">
            <RowHeader>vertices</RowHeader>
            {dfsSteps[dfsStepIndex]!.visited.map((_, v) => (
              <div
                className={cn(
                  "flex aspect-square h-10 items-center justify-center",
                  v % 2 === 1 && "bg-slate-200",
                )}
                key={v}
              >
                {v}
              </div>
            ))}
          </div>
          <div className="flex flex-row border-b border-r border-black">
            <RowHeader>visited</RowHeader>
            {dfsSteps[dfsStepIndex]!.visited.map((visited, v) => (
              <div
                className={cn(
                  "flex aspect-square h-10 items-center justify-center",
                  v % 2 === 0 && "bg-slate-200",
                )}
                key={v}
              >
                {visited ? 1 : 0}
              </div>
            ))}
          </div>
          <div className="flex flex-row border-b border-r border-black">
            <RowHeader>pred</RowHeader>
            {dfsSteps[dfsStepIndex]!.pred.map((pred, v) => (
              <div
                className={cn(
                  "flex aspect-square h-10 items-center justify-center",
                  v % 2 === 1 && "bg-slate-200",
                )}
                key={v}
              >
                {pred}
              </div>
            ))}
          </div>
        </div>
        <DfsStack />
      </div>
    </div>
  );
}

function DfsStack() {
  const { dfsSteps, dfsStepIndex } = useGraphContext();

  if (!dfsSteps) return <></>;

  return (
    <motion.div
      layout
      className="text-md flex flex-row items-center justify-start overflow-hidden rounded-full border border-black"
    >
      <p className="bg-black px-2 py-1 text-white">Stack</p>
      <p className="bg-slate-700 px-2 py-1 text-white">Bottom</p>
      {dfsSteps[dfsStepIndex]!.stack.map((vertex, i) => (
        <p className={cn("px-3 py-1", i % 2 === 0 && "bg-white")} key={i}>
          {vertex}
        </p>
      ))}
      <p className="bg-slate-700 px-2 py-1 text-white">Top</p>
    </motion.div>
  );
}

function RowHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex w-24 items-center justify-center border-l border-r border-black px-4">
      {children}
    </div>
  );
}

function Code({
  tab = 0,
  children,
  selected = false,
}: {
  children?: React.ReactNode;
  tab?: number;
  selected?: boolean;
}) {
  return (
    <code
      className={cn(
        "block rounded-lg p-[1px] px-1 transition-colors",
        selected && "bg-slate-600 bg-opacity-70",
      )}
      style={{ marginLeft: `${tab * 20}px` }}
    >
      {children}
    </code>
  );
}
