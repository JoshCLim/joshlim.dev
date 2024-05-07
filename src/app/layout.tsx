import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Home",
  description:
    "Hi, my name is Josh C Lim. I'm a computer science student at UNSW, and an aspiring software engineer based in Sydney, NSW. This is my portfolio site, where I share some projects I have made over the years and anything else I might find nerdy / interesting.",
  icons: [{ rel: "icon", url: "/pingu.jpg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
