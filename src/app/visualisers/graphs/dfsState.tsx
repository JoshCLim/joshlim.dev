"use client";

import usePrevious from "~/app/_hooks/usePrevious";
import { cn } from "~/app/utils";

import dfsCode from "./dfsCode";
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
        {dfsCode.map(({ tab, code, line }, i) => (
          <Code
            key={i}
            line={line + 1}
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
              <VisitedCell visited={visited} v={v} key={v} />
            ))}
          </div>
          <div className="flex flex-row border-b border-r border-black">
            <RowHeader>pred</RowHeader>
            {dfsSteps[dfsStepIndex]!.pred.map((pred, v) => (
              <PredCell pred={pred} v={v} key={v} />
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
  line,
}: {
  children?: React.ReactNode;
  tab?: number;
  selected?: boolean;
  line: number;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <code className="block w-4 text-right font-mono">{line}</code>
      <code
        className={cn(
          "block flex-grow rounded-lg p-[1px] px-1 font-mono transition-colors",
          selected && "bg-slate-600 bg-opacity-70",
        )}
        style={{ marginLeft: `${tab * 20}px` }}
      >
        {children}
      </code>
    </div>
  );
}

function PredCell({ pred, v }: { pred: number; v: number }) {
  const prevPred = usePrevious(pred);

  return (
    <div
      className={cn(
        "flex aspect-square h-10 items-center justify-center transition-all",
        v % 2 === 1 && "bg-slate-200",
        pred !== prevPred && v % 2 === 1 && "bg-red-300",
        pred !== prevPred && v % 2 === 0 && "bg-red-200",
      )}
    >
      {pred}
    </div>
  );
}

function VisitedCell({ visited, v }: { visited: boolean; v: number }) {
  const prevVisited = usePrevious(visited);

  return (
    <div
      className={cn(
        "flex aspect-square h-10 items-center justify-center transition-all",
        v % 2 === 0 && "bg-slate-200",
        visited !== prevVisited && v % 2 === 0 && "bg-red-300",
        visited !== prevVisited && v % 2 === 1 && "bg-red-200",
      )}
    >
      {visited ? 1 : 0}
    </div>
  );
}
