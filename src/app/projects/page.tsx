import { api } from "~/trpc/server";

import ProjectsNavbar from "~components/_navbars/projectsNavbar";
import Divider from "~components/divider";

import Project from "./project";

export default function Projects() {
  return (
    <main className="no-scrollbars relative flex min-h-screen w-full flex-col items-center justify-center gap-5  bg-white pb-5 pe-5 ps-5 text-black">
      <ProjectsNavbar currPage="/projects" />
      <h2 className="sticky left-0 top-0 z-10 mt-28 text-balance text-center text-2xl font-light">
        A collection of code I&apos;ve written over the years.
      </h2>
      <Divider colour="black" height="1px" />
      <ProjectsContainer />
    </main>
  );
}

async function ProjectsContainer() {
  const projects = await api.projects.getProjects();

  return (
    <div className="no-scrollbars flex w-full max-w-screen-2xl flex-wrap justify-center gap-10 px-10 py-5">
      {projects.map((p) => {
        return <Project {...p} key={p.name} />;
      })}
    </div>
  );
}
