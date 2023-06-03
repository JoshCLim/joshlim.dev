import {
  Facebook,
  GitHub,
  IconoirProvider,
  Instagram,
  LinkedIn,
} from "iconoir-react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { AOS } from "~/components/aos";
import { HomeNavbar } from "~/components/navbars/homeNavbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>joshlim.dev</title>
        <meta
          name="description"
          content="Hi, my name is Josh Lim. I'm a computer science student at UNSW."
        />
        <link rel="icon" href="/pingu.jpeg" />
      </Head>
      <main className="fixed flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0c102d] to-[#15162c]">
        <HomeNavbar currPage="" fixed />
        <div className="flex flex-col items-center justify-center gap-10 px-10 sm:flex-row sm:gap-20">
          <HeroImage />
          <div className="flex flex-col gap-5 text-center sm:text-right">
            <div className="flex flex-col gap-2">
              <Greeting />
            </div>
            <Description />
            <Socials />
          </div>
        </div>
      </main>
    </>
  );
};

const HeroImage = () => {
  return (
    <>
      <AOS aos="fade-in" delay={100} duration={1000}>
        <div className="relative h-[200px] w-[200px] md:h-[275px] md:w-[275px]">
          <Image
            src="/pingu.jpeg"
            fill
            priority
            alt="profile-pic"
            className="rounded-full border-8 border-white transition-all hover:scale-105"
          />
        </div>
      </AOS>
    </>
  );
};

const Greeting = () => {
  return (
    <>
      <AOS aos="fade-down" delay={150} duration={1000}>
        <h1 className="text-2xl font-light text-white">
          Hey there! My name is
        </h1>
      </AOS>
      <AOS aos="fade-down" delay={50} duration={1000}>
        <h1
          className="bg-clip-text text-6xl font-extrabold text-transparent md:text-7xl lg:text-8xl"
          style={{
            backgroundImage:
              "linear-gradient(to left, #BDCBF0, #C5F3FA, #BFE3D1, #CDFAC5, #EBF0B4)",
          }}
        >
          Josh Lim
        </h1>
      </AOS>
    </>
  );
};

const Description = () => {
  return (
    <AOS aos="fade-up" delay={100} duration={1000}>
      <p className="m-0 text-lg tracking-wide">
        I&apos;m a <span className="text-[#aaaaee]">Computer Science</span>{" "}
        student @ UNSW
      </p>
    </AOS>
  );
};

const Socials = () => {
  return (
    <AOS aos="fade-up" delay={200} duration={1000}>
      <div className="flex flex-row justify-center gap-3 sm:justify-end">
        <IconoirProvider iconProps={{ width: "2em", height: "2em" }}>
          <SocialLink href="https://github.com/JoshCLim" icon={<GitHub />} />
          <SocialLink
            href="https://www.linkedin.com/in/joshclim/"
            icon={<LinkedIn />}
          />
          <SocialLink
            href="https://www.instagram.com/joshwa_limmy/"
            icon={<Instagram />}
          />
          <SocialLink
            href="https://www.facebook.com/profile.php?id=100023602025978"
            icon={<Facebook />}
          />
        </IconoirProvider>
      </div>
    </AOS>
  );
};

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactElement;
}) => {
  return (
    <a
      href={href}
      className="rounded-xl p-1 transition-all hover:scale-110 hover:bg-white hover:text-black"
    >
      {icon}
    </a>
  );
};

export default Home;
