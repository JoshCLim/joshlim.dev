import Image from "next/image";

export const TechIcon = ({ name, size }: { name: string; size: number }) => {
  return (
    <>
      <Image src={`/icons/${name}.svg`} alt="" height={size} width={size} />
    </>
  );
};
