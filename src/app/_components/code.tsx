import { cn } from "../utils";

import { motion } from "framer-motion";

export function CodeWrapper({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "flex-grow rounded-2xl border border-slate-600 bg-slate-800 p-3 px-4 text-left text-sm text-slate-400",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function Code({
  tab = 0,
  children,
  selected = false,
  line,
}: {
  children?: React.ReactNode;
  tab?: number;
  selected?: boolean;
  line: number;
}) {
  return (
    <div className="flex flex-row items-center gap-2 whitespace-nowrap">
      <code className="block w-4 text-right font-mono">{line}</code>
      <code
        className={cn(
          "block flex-grow rounded-lg p-[1px] px-1 font-mono transition-colors",
          selected && "bg-slate-600 bg-opacity-70",
        )}
        style={{ marginLeft: `${tab * 20}px` }}
      >
        {children}
      </code>
    </div>
  );
}

export function CodeName({ children }: { children?: React.ReactNode }) {
  return <span className="text-white">{children}</span>;
}
export function CodeFunction({ children }: { children?: React.ReactNode }) {
  return <span className="text-lime-300">{children}</span>;
}
export function CodeBracket({ children }: { children?: React.ReactNode }) {
  return <span className="text-yellow-300">{children}</span>;
}
export function CodeBracket2({ children }: { children?: React.ReactNode }) {
  return <span className="text-pink-400">{children}</span>;
}
export function CodeKeyword({ children }: { children?: React.ReactNode }) {
  return <span className="text-red-400">{children}</span>;
}
export function CodeType({ children }: { children?: React.ReactNode }) {
  return <span className="text-blue-300">{children}</span>;
}
export function CodeNumber({ children }: { children?: React.ReactNode }) {
  return <span className="text-pink-300">{children}</span>;
}
export function CodeOther({ children }: { children?: React.ReactNode }) {
  return <span className="text-purple-300">{children}</span>;
}
export function CodeOther2({ children }: { children?: React.ReactNode }) {
  return <span className="text-orange-300">{children}</span>;
}
