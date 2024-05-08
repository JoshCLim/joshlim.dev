import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "TicTacToe | joshlim.dev",
  description: "Play TicTacToe",
  icons: [{ rel: "icon", url: "/pingu.jpg" }],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
