"use client";

import { useEffect, useRef, useState } from "react";

import { clamp, cn } from "~/app/utils";

import { useGraphContext } from "./graphContext";

import { AnimatePresence, motion, useMotionValue } from "framer-motion";
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
    <div className="space-y-5 py-10">
      <div className="flex flex-row overflow-hidden rounded-full">
        <button
          className={cn(
            "flex flex-row gap-1 border-r border-white bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            algorithm === "DFS" &&
              dfsSteps &&
              dfsStepIndex <= 0 &&
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
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
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
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
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
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
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
          )}
          onClick={() => {
            if (algorithm === "DFS") dfsEnd();
          }}
        >
          <FastArrowRight />
        </button>
      </div>
      {dfsSteps && <RunSlider />}
    </div>
  );
}

function RunSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [showStepOf, setShowStepOf] = useState(false);

  const { algorithm, dfsStepIndex, dfsSteps, setDfsStepIndex } =
    useGraphContext();

  const x = useMotionValue(0);

  useEffect(() => {
    switch (algorithm) {
      case "DFS":
        if (!dfsSteps || !sliderRef.current) return;
        x.set((dfsStepIndex / dfsSteps.length) * sliderRef.current.clientWidth);
        break;
    }
  }, [dfsStepIndex, dfsSteps, algorithm, x]);

  if (!dfsSteps) return <></>;

  const dfsUpdateStep = (x: number) => {
    const len = dfsSteps.length;
    setDfsStepIndex(
      clamp(
        0,
        Math.floor((x / (sliderRef.current?.clientWidth ?? Infinity)) * len),
        len - 1,
      ),
    );
  };

  return (
    <motion.div
      className="relative h-2 w-full cursor-pointer rounded-full bg-slate-800"
      onClick={(e) => {
        dfsUpdateStep(
          e.clientX -
            (sliderRef.current?.getBoundingClientRect().x ?? e.clientX),
        );
      }}
      ref={sliderRef}
      onHoverStart={() => setShowStepOf(true)}
      onHoverEnd={() => setShowStepOf(false)}
    >
      <motion.button
        className="absolute top-[50%] h-5 w-5 cursor-move rounded-full bg-white shadow-lg"
        drag="x"
        style={{ translateY: "-50%", x }}
        dragConstraints={{
          left: 0,
          right: sliderRef.current?.clientWidth ?? 0,
        }}
        dragMomentum={false}
        dragElastic={0}
        whileHover={{ scale: 1.3 }}
        onDragEnd={() => {
          switch (algorithm) {
            case "DFS":
              dfsUpdateStep(x.get());
          }
        }}
        onClick={(e) => e.stopPropagation()}
        onTap={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {showStepOf && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[50%] top-[100%] min-w-24 translate-x-[-50%] text-xs text-black"
            >
              Step {dfsStepIndex + 1} of {dfsSteps.length}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
