import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type RouterOutputs, api } from "~/utils/api";
// import { LeftRoundArrow, RightRoundArrow } from "iconoir-react";

// import LeftRoundArrow from "iconoir-react/dist/LeftRoundArrow";
// import { RightRoundArrow } from "iconoir-react";
import HorizontalScrollTracker from "~/components/horizontalScrollTracker";

import { PortableText } from "@portabletext/react";
import Refractor from "react-refractor";
import cpp from "refractor/lang/cpp";
import { MathJax } from "better-react-mathjax";
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
    latex: ({
      value,
    }: {
      value: RouterOutputs["notes"]["getNotes"][number]["content"][number];
    }) => {
      if (value._type === "latex")
        return <MathJax inline>{`\\(${value.body}\\)`}</MathJax>;
      return <span>Error loading math.</span>;
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
  // console.log(note);

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
      className="flex aspect-square items-center justify-center gap-3 rounded-md bg-[#ff5959] px-3 py-3 text-white shadow-lg transition-all hover:bg-[#ff3a3a]"
      onClick={() => router.push("/notes")}
    >
      {/* <LeftRoundArrow /> */}
      {/* <span className="hidden sm:inline">Back to all notes</span> */}
      <svg
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 7L10 12L15 17"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const NextNoteButton = ({ nextId }: { nextId: string }) => {
  const router = useRouter();

  // console.log(nextId);

  return (
    <button
      className="flex gap-3 rounded-md border-[1px] border-[#596aff] bg-[#232534] px-3 py-3 text-[#596aff] shadow-lg transition-all hover:bg-[#2d357d]"
      onClick={() => router.push(`/notes/${nextId}`)}
    >
      {/* <span className="hidden sm:inline">Next note</span> */}
      <RightArrowSvg />
      {/* <RightRoundArrow /> */}
    </button>
  );
};

const RightArrowSvg = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM14.2672 17.5431L19.5172 12.5431L18.4828 11.4569L13.2328 16.4569L14.2672 17.5431ZM19.5172 11.4569L14.2672 6.4569L13.2328 7.5431L18.4828 12.5431L19.5172 11.4569ZM19 11.25L5 11.25V12.75L19 12.75V11.25Z"
        fill="#596aff"
      />
    </svg>
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
