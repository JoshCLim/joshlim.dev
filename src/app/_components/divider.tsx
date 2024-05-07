export default function Divider({
  colour = "white",
  height = "4px",
}: {
  colour?: string;
  height?: string;
}) {
  return (
    <div
      className={`my-4 w-16 rounded-full`}
      style={{
        backgroundColor: colour,
        height,
      }}
    ></div>
  );
}
