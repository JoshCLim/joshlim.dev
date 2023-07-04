import { Home } from "iconoir-react";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api, type RouterOutputs } from "~/utils/api";

const donateButton = `<script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
<script>
  kofiWidgetOverlay.draw('joshclim', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': '#323842',
    'floating-chat.donateButton.text-color': '#fff'
  });
</script>`;

const KofiDonateButton = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: donateButton,
      }}
    ></div>
  );
};

const Notes: NextPage = () => {
  const { data: notesBrief, isLoading: notesLoading } =
    api.notes.getBriefDetails.useQuery();
  const { data: courses, isLoading: coursesLoading } =
    api.notes.getCourses.useQuery();

  if (notesLoading || coursesLoading) return <LoadingPage />;
  else if (!notesBrief || !courses) return <div>error</div>;

  return (
    <>
      <ReturnHomeButton />
      <KofiDonateButton />
      <main className="flex h-[100vh] w-screen flex-col items-start justify-start overflow-x-hidden overscroll-none bg-[#fafafa] text-white xl:flex-row">
        <div className="flex w-full flex-col items-start justify-start gap-4 bg-[#a4ceaf] p-10 xl:h-screen xl:min-w-[40%] xl:max-w-[50%] xl:justify-center xl:gap-10 xl:border-r xl:border-[#ddd] xl:py-24 xl:pe-24 xl:ps-20">
          <h1 className="text-4xl tracking-tight xl:text-7xl xl:font-extrabold xl:uppercase xl:leading-tight 2xl:text-8xl">
            Course Notes
          </h1>
          <p className="text-2xl font-extralight leading-tight xl:text-4xl 2xl:text-5xl">
            A collection of notes for UNSW courses I&apos;ve taken.
          </p>
        </div>
        <div className="flex flex-col bg-[#fafafa] xl:h-screen">
          {courses.map((c) => (
            <CourseBox key={c} course={c} allNotes={notesBrief} />
          ))}
        </div>
      </main>
    </>
  );
};

const CourseBox = ({
  course,
  allNotes,
}: {
  course: string;
  allNotes: RouterOutputs["notes"]["getBriefDetails"];
}) => {
  const notes = allNotes.filter((n) => n.course === course);

  return (
    <div className="flex w-screen flex-col gap-3 border-0 border-b border-[#ddd] bg-[#fafafa] xl:py-0">
      <h2 className="ms-8 mt-7 text-lg font-semibold text-[#000] xl:ms-12 xl:mt-10 xl:text-2xl">
        {course}
      </h2>
      <div className="no-scrollbar flex flex-row gap-5 overflow-x-auto px-8 pb-8 xl:px-12 xl:pb-12">
        {notes.map((n) => (
          <NoteBox {...n} key={n.id} />
        ))}
      </div>
    </div>
  );
};

const NoteBox = ({
  id,
  name,
  description,
}: RouterOutputs["notes"]["getBriefDetails"][number]) => {
  const router = useRouter();

  return (
    <div
      className="flex max-h-32 max-w-[180px] flex-shrink-0 flex-grow cursor-pointer flex-col gap-2 rounded-xl bg-white p-7 text-[#333] shadow-xl transition-all hover:scale-105 hover:bg-[#f5f5f5] hover:shadow-xl md:max-h-none md:max-w-[280px]"
      onClick={() => router.push(`/notes/${id}`)}
    >
      <h3 className="font-light md:font-normal">{name}</h3>
      <p className="hidden text-sm font-light md:block">{description}</p>
    </div>
  );
};

const ReturnHomeButton = () => {
  return (
    <Link
      href="/"
      className="fixed bottom-8 right-8 z-50 rounded-full bg-blue-600 p-7 shadow-xl transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-2xl active:scale-95 active:bg-blue-800"
    >
      <Home />
    </Link>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = generateSSGHelper();

  await Promise.all([
    ssg.notes.getBriefDetails.prefetch(),
    ssg.notes.getCourses.prefetch(),
  ]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Notes;
