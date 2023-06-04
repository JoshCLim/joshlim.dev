import type { NextPage } from "next";
import Head from "next/head";
import { Divider } from "~/components/divider";
import { ArrowTrSquare, Code } from "iconoir-react";
import { ProjectsNavbar } from "~/components/navbars/projectsNavbar";

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  url: string;
  codeUrl: string;
}

const PROJECTS: Project[] = [
  {
    name: "joshlim.dev",
    description:
      "My own portfolio site. Featuring this projects page, a guestbook and a games page (upcoming).",
    imageUrl: "/projects/joshlimdev.png",
    tags: ["Next.js", "Tailwind CSS", "tRPC", "Prisma", "NextAuth.js"],
    url: "https://joshlim.dev",
    codeUrl: "https://github.com/JoshCLim/joshlim.dev",
  },
  {
    name: "IB Expert",
    description:
      "A website I made for a tutoring company my friends and I were thinking of starting. Currently in the process of adding a bookings feature.",
    imageUrl: "/projects/ibexpert.png",
    tags: ["React.js", "Bootstrap 5"],
    url: "https://ibexpert.web.app",
    codeUrl: "https://github.com/JoshCLim/ibtutoring",
  },
  {
    name: "Latin Annotation Tool",
    description:
      "A web app I made to annotate Latin texts that we were studying in IB. Users can highlight words based on their tense etc., link related words together and make comments. All changes are applied in real-time and will be seen by all users of the site.",
    imageUrl: "/projects/annotationtool.png",
    tags: ["HTML", "CSS", "JS", "jQuery", "Firebase"],
    url: "https://joshclim.github.io/annotationTool/index.html",
    codeUrl:
      "https://github.com/JoshCLim/joshclim.github.io/tree/master/annotationTool",
  },
  {
    name: "My Handbook",
    description:
      "A study planner app that I made for my Year 10 personal project. Users can sign in/sign up and add information about their timetable, homework and more.",
    imageUrl: "/projects/myhandbook.png",
    tags: ["HTML", "CSS", "JS", "jQuery", "Firebase"],
    url: "https://joshclim.github.io/myHandbook/login.html",
    codeUrl:
      "https://github.com/JoshCLim/joshclim.github.io/tree/master/myHandbook",
  },
  {
    name: "Minesweeper",
    description: "A clone of the classic game minesweeper.",
    imageUrl: "/projects/minesweeper.png",
    tags: ["HTML", "CSS", "JS"],
    url: "https://joshclim.github.io/minesweeper/index.html",
    codeUrl:
      "https://github.com/JoshCLim/joshclim.github.io/tree/master/minesweeper",
  },
];

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Projects | joshlim.dev</title>
        <meta
          name="description"
          content="A collection of suspicious code I've written over the years."
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 overflow-scroll bg-white p-5 text-black">
        <ProjectsNavbar currPage="/projects" />
        <h2 className="sticky left-0 top-0 z-10 mt-28 text-center text-2xl font-light">
          A collection of <span className="italic text-[#555]">suspicious</span>{" "}
          code I&apos;ve written over the years.
        </h2>
        <Divider colour="black" height="1px" />
        <ProjectsContainer />
      </main>
    </>
  );
};

const ProjectsContainer = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-10 px-10 py-5">
      {PROJECTS.map((p) => {
        return <Project {...p} key={p.name} />;
      })}
    </div>
  );
};

const Project = ({
  name,
  description,
  imageUrl,
  tags,
  url,
  codeUrl,
}: Project) => {
  return (
    <div className="flex min-w-[300px] flex-col overflow-hidden border border-black transition-all hover:scale-105 hover:shadow-xl sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-4/12">
      <div
        className="relative h-[200px]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundOrigin: "content-box",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Image src={imageUrl} fill alt={name} /> */}
      </div>
      <div className="flex flex-grow flex-col justify-between gap-5 p-10">
        <div className="flex w-full flex-row items-center justify-between">
          <h4 className="text-xl">{name}</h4>
          <div className="flex flex-row gap-3">
            <a
              href={codeUrl}
              className="p-1 transition-all hover:bg-black hover:text-white"
            >
              <Code />
            </a>
            <a
              href={url}
              className="p-1 transition-all hover:bg-black hover:text-white"
            >
              <ArrowTrSquare />
            </a>
          </div>
        </div>
        <p className="font-light">{description}</p>
        <div className="flex flex-row gap-3 overflow-scroll">
          {tags.map((t) => (
            <p
              key={t}
              className="inline min-w-min whitespace-nowrap rounded-xl bg-[#eee] px-3 py-1"
            >
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
