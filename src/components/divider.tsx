export const Divider = ({ colour = "white" }: { colour?: string }) => {
  return (
    <div
      className={`my-4 h-1 w-16 rounded-full`}
      style={{
        backgroundColor: colour,
      }}
    ></div>
  );
};
