import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Games | joshlim.dev",
  description: "Games :)))",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
