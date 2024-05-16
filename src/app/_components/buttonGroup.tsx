import { cn } from "../utils";

export default function ButtonGroup({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center overflow-hidden rounded-2xl text-white shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
