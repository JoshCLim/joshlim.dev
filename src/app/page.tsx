import type { Metadata } from "next";

import Image from "next/image";

import FadeDown from "~components/_animations/fadeDown";
import FadeIn from "~components/_animations/fadeIn";
import FadeUp from "~components/_animations/fadeUp";
import HomeNavbar from "~components/_navbars/homeNavbar";

import BounceOnTap from "./_components/_animations/bounceOnTap";
import { socials } from "./data";

import { IconoirProvider } from "iconoir-react";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Hi, my name is Josh C Lim. I'm a computer science student at UNSW, and an aspiring software engineer based in Sydney, NSW. This is my portfolio site, where I share some projects I have made over the years and anything else I might find nerdy / interesting.",
};

export default function Home() {
  return (
    <main className="fixed flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0c102d] to-[#15162c]">
      <HomeNavbar currPage="" fixed />
      <div className="flex flex-col items-center justify-center gap-7 px-10 sm:flex-row sm:gap-20">
        <HeroImage />
        <div className="flex flex-col gap-5 text-center sm:text-right">
          <Greeting />
          <Description />
          <Socials />
        </div>
      </div>
    </main>
  );
}

const HeroImage = () => {
  return (
    <BounceOnTap>
      <FadeIn delay={100} duration={1500}>
        <div className="relative h-[200px] w-[200px] md:h-[275px] md:w-[275px]">
          <Image
            draggable={false}
            src="/pingu.jpg"
            sizes="200px"
            fill
            priority
            alt="profile-pic"
            className="rounded-full border-8 border-white transition-all"
          />
        </div>
      </FadeIn>
    </BounceOnTap>
  );
};

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
      <div className="flex flex-row justify-center gap-3 sm:justify-end">
        <IconoirProvider iconProps={{ width: "2em", height: "2em" }}>
          {socials.map(({ href, icon }, index) => (
            <SocialLink key={index} href={href} icon={icon} />
          ))}
        </IconoirProvider>
      </div>
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
