import type { GetStaticProps, NextPage } from "next";
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
      <KofiDonateButton />
      <main className="flex flex-col items-center p-10 text-black">
        <h1 className="bg-[#cfadff] p-3 text-3xl font-extralight uppercase tracking-wider">
          My Notes
        </h1>
        <div className="flex flex-row gap-3">
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
    <div className="flex flex-col gap-3 p-10">
      <h2 className="font-semibold">{course}</h2>
      <div>
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
      className="flex cursor-pointer flex-col gap-2 rounded-xl bg-white p-7 text-[#333] shadow-lg transition-all hover:scale-105 hover:bg-[#f5f5f5] hover:shadow-xl"
      onClick={() => router.push(`/notes/${id}`)}
    >
      <h3 className="text-l">{name}</h3>
      <p className="text-sm font-light">{description}</p>
    </div>
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
