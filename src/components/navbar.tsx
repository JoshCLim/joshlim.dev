import Link from "next/link";

import { Home, ChatBubble } from "iconoir-react";

export const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 flex w-full flex-row items-center justify-center gap-3 p-4 text-white">
      <NavLink href={"/"} icon={<Home />} />
      <NavLink href={"/guestbook"} icon={<ChatBubble />} />
    </nav>
  );
};

const NavLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <Link
      className="rounded-full bg-white/10 p-5 transition-colors hover:bg-white/30"
      href={href}
    >
      {icon}
    </Link>
  );
};
