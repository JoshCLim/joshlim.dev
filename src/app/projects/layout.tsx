import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | joshlim.dev",
  description:
    "List of projects I've built or contributed to, both personal use or for university societies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
