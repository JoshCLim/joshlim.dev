"use client";

import useClickAway from "~/app/_hooks/useClickAway";

import { useDfsContext } from "./dfsContext";
import { type Graph } from "./graph";

import { motion } from "framer-motion";
import { CurveArray, FastArrowRight } from "iconoir-react";

const presets: { name: string; graph: Graph }[] = [
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
];

export default function PresetGraphChooser() {
  const { graphOperations, graphPreset } = useDfsContext();

  const presetChooserRef = useClickAway<HTMLDivElement>(() =>
    graphPreset.setShow(false),
  );

  return (
    <motion.div
      ref={presetChooserRef}
      key="adj-matrix"
      className="fixed right-0 top-16 z-infinity aspect-square text-slate-800"
      initial={{ x: "130%" }}
      animate={{ x: graphPreset.show ? "40px" : "100%" }}
      exit={{ x: "130%" }}
      transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
    >
      <button
        className="absolute left-0 top-12 z-infinity translate-x-[-100%] rounded-l-2xl border-b border-l border-t border-black bg-gray-50 px-2 py-5 shadow-2xl transition-colors hover:bg-gray-200"
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
          <div className="space-y-3">
            {presets.map(({ name, graph }) => (
              <motion.button
                key={name}
                whileHover={{
                  scale: 1.05,
                  transition: { damping: 2, stiffness: 120 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { damping: 2, stiffness: 120 },
                }}
                onTap={() => {
                  graphOperations.setGraph(graph);
                  graphPreset.setShow(false);
                }}
                className="rounded-md bg-yellow-200 p-2 px-4 text-gray-700 shadow-sm transition-[filter] hover:shadow-none hover:brightness-95"
              >
                {name}
              </motion.button>
            ))}
            <p className="text-center italic text-slate-500">
              More coming soon!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
