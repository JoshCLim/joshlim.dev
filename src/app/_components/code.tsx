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
