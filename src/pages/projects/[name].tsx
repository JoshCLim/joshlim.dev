import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const ProjectPage: NextPage<{ name: string }> = ({ name }) => {
  const { data } = api.projects.getProject.useQuery({
    name,
  });

  if (!data) return <div>404</div>;

  // TODO: finish
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <p className="text-3xl text-black">project pages coming soon!</p>
      <Link href="/projects" className="rounded-xl bg-[#ccc] p-3 text-black">
        GO BACK
      </Link>
    </div>
  );

  // return (
  //   <main className="flex h-screen w-full flex-col items-center gap-5 pt-36 text-black">
  //     <ProjectsNavbar currPage={`/projects/${data.name}`} />
  //     <h1 className="text-2xl font-light">{data.name}</h1>
  //     <embed type="text/html" src={data.url} className="h-4/6 w-6/12"></embed>
  //   </main>
  // );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const name = context.params?.name;

  if (typeof name !== "string") throw new Error("no slug");

  await ssg.projects.getProject.prefetch({ name });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      name,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProjectPage;
