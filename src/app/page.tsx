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
    <main className="w-full">
      {/** note: temporarily hidden */}
      <div className="hidden">
        <HomeNavbar currPage="" fixed />
      </div>

      <section
        aria-labelledby="hero-title"
        className="flex min-h-screen items-center bg-gradient-to-b from-[#0c102d] to-[#15162c] px-6 py-16 sm:px-10"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 text-left">
          <Greeting />
          <Description />
          <Socials />
        </div>
      </section>
      <Projects />
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
          id="hero-title"
          className="bg-clip-text text-6xl font-extrabold tracking-tight text-transparent md:text-7xl"
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
      <div className="flex flex-row justify-start gap-3">
        <IconoirProvider iconProps={{ width: "2em", height: "2em" }}>
          {socials.map(({ href, icon }, index) => (
            <SocialLink key={index} href={href} icon={icon} />
          ))}
        </IconoirProvider>
      </div>
    </FadeUp>
  );
}

function Projects() {
  return (
    <section
      aria-labelledby="projects"
      className="bg-white px-6 py-20 text-slate-900 sm:px-10 sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2 id="projects" className="text-2xl font-light">
          Projects
        </h2>
        <ul className="mt-6 list-none space-y-4 pl-0">
          {[
            { name: "Tandem Tertiary", href: "https://tandemtertiary.com.au" },
            { name: "Graph Visualiser", href: "/visualisers/graphs" },
          ].map(({ name, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-950 hover:decoration-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
              >
                {name}
                <span aria-hidden="true" className="shrink-0">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
