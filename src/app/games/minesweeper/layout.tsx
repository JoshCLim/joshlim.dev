import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Minesweeper | joshlim.dev",
  description: "Play Minesweeper",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
