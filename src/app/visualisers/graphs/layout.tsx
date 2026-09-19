import { type Metadata } from "next";

import GraphClient from "./graphClient";

export const metadata: Metadata = {
  title: "Graph Algorithm Visualisers | joshlim.dev",
  description: "Graph Algorithm Visualisers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GraphClient>{children}</GraphClient>;
}
