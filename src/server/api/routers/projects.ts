import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export interface Project {
  name: string;
  description: string;
  imageUrl: string;
  tagsIcons: string[];
  url: string;
  codeUrl: string;
  codePublic: boolean;
}

const PROJECTS: Project[] = [
  {
    name: "joshlim.dev",
    description:
      "My own portfolio site. Featuring this projects page, a guestbook and a games page (upcoming).",
    imageUrl: "/projects/joshlimdev.png",
    // tags: ["Next.js", "Tailwind CSS", "tRPC", "Prisma", "NextAuth.js"],
    tagsIcons: ["nextjs", "tailwindcss", "trpc", "prisma", "typescript"],
    url: "https://joshlim.dev",
    codeUrl: "https://github.com/JoshCLim/joshlim.dev",
    codePublic: true,
  },
  {
    name: "IB Expert",
    description:
      "A website I made for a tutoring company my friends and I were thinking of starting. Currently in the process of adding a bookings feature.",
    imageUrl: "/projects/ibexpert.png",
    // tags: ["React.js", "Bootstrap 5"],
    tagsIcons: ["react", "bootstrap", "typescript"],
    url: "https://ibexpert.web.app",
    codeUrl: "https://github.com/JoshCLim/ibtutoring",
    codePublic: false,
  },
  {
    name: "Latin Annotation Tool",
    description:
      "A web app I made to annotate Latin texts that we were studying in IB. Users can highlight words based on their tense etc., link related words together and make comments. All changes are applied in real-time and will be seen by all users of the site.",
    imageUrl: "/projects/annotationtool.png",
    // tags: ["HTML", "CSS", "JS", "jQuery", "Firebase"],
    tagsIcons: ["html5", "css3", "javascript", "jquery", "firebase"],
    url: "https://joshclim.github.io/annotationTool/index.html",
    codeUrl:
      "https://github.com/JoshCLim/joshclim.github.io/tree/master/annotationTool",
    codePublic: true,
  },
  {
    name: "My Handbook",
    description:
      "A study planner app that I made for my Year 10 personal project. Users can sign in/sign up and add information about their timetable, homework and more.",
    imageUrl: "/projects/myhandbook.png",
    // tags: ["HTML", "CSS", "JS", "jQuery", "Firebase"],
    tagsIcons: ["html5", "css3", "javascript", "jquery", "firebase"],
    url: "https://joshclim.github.io/myHandbook/login.html",
    codeUrl:
      "https://github.com/JoshCLim/joshclim.github.io/tree/master/myHandbook",
    codePublic: true,
  },
  {
    name: "Minesweeper",
    description: "A clone of the classic game minesweeper.",
    imageUrl: "/projects/minesweeper.png",
    // tags: ["HTML", "CSS", "JS"],
    tagsIcons: ["html5", "css3", "javascript"],
    url: "https://joshclim.github.io/minesweeper/index.html",
    codeUrl:
      "https://github.com/JoshCLim/joshclim.github.io/tree/master/minesweeper",
    codePublic: true,
  },
];

const processProjectName = (name: string) => {
  return name.replaceAll(" ", "").replaceAll(".", "").toLowerCase();
};
const projectNamesEqual = (name1: string, name2: string) => {
  return processProjectName(name1) === processProjectName(name2);
};

const getProjects = publicProcedure.query(() => {
  return PROJECTS;
});

const getProject = publicProcedure
  .input(z.object({ name: z.string() }))
  .query(({ input }) => {
    return PROJECTS.filter((p) => projectNamesEqual(p.name, input.name))[0];
  });

export const projectsRouter = createTRPCRouter({
  getProjects,
  getProject,
});
