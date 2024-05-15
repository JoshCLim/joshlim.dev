import { type Metadata } from "next";

import dynamic from "next/dynamic";

import GraphContextProvider from "./graphContext";

export const metadata: Metadata = {
  title: "Depth First Search | joshlim.dev",
  description: "Depth First Search",
  icons: [{ rel: "icon", url: "/pingu.jpg" }],
};

function Layout({ children }: { children?: React.ReactNode }) {
  return <GraphContextProvider>{children}</GraphContextProvider>;
}

// disable ssr for the whole page?
export default dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});
