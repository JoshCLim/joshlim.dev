import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Games | joshlim.dev",
  description: "Games :)))",
  icons: [{ rel: "icon", url: "/pingu.jpg" }],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
