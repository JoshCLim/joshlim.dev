import { type RouterOutputs } from "~/trpc/react";

import TechIcon from "~components/techIcon";

import FadeIn from "../_components/_animations/fadeIn";

import { ArrowUpRightSquare as ArrowTrSquare, Code } from "iconoir-react";

export default function Project({
  name,
  description,
  imageUrl,
  tagsIcons,
  url,
  codeUrl,
  codePublic,
}: RouterOutputs["projects"]["getProjects"][number]) {
  return (
    <FadeIn
      duration={1000}
      className="flex min-w-[300px] flex-col overflow-hidden border border-black transition-all hover:scale-105 hover:shadow-xl sm:w-9/12 md:aspect-[4/3] md:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-4/12"
    >
      <div
        className="relative h-[200px]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundOrigin: "content-box",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="flex flex-grow flex-col justify-between gap-3 border-t border-black p-10 pt-8">
        <div className="flex w-full flex-row items-center justify-between">
          <h4 className="text-xl">{name}</h4>
          <div className="flex flex-row gap-3">
            {!!codePublic && (
              <a
                href={codeUrl}
                target="_blank"
                className="p-1 transition-all hover:bg-black hover:text-white"
              >
                <Code />
              </a>
            )}
            {!!url && (
              <a
                href={url}
                target="_blank"
                className="p-1 transition-all hover:bg-black hover:text-white"
              >
                <ArrowTrSquare />
              </a>
            )}
          </div>
        </div>
        <p className="text-base font-light">{description}</p>
        <div className="no-scrollbar flex flex-row gap-7 overflow-scroll sm:gap-10">
          {tagsIcons.map((t) => (
            <TechIcon key={t} size={20} name={t} />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
