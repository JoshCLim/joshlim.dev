import Link from "next/link";

import NavbarVisualisers from "../_components/_navbars/visualisersNavbar";
import { cn } from "../utils";

const sortingAlgs = [
  {
    name: "bubble sort",
    link: "/visualisers/sorting/bubbleSort",
  },
  {
    name: "insertion sort",
    link: "/visualisers/sorting/insertionSort",
  },
  {
    name: "selection sort",
    link: "/visualisers/sorting/selectionSort",
  },
  {
    name: "merge sort",
    link: "/visualisers/sorting/mergeSort",
  },
  {
    name: "quicksort",
    link: "/visualisers/sorting/quicksort",
  },
  {
    name: "bogosort",
    link: "/visualisers/sorting/bogosort",
  },
];

const treeAlgs = [
  {
    name: "binary search tree",
    link: "/visualisers/trees/binarySearchTree",
  },
  {
    name: "avl tree",
    link: "/visualisers/trees/avlTree",
  },
  //   {
  //     name: "red-black tree",
  //     link: "/visualisers/trees/redBlackTree",
  //   },
];

const graphAlgs = [
  {
    name: "depth-first search",
    link: "/visualisers/graphs/dfs",
  },
  {
    name: "breadth-first search",
    link: "/visualisers/graphs/bfs",
  },
  {
    name: "dijkstra's algorithm",
    link: "/visualisers/graphs/dijkstras",
  },
  {
    name: "kruskal's algorithm",
    link: "/visualisers/graphs/kruskals",
  },
  {
    name: "prim's algorithm",
    link: "/visualisers/graphs/prims",
  },
];

export default function Page() {
  return (
    <>
      <NavbarVisualisers currPage="visualisers" />
      <main className="flex min-h-screen flex-col">
        <Section className="bg-[#a4c5e5]">
          <Heading3>Sorting 📊</Heading3>
          <Subsection>
            {sortingAlgs.map((alg) => (
              <VisualiserLink key={alg.link} name={alg.name} link={alg.link} />
            ))}
          </Subsection>
        </Section>
        <Section className="bg-[#a0dfc8]">
          <Heading3>Trees 🌲</Heading3>
          <Subsection>
            {treeAlgs.map((alg) => (
              <VisualiserLink key={alg.link} name={alg.name} link={alg.link} />
            ))}
          </Subsection>
        </Section>
        <Section className="bg-[#ba9fdf]">
          <Heading3>Graphs 🚦</Heading3>
          <Subsection>
            {graphAlgs.map((alg) => (
              <VisualiserLink key={alg.link} name={alg.name} link={alg.link} />
            ))}
          </Subsection>
        </Section>
      </main>
    </>
  );
}

function Section({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-grow flex-col justify-center gap-7 p-10 px-16 text-right",
        className,
      )}
    >
      {children}
    </section>
  );
}

function Subsection({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap justify-end gap-x-10 gap-y-5 ps-52",
        className,
      )}
    >
      {children}
    </div>
  );
}

function VisualiserLink({ name, link }: { name: string; link: string }) {
  return (
    <Link
      href={link}
      className="text-2xl font-thin transition-all hover:underline"
    >
      {name}
    </Link>
  );
}

function Heading3({ children }: { children?: React.ReactNode }) {
  return <h3 className={"text-3xl font-light"}>{children}</h3>;
}
