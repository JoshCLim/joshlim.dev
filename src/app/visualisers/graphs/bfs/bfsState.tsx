"use client";

import { cn } from "~/app/utils";

import dfsCode from "./bfsCode";
import useBfs from "./useBfs";

import { motion } from "framer-motion";

export default function BfsState() {
  const alg = useBfs();

  if (!alg) return <></>;

  if (!alg.steps) return <></>;

  const {
    startingVertex: bfsStartingVertex,
    steps: bfsSteps,
    stepIndex: bfsStepIndex,
  } = alg;

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
            selected={bfsSteps[bfsStepIndex]!.lineNumber === i}
          >
            {code}
          </Code>
        ))}
      </motion.div>
      <div className="flex flex-grow flex-col items-center justify-center gap-8 font-mono">
        <div className="flex flex-row justify-center text-xl text-white">
          <code className="rounded-l-full border-r border-white bg-teal-500 px-5 py-2 shadow-sm">
            src: {bfsStartingVertex}
          </code>
          <code className="bg-teal-500 px-5 py-2 shadow-sm">
            v: {bfsSteps[bfsStepIndex]!.vertexV}
          </code>
          <code className="rounded-r-full border-l border-white bg-teal-500 px-5 py-2 shadow-sm">
            u: {bfsSteps[bfsStepIndex]!.vertexU}
          </code>
        </div>
        <div className="font-light">
          <div className="flex flex-row border-b border-r border-t border-black">
            <RowHeader>vertices</RowHeader>
            {bfsSteps[bfsStepIndex]!.visited.map((_, v) => (
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
            {bfsSteps[bfsStepIndex]!.visited.map((visited, v) => (
              <VisitedCell
                visited={visited}
                v={v}
                key={v}
                highlight={
                  bfsStepIndex > 0
                    ? bfsSteps[bfsStepIndex - 1]!.visited[v] !==
                      bfsSteps[bfsStepIndex]!.visited[v]
                    : false
                }
              />
            ))}
          </div>
          <div className="flex flex-row border-b border-r border-black">
            <RowHeader>pred</RowHeader>
            {bfsSteps[bfsStepIndex]!.pred.map((pred, v) => (
              <PredCell
                pred={pred}
                v={v}
                key={v}
                highlight={
                  bfsStepIndex > 0
                    ? bfsSteps[bfsStepIndex - 1]!.pred[v] !==
                      bfsSteps[bfsStepIndex]!.pred[v]
                    : false
                }
              />
            ))}
          </div>
        </div>
        <BfsQueue />
      </div>
    </div>
  );
}

function BfsQueue() {
  const alg = useBfs();

  if (!alg || !alg.steps) return <></>;

  return (
    <motion.div
      layout
      className="text-md flex flex-row items-center justify-start overflow-hidden rounded-full border border-black"
    >
      <p className="bg-black px-2 py-1 text-white">Queue</p>
      <p className="bg-slate-700 px-2 py-1 text-white">Front</p>
      {alg.steps[alg.stepIndex]!.queue.map((vertex, i) => (
        <p className={cn("px-3 py-1", i % 2 === 0 && "bg-white")} key={i}>
          {vertex}
        </p>
      ))}
      <p className="bg-slate-700 px-2 py-1 text-white">Back</p>
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
    <div className="flex flex-row items-center gap-2 whitespace-nowrap">
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

function PredCell({
  pred,
  v,
  highlight = false,
}: {
  pred: number;
  v: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex aspect-square h-10 items-center justify-center transition-all",
        v % 2 === 1 && "bg-slate-200",
        highlight && v % 2 === 1 && "bg-red-300",
        highlight && v % 2 === 0 && "bg-red-200",
      )}
    >
      {pred}
    </div>
  );
}

function VisitedCell({
  visited,
  v,
  highlight = false,
}: {
  visited: boolean;
  v: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex aspect-square h-10 items-center justify-center transition-all",
        v % 2 === 0 && "bg-slate-200",
        highlight && v % 2 === 0 && "bg-red-300",
        highlight && v % 2 === 1 && "bg-red-200",
      )}
    >
      {visited ? 1 : 0}
    </div>
  );
}
