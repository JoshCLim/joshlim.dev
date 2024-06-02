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

export function graphRandomRearrange(
  g: Graph,
  width: number,
  height: number,
): Graph {
  const graph = graphCopy(g);

  // randomise node positions
  graph.positions = graph.positions.map((_) => ({
    x: Math.random() * width,
    y: Math.random() * height,
  }));

  return graphRearrange(graph, width, height);
}

export function graphRearrange(g: Graph, width: number, height: number): Graph {
  const graph = graphCopy(g);

  // run force-directed graph drawing algorithm
  // https://cs.brown.edu/people/rtamassi/gdhandbook/chapters/force-directed.pdf

  // algorithm parameters and utils
  const [c1, c2, c3, c4, M] = [5, width / 2.5, width, 1, 1000] as const;
  const dist = (graph: Graph, v: number, w: number) =>
    Math.sqrt(
      Math.pow(graph.positions[v]!.x - graph.positions[w]!.x, 2) +
        Math.pow(graph.positions[v]!.y - graph.positions[w]!.y, 2),
    );
  const angle = (graph: Graph, v: number, w: number) =>
    Math.atan2(
      graph.positions[w]!.y - graph.positions[v]!.y,
      graph.positions[w]!.x - graph.positions[v]!.x,
    );

  for (let i = 0; i < M; i++) {
    const nextPos = graph.positions.map((curPos, v) => {
      let xForceOnV = 0;
      let yForceOnV = 0;

      for (let w = 0; w < g.nV; w++) {
        if (v == w) continue;

        if (graph.edges[v]![w]! > 0 || graph.edges[w]![v]! > 0) {
          // attractive force to pull connected vertices together by c1 * log(dist(v, w) / c2)
          const force = c1 * Math.log(dist(graph, v, w) / c2);
          const direction = angle(graph, v, w);
          xForceOnV += force * Math.cos(direction);
          yForceOnV += force * Math.sin(direction);
        } else {
          // repulsive force to push unconnected vertices apart by c3 / dist(v, w)^1.5
          const force = c3 / Math.pow(dist(graph, v, w), 1.5);
          const direction = angle(graph, v, w);
          xForceOnV -= force * Math.cos(direction);
          yForceOnV -= force * Math.sin(direction);
        }
      }

      return {
        x: clamp(width * 0.1, curPos.x + c4 * xForceOnV, width * 0.9),
        y: clamp(height * 0.1, curPos.y + c4 * yForceOnV, height * 0.9),
      };
    });

    graph.positions = nextPos;
  }

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

  if (!directed) {
    for (let u = 0; u < graph.nV; u++) {
      for (let v = u + 1; v < graph.nV; v++) {
        if (graph.edges[u]![v] !== graph.edges[v]![u]) {
          graph.edges[u]![v] = graph.edges[v]![u] = Math.max(
            graph.edges[u]![v]!,
            graph.edges[v]![u]!,
          );
        }
      }
    }
  }

  return graph;
}
