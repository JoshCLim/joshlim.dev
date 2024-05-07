import { createTRPCRouter, publicProcedure } from "../trpc";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

type Tags =
  | "html5"
  | "css3"
  | "javascript"
  | "jquery"
  | "firebase"
  | "react"
  | "bootstrap"
  | "nextjs"
  | "tailwindcss"
  | "trpc"
  | "prisma"
  | "typescript"
  | "shadcn"
  | "expressjs"
  | "drizzle"
  | "nextui";

type Project = {
  name: string;
  description: string;
  imageUrl: string;
  tagsIcons: Tags[];
  url?: string;
  codeUrl?: string;
  codePublic: boolean;
};

const allProjects: Project[] = [
  {
    name: "joshlim.dev",
    description:
      "My own portfolio site. Featuring this projects page, a guestbook and a games page (upcoming).",
    imageUrl: "/projects/joshlimdev.png",
    // tags: ["Next.js", "Tailwind CSS", "tRPC", "Prisma", "NextAuth.js"],
    tagsIcons: ["nextjs", "tailwindcss", "trpc", "drizzle", "typescript"],
    url: "https://joshlim.dev",
    codeUrl: "https://github.com/JoshCLim/joshlim.dev",
    codePublic: true,
  },
  {
    name: "Emailr",
    description:
      "A simple mail merge tool I created for the UNSW Data Science Society, sending out many custom emails based on an uploaded CSV file.",
    imageUrl: "/projects/emailr.png",
    tagsIcons: ["react", "tailwindcss", "shadcn", "expressjs", "typescript"],
    url: "https://emails.unswdata.com/",
    codeUrl: "https://github.com/UNSW-Data-Soc/emailr",
    codePublic: true,
  },
  {
    name: "Elixir",
    description:
      "The official website for the UNSW Data Science Society, allowing internal members to dynamically update content upon logging in.",
    imageUrl: "/projects/datasoc.png",
    tagsIcons: [
      "nextjs",
      "tailwindcss",
      "trpc",
      "drizzle",
      "nextui",
      "typescript",
    ],
    url: "https://unswdata.com/",
    codeUrl: "https://github.com/UNSW-Data-Soc/elixir",
    codePublic: true,
  },
  {
    name: "Chirp",
    description:
      "A basic Twitter clone that I created while learning the T3 stack.",
    imageUrl: "/projects/chirp.png",
    tagsIcons: ["nextjs", "tailwindcss", "trpc", "prisma", "typescript"],
    // url: "https://chirp-iota-six.vercel.app/",
    codeUrl: "https://github.com/JoshCLim/chirp",
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
      "A web app I made to annotate Latin texts that we studied in IB. Users can highlight words based on their tense etc., link related words together and add comments. All changes are applied in real-time.",
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
      "A study planner app that I made for my Year 10 personal project. Users can login and add information about their timetable, homework and more.",
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
  return allProjects;
});

const getProject = publicProcedure
  .input(z.object({ name: z.string() }))
  .query(({ input }) => {
    const matchingProjects = allProjects.filter((p) =>
      projectNamesEqual(p.name, input.name),
    );
    if (matchingProjects.length === 0) {
      throw new TRPCError({
        message: "Project not found",
        code: "BAD_REQUEST",
      });
    }
    return matchingProjects[0];
  });

export const projectsRouter = createTRPCRouter({
  getProjects,
  getProject,
});
