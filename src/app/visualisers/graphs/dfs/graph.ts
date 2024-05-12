// graph data structure

export type Graph = {
  nV: number;
  edges: number[][];
  positions: { x: number; y: number }[]; // coordinates for positions of vertices
  directed: boolean;
};

export function graphNew({ directed = false }: { directed: boolean }): Graph {
  return {
    nV: 0,
    edges: [],
    positions: [],
    directed,
  };
}

export function graphAddVertex(g: Graph, x: number, y: number): Graph {
  const graph = graphCopy(g);
  graph.edges.forEach((row) => row.push(0));
  graph.nV++;
  graph.edges.push(Array.from({ length: graph.nV }, () => 0));
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

  // @ts-expect-error - not sure why typescript doesnt realise the graph.edges[u] cannot be null
  graph.edges[u][v] = weight;

  if (!graph.directed) {
    // @ts-expect-error - not sure why typescript doesnt realise the graph.edges[u] cannot be null
    graph.edges[v][u] = weight;
  }

  return graph;
}

export function graphRemoveVertex(g: Graph, v: number): Graph {
  const graph = graphCopy(g);

  if (!graph.edges[v]) {
    throw new Error(`Invalid vertex removed: ${v}`);
  }

  for (let u = 0; u < graph.nV; u++) {
    graph.edges[u] =
      graph.edges[u]?.splice(v, 1) ??
      Array.from({ length: graph.nV - 1 }, () => 0);
  }

  graph.edges = graph.edges.splice(v, 1);

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
  };
  return newGraph;
}

export function graphSetVertexPosition(
  graph: Graph,
  v: number,
  x: number,
  y: number,
): Graph {
  const g = graphCopy(graph);
  g.positions[v] = { x, y };
  return g;
}
