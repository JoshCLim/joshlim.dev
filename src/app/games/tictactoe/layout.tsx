import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "TicTacToe | joshlim.dev",
  description: "Play TicTacToe",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
