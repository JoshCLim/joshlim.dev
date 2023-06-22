import { LeftRoundArrow } from "iconoir-react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const NotePage: NextPage<{ id: string }> = ({ id }) => {
  const { data: note, isLoading } = api.notes.getNote.useQuery({ id });

  if (isLoading) return <LoadingPage />;
  else if (!note) return <div>an error occured</div>;

  return (
    <>
      <Head>
        <title>{note.name}</title>
        <meta name="description" content={note.description} />
      </Head>
      <main>
        <BackToNotesButton />
        <div className="px-10">
          <div
            dangerouslySetInnerHTML={{
              __html: note.html,
            }}
          ></div>
        </div>
      </main>
    </>
  );
};

const BackToNotesButton = () => {
  const router = useRouter();

  return (
    <button
      className="fixed left-0 top-0 ms-5 mt-5 flex gap-3 rounded-md bg-[#ff5959] px-5 py-3 text-white shadow-lg transition-all hover:bg-[#ff3a3a]"
      onClick={() => router.push("/notes")}
    >
      <LeftRoundArrow />
      <span className="hidden sm:inline">Back to all notes</span>
    </button>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no slug");

  await ssg.notes.getNote.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default NotePage;
