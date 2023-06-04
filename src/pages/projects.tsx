import type { NextPage } from "next";
import Head from "next/head";
import { Divider } from "~/components/divider";
import { ArrowTrSquare, Code } from "iconoir-react";
import { ProjectsNavbar } from "~/components/navbars/projectsNavbar";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";
import { type Project } from "~/server/api/routers/projects";

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
  const { data: projects, isLoading } = api.projects.getProjects.useQuery();

  if (isLoading || !projects) return <LoadingPage />;

  return (
    <div className="flex w-full flex-wrap justify-center gap-10 px-10 py-5">
      {projects.map((p) => {
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
  const router = useRouter();

  const pathname = name.replace(" ", "").replace(".", "").toLowerCase();

  return (
    <div
      className="flex min-w-[300px] cursor-pointer flex-col overflow-hidden border border-black transition-all hover:scale-105 hover:shadow-xl sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-4/12"
      onClick={() => router.push(`/projects/${pathname}`)}
    >
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
