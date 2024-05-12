import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Depth First Search | joshlim.dev",
  description: "Depth First Search",
  icons: [{ rel: "icon", url: "/pingu.jpg" }],
};

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
