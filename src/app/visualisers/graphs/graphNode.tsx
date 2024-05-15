"use client";

import { useEffect, useMemo } from "react";

import { clamp, cn } from "~/app/utils";

import { useGraphContext } from "./graphContext";

import { type MotionValue, motion, useSpring } from "framer-motion";

const verticesHighlights = [0, 1, 2, 3] as const;
export type VerticesHighlight = (typeof verticesHighlights)[number];

export default function GraphNode({
  highlight,
  selected,
  setSelected,
  setDragging,
  v,
}: {
  highlight?: VerticesHighlight;
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  setDragging: React.Dispatch<React.SetStateAction<number | null>>;
  v: number;
}) {
  const { graph, graphOperations, canvasRef, setGraphNodePositions } =
    useGraphContext();

  const pos = useMemo(() => graph.positions[v], [graph.positions, v]);

  const x = useSpring(pos?.x ?? 0, {
    stiffness: 800,
    damping: 100,
  }) as MotionValue<number>;
  const y = useSpring(pos?.y ?? 0, {
    stiffness: 800,
    damping: 100,
  }) as MotionValue<number>;

  useEffect(() => {
    setGraphNodePositions((prev) => {
      const newPos = [...prev];
      newPos[v] = { x, y };
      return newPos;
    });
  }, [setGraphNodePositions, v, x, y]);

  useEffect(() => {
    x.set(pos?.x ?? 0);
    y.set(pos?.y ?? 0);
  }, [pos?.x, pos?.y, x, y]);

  if (!pos) return <></>;

  return (
    <motion.div
      drag
      dragConstraints={canvasRef}
      dragMomentum={false}
      dragElastic={0.5}
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 100,
      }}
      whileDrag={{
        scale: 1.2,
        zIndex: 10,
        transition: { damping: 5, stiffness: 200 },
      }}
      onDragStart={() => {
        setDragging(v);
      }}
      onDragEnd={(_, info) => {
        setDragging(null);

        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const posX = clamp(
          20,
          info.point.x - rect.x,
          canvasRef.current.offsetWidth - 20,
        );
        const posY = clamp(
          20,
          info.point.y - rect.y,
          canvasRef.current.offsetHeight - 20,
        );

        graphOperations.setVertexPosition(v, posX, posY);
        setSelected(v);
      }}
      onTap={() => {
        if (selected === v) setSelected(null);
        else setSelected(v);
      }}
      whileTap={{
        scale: 1.15,
        transition: { type: "spring", damping: 5, stiffness: 200 },
      }}
      whileHover={{
        scale: 1.07,
        transition: { type: "spring", damping: 5, stiffness: 200 },
      }}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        transition: { type: "spring", damping: 15, stiffness: 100 },
      }}
      exit={{
        scale: 0,
        transition: { type: "spring", damping: 15, stiffness: 100 },
      }}
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      transition={{
        ease: "easeOut",
        duration: 0.2,
        type: "spring",
        delay: 0,
      }}
      className={cn(
        "absolute left-0 top-0 flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-700 text-lg text-white  shadow-lg outline outline-2 outline-offset-0 outline-transparent transition-[outline-offset,outline-color] hover:outline-gray-950",
        selected === v &&
          "z-10 outline-offset-1 outline-gray-950 hover:outline-gray-950",
        highlight === 1 &&
          "bg-green-500 shadow-md shadow-green-200 hover:outline-green-800",
        highlight === 2 &&
          "bg-red-500 shadow-md shadow-red-200 hover:outline-red-800",
        highlight === 3 &&
          "bg-yellow-500 shadow-md shadow-yellow-200 hover:outline-yellow-800",
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {v}
    </motion.div>
  );
}
