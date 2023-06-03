import type { NextPage } from "next";
import Head from "next/head";
import { Divider } from "~/components/divider";
import { ArrowTrSquare } from "iconoir-react";
import { ProjectsNavbar } from "~/components/navbars/projectsNavbar";

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  url: string;
}

const PROJECTS: Project[] = [
  {
    name: "IB Expert",
    description:
      "Website I made for a tutoring company my friends and I were thinking of starting. Currently in the process of adding a bookings feature.",
    imageUrl: "/projects/ibexpert.png",
    tags: ["React.js", "Bootstrap 5"],
    url: "https://ibexpert.web.app",
  },
  {
    name: "Latin Annotation Tool",
    description:
      "A web app I made to annotate Latin texts that we were studying in IB. Users can highlight words based on their tense etc., link related words together and make comments. All changes are applied in real-time and will be seen by all users of the site.",
    imageUrl: "/projects/annotationtool.png",
    tags: ["HTML", "CSS", "JS", "Firebase"],
    url: "https://joshclim.github.io/annotationTool/index.html",
  },
  {
    name: "My Handbook",
    description:
      "A study planner app that I made for my Year 10 personal project. Users can sign in/sign up and add information about their timetable, homework and more.",
    imageUrl: "/projects/myhandbook.png",
    tags: ["HTML", "CSS", "JS", "Firebase"],
    url: "https://joshclim.github.io/myHandbook/login.html",
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
      <main className="relative flex min-h-screen flex-col flex-wrap items-center justify-center gap-5 overflow-hidden bg-white bg-gradient-to-b p-5 text-black">
        <ProjectsNavbar currPage="/projects" />
        <h2 className="sticky left-0 top-0 z-10 pt-24 text-2xl font-light">
          A collection of suspicious code I&apos;ve written over the years.
        </h2>
        <Divider colour="black" />
        <ProjectsContainer />
      </main>
    </>
  );
};

const ProjectsContainer = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 px-10 py-5">
      {PROJECTS.map((p) => {
        return <Project {...p} key={p.name} />;
      })}
    </div>
  );
};

const Project = ({ name, description, imageUrl, tags, url }: Project) => {
  return (
    <div className="flex w-4/12 flex-col gap-5 border border-black">
      <div
        className="aspect-{4/3} relative h-[200px]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundOrigin: "content-box",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Image src={imageUrl} fill alt={name} /> */}
      </div>
      <div className="flex flex-col gap-5 p-10">
        <div className="flex w-full flex-row items-center justify-between">
          <h4 className="text-xl">{name}</h4>
          <a href={url}>
            <ArrowTrSquare />
          </a>
        </div>
        <p className="font-light">{description}</p>
        <div className="flex flex-row gap-3">
          {tags.map((t) => (
            <p key={t} className="inline rounded-xl bg-[#eee] px-3 py-1">
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
