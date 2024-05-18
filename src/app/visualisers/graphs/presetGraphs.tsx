"use client";

import useClickAway from "~/app/_hooks/useClickAway";
import { cn } from "~/app/utils";

import Divider from "~components/divider";

import { type GraphPresetType, useGraphContext } from "./graphContext";

import { motion } from "framer-motion";
import { CurveArray, FastArrowRight, Trash } from "iconoir-react";

const presets = [
  {
    name: "comp2521-wk7-tut",
    graph: {
      nV: 8,
      directed: false,
      weighted: false,
      edges: [
        [0, 1, 1, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 1, 0, 1, 0],
      ],
      positions: [
        { x: 207.31640625, y: 97.40234375 },
        { x: 195.83203125, y: 276.984375 },
        { x: 391, y: 103.62890625 },
        { x: 153.05859375, y: 397.49609375 },
        { x: 287.72265625, y: 510.84765625 },
        { x: 50.46484375, y: 450.96484375 },
        { x: 451.6328125, y: 262.44921875 },
        { x: 305.90625, y: 256.09375 },
      ],
    },
  },
  {
    name: "comp2521-wk8-tut-dijkstra",
    graph: {
      nV: 8,
      edges: [
        [0, 5, 4, 6, 0, 0, 0, 0],
        [5, 0, 8, 0, 0, 2, 7, 0],
        [4, 8, 0, 1, 3, 7, 0, 0],
        [6, 0, 1, 0, 6, 0, 0, 0],
        [0, 0, 3, 6, 0, 3, 0, 8],
        [0, 2, 7, 0, 3, 0, 3, 6],
        [0, 7, 0, 0, 0, 3, 0, 5],
        [0, 0, 0, 0, 8, 6, 5, 0],
      ],
      positions: [
        { x: 44.28028091775902, y: 79.7421875 },
        { x: 213.171875, y: 52.0859375 },
        { x: 144.42578125, y: 214.7109375 },
        { x: 46.94140625, y: 364.5390625 },
        { x: 231.3203125, y: 351.7890625 },
        { x: 325.6953125, y: 183.58203125 },
        { x: 424.81640625, y: 73.86328125 },
        { x: 420.44140625, y: 374.06640625 },
      ],
      directed: false,
      weighted: true,
    },
  },
  {
    name: "preset-directed-weighted",
    graph: {
      nV: 8,
      edges: [
        [0, 5, 1, 6, 0, 0, 0, 0],
        [0, 0, 8, 0, 0, 2, 7, 0],
        [0, 0, 0, 1, 2, 7, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 8],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 5],
        [0, 0, 0, 0, 0, 6, 0, 0],
      ],
      positions: [
        { x: 44.28028091775902, y: 79.7421875 },
        { x: 213.171875, y: 52.0859375 },
        { x: 144.42578125, y: 214.7109375 },
        { x: 46.94140625, y: 364.5390625 },
        { x: 231.3203125, y: 351.7890625 },
        { x: 325.04296875, y: 215.62109375 },
        { x: 424.81640625, y: 73.86328125 },
        { x: 420.44140625, y: 374.06640625 },
      ],
      directed: true,
      weighted: true,
    },
  },
] as const satisfies GraphPresetType[];

export default function PresetGraphChooser() {
  const {
    graph,
    graphOperations,
    graphPreset,
    running,
    graphPresets,
    setGraphPresets,
  } = useGraphContext();

  const presetChooserRef = useClickAway<HTMLDivElement>(() =>
    graphPreset.setShow(false),
  );

  return (
    <motion.div
      ref={presetChooserRef}
      key="adj-matrix"
      className="fixed right-0 top-16 z-subinfinity aspect-square text-slate-800"
      initial={{ x: "130%" }}
      animate={{ x: running ? "200%" : graphPreset.show ? "40px" : "100%" }}
      exit={{ x: "130%" }}
      transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
    >
      <button
        className="absolute left-0 top-12 z-subinfinity translate-x-[-100%] rounded-l-2xl border-b border-l border-t border-black bg-gray-50 px-2 py-5 shadow-2xl transition-colors hover:bg-gray-200"
        onClick={() => graphPreset.setShow((prev) => !prev)}
        title="Edit Graph Edges"
      >
        {graphPreset.show ? (
          <FastArrowRight height={24} />
        ) : (
          <CurveArray height={24} />
        )}
      </button>
      <div className="overflow-hidden rounded-l-2xl border-b border-l border-t border-black bg-gray-50 pe-10 shadow-2xl">
        <div className="space-y-3 p-3 px-5">
          <h3 className="text-right text-xl font-light">Preset Graphs</h3>
          <div className="flex flex-col gap-3">
            {presets.map(({ name, graph }) => (
              <PresetButton
                key={name}
                onTap={() => {
                  graphOperations.setGraph(graph);
                  graphPreset.setShow(false);
                }}
                name={name}
              />
            ))}
            {/* <p className="text-center italic text-slate-500">
              More coming soon!
            </p> */}
          </div>
          <div className="flex flex-col items-center">
            <Divider colour="black" />
          </div>
          <div className="flex flex-col gap-3">
            <motion.button
              className="rounded-md bg-purple-200 p-2 px-4 text-gray-700 shadow-sm transition-[filter] hover:shadow-none hover:brightness-95"
              onTap={() =>
                setGraphPresets((prev) => [
                  ...prev,
                  { name: `preset-${prev.length}`, graph },
                ])
              }
            >
              Save Current Graph
            </motion.button>
            {graphPresets.map(({ name, graph }, i) => (
              <div key={name} className="flex flex-row gap-2">
                <PresetButton
                  onTap={() => {
                    graphOperations.setGraph(graph);
                    graphPreset.setShow(false);
                  }}
                  name={name}
                  className="flex-grow bg-violet-200 text-gray-700"
                />
                <button
                  className="rounded-md bg-red-400 px-3 transition-colors hover:bg-red-500"
                  onClick={() => {
                    setGraphPresets((prev) => {
                      const newPresets = [...prev];
                      newPresets.splice(i, 1);
                      return newPresets;
                    });
                  }}
                >
                  <Trash color="#fff" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PresetButton({
  onTap,
  className,
  name,
}: {
  onTap: () => void;
  className?: string;
  name: string;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        transition: { damping: 2, stiffness: 120 },
      }}
      whileTap={{
        scale: 0.9,
        transition: { damping: 2, stiffness: 120 },
      }}
      onTap={onTap}
      className={cn(
        "rounded-md bg-yellow-200 p-2 px-4 text-gray-700 shadow-sm transition-[filter] hover:shadow-none hover:brightness-95",
        className,
      )}
    >
      {name}
    </motion.button>
  );
}
