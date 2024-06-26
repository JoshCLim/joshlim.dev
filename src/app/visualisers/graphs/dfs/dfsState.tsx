"use client";

import { cn } from "~/app/utils";

import { Code, CodeWrapper } from "~components/code";

import dfsCode from "./dfsCode";
import useDfs from "./useDfs";

import { motion } from "framer-motion";

export default function DfsState() {
  const alg = useDfs();

  if (!alg) return <></>;

  if (!alg.steps) return <></>;

  const {
    startingVertex: dfsStartingVertex,
    steps: dfsSteps,
    stepIndex: dfsStepIndex,
  } = alg;

  return (
    <div className="flex flex-grow flex-row gap-10">
      <CodeWrapper>
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
      </CodeWrapper>
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
              <VisitedCell
                visited={visited}
                v={v}
                key={v}
                highlight={
                  dfsStepIndex > 0
                    ? dfsSteps[dfsStepIndex - 1]!.visited[v] !==
                      dfsSteps[dfsStepIndex]!.visited[v]
                    : false
                }
              />
            ))}
          </div>
          <div className="flex flex-row border-b border-r border-black">
            <RowHeader>pred</RowHeader>
            {dfsSteps[dfsStepIndex]!.pred.map((pred, v) => (
              <PredCell
                pred={pred}
                v={v}
                key={v}
                highlight={
                  dfsStepIndex > 0
                    ? dfsSteps[dfsStepIndex - 1]!.pred[v] !==
                      dfsSteps[dfsStepIndex]!.pred[v]
                    : false
                }
              />
            ))}
          </div>
        </div>
        <DfsStack />
      </div>
    </div>
  );
}

function DfsStack() {
  const alg = useDfs();

  if (!alg || !alg.steps) return <></>;

  return (
    <motion.div
      layout
      className="text-md flex flex-row items-center justify-start overflow-hidden rounded-full border border-black"
    >
      <p className="bg-black px-2 py-1 text-white">Stack</p>
      <p className="bg-slate-700 px-2 py-1 text-white">Bottom</p>
      {alg.steps[alg.stepIndex]!.stack.map((vertex, i) => (
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

function PredCell({
  pred,
  v,
  highlight,
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
