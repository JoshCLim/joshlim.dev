import Link from "next/link";

import NavbarVisualisers from "../_components/_navbars/visualisersNavbar";
import { cn } from "../utils";

type Alg = {
  name: string;
  link: string;
  hide: boolean;
};

const sortingAlgs = [
  {
    name: "bubble sort",
    link: "/visualisers/sorting/bubbleSort",
    hide: true,
  },
  {
    name: "insertion sort",
    link: "/visualisers/sorting/insertionSort",
    hide: true,
  },
  {
    name: "selection sort",
    link: "/visualisers/sorting/selectionSort",
    hide: true,
  },
  {
    name: "merge sort",
    link: "/visualisers/sorting/mergeSort",
    hide: true,
  },
  {
    name: "quicksort",
    link: "/visualisers/sorting/quicksort",
    hide: true,
  },
  {
    name: "bogosort",
    link: "/visualisers/sorting/bogosort",
    hide: true,
  },
] as const satisfies Alg[];

const treeAlgs = [
  {
    name: "binary search tree",
    link: "/visualisers/trees/binarySearchTree",
    hide: true,
  },
  {
    name: "avl tree",
    link: "/visualisers/trees/avlTree",
    hide: true,
  },
  //   {
  //     name: "red-black tree",
  //     link: "/visualisers/trees/redBlackTree",
  //   },
] as const satisfies Alg[];

const graphAlgs = [
  {
    name: "depth-first search",
    link: "/visualisers/graphs",
    hide: false,
  },
  {
    name: "breadth-first search",
    link: "/visualisers/graphs",
    hide: false,
  },
  {
    name: "dijkstra's algorithm",
    link: "/visualisers/graphs",
    hide: false,
  },
  {
    name: "kruskal's algorithm",
    link: "/visualisers/graphs",
    hide: false,
  },
  {
    name: "prim's algorithm",
    link: "/visualisers/graphs",
    hide: false,
  },
] as const satisfies Alg[];

export default function Page() {
  return (
    <>
      <NavbarVisualisers currPage="visualisers" />
      <main className="flex min-h-screen flex-col">
        <Section className="bg-[#8fb6dc]">
          <Heading3>Sorting 📊</Heading3>
          <Subsection>
            {sortingAlgs.map((alg) => (
              <VisualiserLink
                key={alg.link}
                name={alg.name}
                link={alg.link}
                hide={alg.hide}
              />
            ))}
          </Subsection>
        </Section>
        <Section className="bg-[#82d3b5]">
          <Heading3>Trees 🌲</Heading3>
          <Subsection>
            {treeAlgs.map((alg) => (
              <VisualiserLink
                key={alg.link}
                name={alg.name}
                link={alg.link}
                hide={alg.hide}
              />
            ))}
          </Subsection>
        </Section>
        <Section className="bg-[#bb99ea]">
          <Heading3>Graphs 🚦</Heading3>
          <Subsection>
            {graphAlgs.map((alg) => (
              <VisualiserLink
                key={alg.link}
                name={alg.name}
                link={alg.link}
                hide={alg.hide}
              />
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

function VisualiserLink({
  name,
  link,
  hide,
}: {
  name: string;
  link: string;
  hide: boolean;
}) {
  return (
    <Link
      href={hide ? "#" : link}
      className={cn(
        "text-2xl font-[200] transition-all hover:underline",
        hide && "blur-sm",
      )}
    >
      {name}
    </Link>
  );
}

function Heading3({ children }: { children?: React.ReactNode }) {
  return <h3 className={"text-3xl font-light"}>{children}</h3>;
}
