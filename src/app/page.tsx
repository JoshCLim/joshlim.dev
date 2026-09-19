import type { Metadata } from "next";

import FadeDown from "~components/_animations/fadeDown";
import FadeUp from "~components/_animations/fadeUp";
import HomeNavbar from "~components/_navbars/homeNavbar";

import { socials } from "./data";

import { IconoirProvider } from "iconoir-react";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Hi, my name is Josh C Lim. I'm a computer science student at UNSW, and an aspiring software engineer based in Sydney, NSW. This is my portfolio site, where I share some projects I have made over the years and anything else I might find nerdy / interesting.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#0c102d] to-[#15162c] px-6 py-16 sm:px-10">
      {/** note: temporarily hidden */}
      <div className="hidden">
        <HomeNavbar currPage="" fixed />
      </div>

      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-5 text-left sm:text-right">
          <Greeting />
          <Description />
          <Socials />
          <CurrentProjects />
        </div>
      </div>
    </main>
  );
}

const Greeting = () => {
  return (
    <div className="flex flex-col gap-2">
      <FadeDown delay={150} duration={1000}>
        <p className="text-2xl font-light text-white">Hey there! My name is</p>
      </FadeDown>
      <FadeDown delay={50} duration={1000}>
        <h1
          className="bg-clip-text text-6xl font-extrabold text-transparent md:text-7xl lg:text-8xl"
          style={{
            backgroundImage:
              "linear-gradient(to left, #BDCBF0, #C5F3FA, #BFE3D1, #CDFAC5, #EBF0B4)",
          }}
        >
          Josh Lim
        </h1>
      </FadeDown>
    </div>
  );
};

function Description() {
  return (
    <FadeUp delay={100} duration={1000}>
      <p className="m-0 text-lg tracking-wide">
        I&apos;m a <span className="text-[#aaaaee]">Computer Science</span>{" "}
        student @ UNSW
      </p>
    </FadeUp>
  );
}

function Socials() {
  return (
    <FadeUp delay={200} duration={1000}>
      <div className="flex flex-row justify-start gap-3 sm:justify-end">
        <IconoirProvider iconProps={{ width: "2em", height: "2em" }}>
          {socials.map(({ href, icon }, index) => (
            <SocialLink key={index} href={href} icon={icon} />
          ))}
        </IconoirProvider>
      </div>
    </FadeUp>
  );
}

function CurrentProjects() {
  return (
    <FadeUp delay={300} duration={1000}>
      <section aria-labelledby="current-projects" className="mt-5">
        <h2 id="current-projects" className="text-2xl font-light">
          Current Projects
        </h2>
        <ul className="mt-4 flex list-none flex-col items-start gap-3 pl-0 sm:items-end">
          {[
            { name: "Tandem Tertiary", href: "https://tandemtertiary.com.au" },
            { name: "Graph Visualiser", href: "/visualisers/graphs" },
          ].map(({ name, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm text-lg text-[#aaaaee] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {name}
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </FadeUp>
  );
}

function SocialLink({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactElement;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="rounded-xl p-1 transition-all hover:scale-110 hover:bg-white hover:text-black"
    >
      {icon}
    </a>
  );
}
