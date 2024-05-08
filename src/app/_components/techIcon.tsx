import Image from "next/image";

import { type RouterOutputs } from "~/trpc/react";

type TagIconName =
  RouterOutputs["projects"]["getProjects"][number]["tagsIcons"][number];

const nameToPath = (name: TagIconName) => {
  if (name === "drizzle") return `/icons/drizzle.png`;
  if (name === "nextui") return `/icons/nextui.png`;
  return `/icons/${name}.svg`;
};

export default function TechIcon({
  name,
  size,
}: {
  name: TagIconName;
  size: number;
}) {
  return (
    <Image
      src={nameToPath(name)}
      alt={name}
      height={size}
      width={size}
      title={name}
      style={{ width: "auto", height: size }}
    />
  );
}
