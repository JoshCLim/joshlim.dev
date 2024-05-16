// graph data structure
import { arrayCreate, clamp } from "~/app/utils";

export type Graph = {
  nV: number;
  edges: number[][];
  positions: { x: number; y: number }[]; // coordinates for positions of vertices
  directed: boolean;
  weighted: boolean;
};

export function graphNew({
  directed = false,
  weighted = false,
}: {
  directed: boolean;
  weighted: boolean;
}): Graph {
  return {
    nV: 0,
    edges: [],
    positions: [],
    directed,
    weighted,
  };
}

export function graphAddVertex(g: Graph, x: number, y: number): Graph {
  const graph = graphCopy(g);
  graph.edges.forEach((row) => row.push(0));
  graph.nV++;
  graph.edges.push(arrayCreate<number>(graph.nV, 0));
  graph.positions.push({ x, y });
  return graph;
}

export function graphSetEdge(
  g: Graph,
  u: number,
  v: number,
  weight: number | boolean,
): Graph {
  const graph = graphCopy(g);

  if (typeof weight === "boolean") {
    weight = weight ? 1 : 0;
  }

  if (!graph.edges[u] || !graph.edges[v]) {
    throw new Error(`Invalid edge added between ${u} and ${v}`);
  }

  graph.edges[u]![v] = weight;

  if (!graph.directed) {
    graph.edges[v]![u] = weight;
  }

  return graph;
}

export function graphRemoveVertex(g: Graph, v: number): Graph {
  const graph = graphCopy(g);

  if (!graph.edges[v]) {
    throw new Error(`Invalid vertex removed: ${v}`);
  }

  for (let u = 0; u < graph.nV; u++) {
    graph.edges[u]?.splice(v, 1);
  }

  graph.edges.splice(v, 1);
  graph.positions.splice(v, 1);

  graph.nV--;

  return graph;
}

export function graphPrint(graph: Graph) {
  console.log(graph.nV);
  console.log(graph.edges);
}

export function graphCopy(graph: Graph): Graph {
  const newGraph = {
    nV: graph.nV,
    edges: graph.edges.map((row) => [...row]),
    positions: graph.positions.map((pos) => ({ ...pos })),
    directed: graph.directed,
    weighted: graph.weighted,
  };
  return newGraph;
}

export function graphSetVertexPosition(
  g: Graph,
  v: number,
  x: number,
  y: number,
): Graph {
  const graph = graphCopy(g);
  graph.positions[v] = { x, y };
  return graph;
}

export function graphRearrange(g: Graph, width: number, height: number): Graph {
  const graph = graphCopy(g);

  graph.positions = graph.positions.map((_, v) => ({
    x: ((Math.floor(v / 2) + 1) * width) / (Math.ceil(graph.nV / 2) + 1),
    y: v % 2 === 0 ? height / 3 : (2 * height) / 3,
  }));

  // TODO: run force-directed graph drawing algorithm

  return graph;
}

export function graphClampPositions(
  g: Graph,
  width: number,
  height: number,
): Graph {
  const graph = graphCopy(g);
  const maxX = Math.max(...graph.positions.map((pos) => pos.x));
  const maxY = Math.max(...graph.positions.map((pos) => pos.y));
  const overshootFactorX = maxX > width ? maxX / width : 1;
  const overshootFactorY = maxY > height ? maxY / height : 1;
  graph.positions = graph.positions.map((pos) => ({
    x: clamp(0, pos.x / overshootFactorX, width),
    y: clamp(0, pos.y / overshootFactorY, height),
  }));
  return graph;
}

export function graphMoveVertical(
  g: Graph,
  dy: number,
  min: number,
  max: number,
): Graph {
  const graph = graphCopy(g);
  graph.positions = graph.positions.map((pos) => ({
    x: pos.x,
    y: clamp(min, pos.y + dy, max),
  }));
  return graph;
}

export function graphMoveHorizontal(
  g: Graph,
  dx: number,
  min: number,
  max: number,
): Graph {
  const graph = graphCopy(g);
  graph.positions = graph.positions.map((pos) => ({
    x: clamp(min, pos.x + dx, max),
    y: pos.y,
  }));
  return graph;
}

export function graphSetWeighted(g: Graph, weighted: boolean): Graph {
  const graph = graphCopy(g);
  graph.weighted = weighted;
  if (!weighted) {
    graph.edges = graph.edges.map((row) =>
      row.map((weight) => (weight === 0 ? 0 : 1)),
    );
  }
  return graph;
}

export function graphSetDirected(g: Graph, directed: boolean): Graph {
  const graph = graphCopy(g);
  graph.directed = directed;
  return graph;
}
