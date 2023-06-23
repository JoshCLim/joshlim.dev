import { PortableText } from "@portabletext/react";
import { LeftRoundArrow, RightRoundArrow } from "iconoir-react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type RouterOutputs, api } from "~/utils/api";

import Refractor from "react-refractor";
import cpp from "refractor/lang/cpp";
import HorizontalScrollTracker from "~/components/horizontalScrollTracker";
Refractor.registerLanguage(cpp);

const NotePortableTextComponents = {
  types: {
    cpp: ({
      value,
    }: {
      value: RouterOutputs["notes"]["getNotes"][number]["content"][number];
    }) => {
      if (value._type === "cpp")
        return <Refractor language="cpp" value={value.code} />;
      return <div>Error loading code.</div>;
    },
  },
  marks: {
    bubble: ({ children }: { children: React.ReactNode }) => (
      <span className="bubble">{children}</span>
    ),
  },
  block: {
    title: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="title">{children}</h1>
    ),
    indent: ({ children }: { children?: React.ReactNode }) => (
      <p className="ps-4">{children}</p>
    ),
  },
};

const NotePage: NextPage<{ id: string }> = ({ id }) => {
  const { data: note, isLoading } = api.notes.getNote.useQuery({ id });
  console.log(note);

  if (isLoading) return <LoadingPage />;
  else if (!note) return <div>an error occured</div>;

  return (
    <>
      <Head>
        <title>{note.name}</title>
        <meta name="description" content={note.description} />
      </Head>
      <main className="w-full bg-[#1f1f1f]">
        {/* <BackToNotesButton /> */}
        {/* {!!note.next && <NextNoteButton nextId={note.next._ref} />} */}
        <NotesNavBar nextId={note.next?._ref} />
        <div className="note mx-auto mt-16 max-w-[1000px] p-10 pb-16">
          <PortableText
            value={note.content}
            components={NotePortableTextComponents}
          />
        </div>
      </main>
    </>
  );
};

const NotesNavBar = ({ nextId }: { nextId: string | undefined }) => {
  return (
    <>
      <HorizontalScrollTracker />
      <nav className="fixed left-0 top-0 flex w-full justify-between gap-5 border-b border-[#333] bg-[#1f1f1f] p-5">
        <BackToNotesButton />
        <SearchBar />
        <div className="flex flex-row justify-between">
          {!!nextId && <NextNoteButton nextId={nextId} />}
        </div>
      </nav>
    </>
  );
};

const SearchBar = () => {
  return (
    <input
      type="text"
      className="max-w-[400px] flex-grow-[1] rounded-md border-[1px] bg-transparent px-5 py-3 outline-none transition-all focus:max-w-[700px]"
      placeholder="🔎  Search for some info..."
    />
  );
};

const BackToNotesButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex gap-3 rounded-md bg-[#ff5959] px-5 py-3 text-white shadow-lg transition-all hover:bg-[#ff3a3a]"
      onClick={() => router.push("/notes")}
    >
      <LeftRoundArrow />
      <span className="hidden sm:inline">Back to all notes</span>
    </button>
  );
};

const NextNoteButton = ({ nextId }: { nextId: string }) => {
  const router = useRouter();

  console.log(nextId);

  return (
    <button
      className="flex gap-3 rounded-md border-[1px] border-[#596aff] bg-[#232534] px-5 py-3 text-[#596aff] shadow-lg transition-all hover:bg-[#2d357d]"
      onClick={() => router.push(`/notes/${nextId}`)}
    >
      <span className="hidden sm:inline">Next note</span>
      <RightRoundArrow />
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
