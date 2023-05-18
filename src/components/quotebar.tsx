export const Quotebar = ({
  quote,
  colour,
}: {
  quote: string;
  colour?: string;
}) => {
  return (
    <aside
      className={`bottom-0 left-0 w-full bg-transparent p-5 text-center text-[${
        colour ?? "#ccc"
      }]`}
    >
      {quote}
    </aside>
  );
};
