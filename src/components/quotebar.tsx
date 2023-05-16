export const Quotebar = ({ quote }: { quote: string }) => {
  return (
    <aside className="fixed bottom-0 left-0 w-full bg-transparent p-5 text-center text-[#ccc]">
      {quote}
    </aside>
  );
};
