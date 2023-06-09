import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Divider } from "~/components/divider";
import { ArrowTrSquare, Code } from "iconoir-react";
import { ProjectsNavbar } from "~/components/navbars/projectsNavbar";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";
import { type Project } from "~/server/api/routers/projects";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { TechIcon } from "~/components/techIcon";
// import { useRouter } from "next/navigation";

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Projects | joshlim.dev</title>
        <meta
          name="description"
          content="A collection of code I've written over the years."
        />
        <link rel="icon" href="/project.png" />
      </Head>
      <main className="no-scrollbars relative flex min-h-screen w-full flex-col items-center justify-center gap-5  bg-white pb-5 pe-5 ps-5 text-black">
        <ProjectsNavbar currPage="/projects" />
        <h2 className="sticky left-0 top-0 z-10 mt-28 text-center text-2xl font-light">
          A collection of code I&apos;ve written over the years.
          {/* <span className="italic text-[#555]">suspicious</span>{" "} */}
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
    <div className="no-scrollbars flex w-full flex-wrap justify-center gap-10 px-10 py-5">
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
  tagsIcons,
  url,
  codeUrl,
  codePublic,
}: Project) => {
  // const router = useRouter();

  // const pathname = name.replace(" ", "").replace(".", "").toLowerCase();

  return (
    <div
      className="flex min-w-[300px] flex-col overflow-hidden border border-black transition-all hover:scale-105 hover:shadow-xl sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-4/12"
      // onClick={() => router.push(`/projects/${pathname}`)}
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
      <div className="flex flex-grow flex-col justify-between gap-3 p-10">
        <div className="flex w-full flex-row items-center justify-between">
          <h4 className="text-xl">{name}</h4>
          <div className="flex flex-row gap-3">
            {!!codePublic && (
              <a
                onClick={(e) => e.stopPropagation()}
                href={codeUrl}
                target="_blank"
                className="p-1 transition-all hover:bg-black hover:text-white"
              >
                <Code />
              </a>
            )}
            <a
              onClick={(e) => e.stopPropagation()}
              href={url}
              target="_blank"
              className="p-1 transition-all hover:bg-black hover:text-white"
            >
              <ArrowTrSquare />
            </a>
          </div>
        </div>
        <p className="font-light">{description}</p>
        <div className="no-scrollbar flex flex-row gap-7 overflow-scroll sm:gap-10">
          {/* {tags.map((t) => (
            <p
              key={t}
              className="inline min-w-min whitespace-nowrap rounded-xl bg-[#eee] px-3 py-1"
            >
              {t}
            </p>
          ))} */}
          {tagsIcons.map((t) => (
            <TechIcon key={t} size={20} name={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = generateSSGHelper();

  await ssg.projects.getProjects.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Projects;
