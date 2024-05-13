"use client";

import { cn } from "~/app/utils";

import { useGraphContext } from "./graphContext";

import {
  FastArrowLeft,
  FastArrowRight,
  NavArrowLeft,
  NavArrowRight,
} from "iconoir-react";

export default function AlgorithmRun() {
  const {
    algorithm,
    dfsNext,
    dfsPrev,
    dfsSteps,
    dfsStepIndex,
    dfsStart,
    dfsEnd,
  } = useGraphContext();

  return (
    <div className="py-10">
      <div className="flex flex-row overflow-hidden rounded-full">
        <button
          className={cn(
            "flex flex-row gap-1 border-r border-white bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            algorithm === "DFS" &&
              dfsSteps &&
              dfsStepIndex <= 0 &&
              "bg-gray-400 hover:bg-gray-400",
          )}
          onClick={() => {
            if (algorithm === "DFS") dfsStart();
          }}
        >
          <FastArrowLeft />
        </button>
        <button
          className={cn(
            "flex flex-row gap-1 border-r border-white bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            algorithm === "DFS" &&
              dfsSteps &&
              dfsStepIndex <= 0 &&
              "bg-gray-400 hover:bg-gray-400",
          )}
          onClick={() => {
            if (algorithm === "DFS") dfsPrev();
          }}
        >
          <NavArrowLeft />
        </button>
        {/* <button className="flex flex-row gap-1 bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-lime-600">
          <Play />
        </button> */}
        <button
          className={cn(
            "flex flex-row gap-1 border-l border-white bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            algorithm === "DFS" &&
              dfsSteps &&
              dfsStepIndex >= dfsSteps.length - 1 &&
              "bg-gray-400 hover:bg-gray-400",
          )}
          onClick={() => {
            if (algorithm === "DFS") dfsNext();
          }}
        >
          <NavArrowRight />
        </button>
        <button
          className={cn(
            "flex flex-row gap-1 border-l border-white bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            algorithm === "DFS" &&
              dfsSteps &&
              dfsStepIndex >= dfsSteps.length - 1 &&
              "bg-gray-400 hover:bg-gray-400",
          )}
          onClick={() => {
            if (algorithm === "DFS") dfsEnd();
          }}
        >
          <FastArrowRight />
        </button>
      </div>
    </div>
  );
}
