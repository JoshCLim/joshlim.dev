"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { clamp, cn } from "~/app/utils";

import useWindowSize from "~hooks/useWindowSize";

import { type UseAlgorithmNotNull } from "./algorithmTypes";
import useAlgorithm from "./useAlgorithm";

import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import {
  FastArrowLeft,
  FastArrowRight,
  NavArrowLeft,
  NavArrowRight,
  Pause,
  Play,
} from "iconoir-react";

export default function AlgorithmRun() {
  const windowSize = useWindowSize();

  const alg = useAlgorithm();

  const advanceAlgorithmInterval = useRef<NodeJS.Timeout | null>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [playDelay, setPlayDelay] = useState<number>(1000);

  const playTimeoutCb = useCallback(() => {
    if (!alg.algorithm) return;

    alg.next();

    // if at end of steps, stop playing
    if (alg.stepIndex >= (alg.steps?.length ?? Infinity) - 1) {
      setPlay(false);
      return;
    }

    // set timeout for next step
    advanceAlgorithmInterval.current = setTimeout(playTimeoutCb, playDelay);
  }, [alg, playDelay]);

  useEffect(() => {
    if (play) {
      if (advanceAlgorithmInterval.current)
        clearTimeout(advanceAlgorithmInterval.current);
      advanceAlgorithmInterval.current = setTimeout(playTimeoutCb, playDelay);
    } else {
      if (advanceAlgorithmInterval.current)
        clearTimeout(advanceAlgorithmInterval.current);
    }

    return () => {
      if (advanceAlgorithmInterval.current)
        clearTimeout(advanceAlgorithmInterval.current);
    };
  }, [play, playDelay, playTimeoutCb]);

  if (!alg.algorithm) return <></>;

  return (
    <motion.div
      layout
      className="flex flex-col items-center gap-5 rounded-2xl border border-slate-300 px-10 py-8"
    >
      <motion.div
        layout
        transition={{ duration: 0.1, damping: 20, stiffness: 150 }}
        className="flex flex-row rounded-full shadow-sm"
      >
        <motion.button
          layout
          transition={{ duration: 0.1, damping: 20, stiffness: 150 }}
          className={cn(
            "flex flex-row gap-1 rounded-l-full border-r border-slate-100 bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            alg.stepIndex <= 0 &&
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
          )}
          onClick={alg.start}
        >
          <FastArrowLeft />
        </motion.button>
        <motion.button
          layout
          transition={{ duration: 0.1, damping: 20, stiffness: 150 }}
          className={cn(
            "flex flex-row gap-1 border-r border-slate-100 bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            alg.stepIndex <= 0 &&
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
          )}
          onClick={alg.prev}
        >
          <NavArrowLeft />
        </motion.button>
        <motion.button
          layout
          transition={{ duration: 0.1, damping: 20, stiffness: 150 }}
          className={cn(
            "flex flex-row gap-1 bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            alg.steps &&
              alg.stepIndex >= alg.steps.length - 1 &&
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
          )}
          onClick={() => {
            if (!alg.steps) return;
            if (alg.stepIndex >= alg.steps.length - 1) return;

            setPlay((prev) => !prev);
          }}
        >
          {play ? <Pause /> : <Play />}
        </motion.button>
        {play && <PlayDelaySlider setPlayDelay={setPlayDelay} />}
        <motion.button
          layout
          transition={{ duration: 0.1, damping: 20, stiffness: 150 }}
          className={cn(
            "flex flex-row gap-1 border-l border-slate-100 bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            alg.steps &&
              alg.stepIndex >= alg.steps.length - 1 &&
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
          )}
          onClick={alg.next}
        >
          <NavArrowRight />
        </motion.button>
        <motion.button
          layout
          transition={{ duration: 0.1, damping: 20, stiffness: 150 }}
          className={cn(
            "flex flex-row gap-1 rounded-r-full border-l border-slate-100 bg-green-500 px-5 py-3 text-lg transition-colors hover:bg-green-600",
            alg.steps &&
              alg.stepIndex >= alg.steps.length - 1 &&
              "cursor-not-allowed bg-gray-400 hover:bg-gray-400",
          )}
          onClick={alg.end}
        >
          <FastArrowRight />
        </motion.button>
      </motion.div>
      {alg.steps && (
        <RunSlider key={`run-slider-${windowSize.width}`} alg={alg} />
      )}
    </motion.div>
  );
}

function PlayDelaySlider({
  setPlayDelay,
}: {
  setPlayDelay: (val: number) => void;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(sliderRef.current?.clientHeight ?? 0);

  useMotionValueEvent(y, "change", (latest) => {
    if (!sliderRef.current) return;
    console.log(latest, sliderRef.current.clientHeight);
    console.log(latest / sliderRef.current.clientHeight);
    setPlayDelay(
      2000 * Math.pow(latest / sliderRef.current.clientHeight, 3) + 100,
    );
  });

  useEffect(() => {
    y.set((sliderRef.current?.clientHeight ?? 0) / 2);
  }, [y]);

  return (
    <div
      ref={sliderRef}
      className="relative w-[9px] border-l border-slate-100 bg-blue-400"
      onClick={(e) => {
        y.set(
          e.clientY -
            (sliderRef.current?.getBoundingClientRect().y ?? e.clientX),
        );
      }}
    >
      <motion.div
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: sliderRef.current?.clientHeight ?? 0,
        }}
        dragElastic={false}
        dragMomentum={false}
        style={{ y, x: "-0%", translateY: "-50%" }}
        whileHover={{ scale: 1.3 }}
        className="absolute left-[-50%] top-0 h-4 w-4 cursor-move rounded-full bg-white shadow-lg"
      ></motion.div>
    </div>
  );
}

function RunSlider({ alg }: { alg: UseAlgorithmNotNull }) {
  const showStepOfMilliseconds = 2200;
  const sliderRef = useRef<HTMLDivElement>(null);

  const [showStepOf, setShowStepOf] = useState(false);
  const [showStepOfTimeout, setShowStepOfTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [dragging, setDragging] = useState(false);

  const x = useMotionValue(0);

  useEffect(() => {
    if (!alg.steps || !sliderRef.current) return;
    x.set((alg.stepIndex / alg.steps.length) * sliderRef.current.clientWidth);
  }, [alg.algorithm, alg.stepIndex, alg.steps, x]);

  const algUpdateStep = useCallback(
    (xVal: number) => {
      const len = alg.steps?.length ?? Infinity;
      const newIndex = clamp(
        0,
        Math.floor((xVal / (sliderRef.current?.clientWidth ?? Infinity)) * len),
        len - 1,
      );
      alg.setStepIndex(newIndex);
      x.set((newIndex / len) * (sliderRef.current?.clientWidth ?? 0));
    },
    [alg, x],
  );

  useMotionValueEvent(x, "change", (latest) => {
    setShowStepOf(true);
    if (showStepOfTimeout) clearTimeout(showStepOfTimeout);
    setShowStepOfTimeout(
      setTimeout(() => setShowStepOf(false), showStepOfMilliseconds),
    );

    if (!dragging || !alg.steps || !sliderRef.current) return;

    const len = alg.steps.length;
    const newIndex = clamp(
      0,
      Math.floor((latest / sliderRef.current.clientWidth) * alg.steps.length),
      alg.steps.length - 1,
    );
    alg.setStepIndex(newIndex);
    x.set((newIndex / len) * sliderRef.current.clientWidth);
  });

  // don't render if the steps have not been calculated
  if (!alg.steps) return <></>;

  return (
    <motion.div
      className="relative mx-auto h-2 w-[90%] cursor-pointer rounded-full bg-slate-800"
      onClick={(e) => {
        algUpdateStep(
          e.clientX -
            (sliderRef.current?.getBoundingClientRect().x ?? e.clientX),
        );
      }}
      ref={sliderRef}
      onHoverStart={() => {
        setShowStepOf(true);
        if (showStepOfTimeout) {
          clearTimeout(showStepOfTimeout);
        }
      }}
      onHoverEnd={() =>
        setShowStepOfTimeout(
          setTimeout(() => setShowStepOf(false), showStepOfMilliseconds),
        )
      }
    >
      <motion.button
        className="absolute top-[50%] h-5 w-5 cursor-move rounded-full bg-white shadow-lg"
        drag="x"
        style={{ translateY: "-50%", x, translateX: "-50%" }}
        dragConstraints={{
          left: 0,
          right: sliderRef.current?.clientWidth ?? 0,
        }}
        dragMomentum={false}
        dragElastic={0}
        whileHover={{ scale: 1.3 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onClick={(e) => e.stopPropagation()}
        onTap={(e) => e.stopPropagation()}
      >
        <p
          className={cn(
            "absolute left-[50%] top-[100%] min-w-24 translate-x-[-50%] text-xs text-black transition-opacity",
            showStepOf ? "opacity-100" : "opacity-0",
          )}
        >
          Step {alg.stepIndex + 1} of {alg.steps.length}
        </p>
      </motion.button>
    </motion.div>
  );
}
