import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Visualisers | joshlim.dev",
  description: "Visualisers",
};

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
