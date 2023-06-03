import type { NextPage } from "next";
import Head from "next/head";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Quotebar } from "~/components/quotebar";
import { NavbarBrutal } from "~/components/navbars/partyNavbar";
import Link from "next/link";
dayjs.extend(relativeTime);

const Party: NextPage = () => {
  return (
    <>
      <Head>
        <title>Party | joshlim.dev</title>
        {/* <meta name="description" content="Generated by create-t3-app" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main
        className="fixed left-0 top-0 flex min-h-screen w-full flex-row flex-wrap items-center justify-center gap-5 
        overflow-hidden bg-amber-300 p-5 text-[#333]" // bg-gradient-to-b from-[#707400] to-[#232500]
      >
        <NavbarBrutal currPage="party" />
        <div className="container items-center justify-center p-7 md:max-w-4xl md:p-10">
          <Games />
        </div>
        <Quotebar
          colour="#333"
          quote={
            "Amidst life's journey, remember: it's okay to party. — ChatGPT"
          }
        />
      </main>
    </>
  );
};

const Games = () => {
  return (
    <>
      <div className="flex items-center gap-5">
        <h1 className="text-5xl font-extrabold text-[#000]">Games</h1>
        <p className=" bg-[#c2325d] px-4 py-3 text-center font-extrabold uppercase text-white">
          More Coming Soon!
        </p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 py-5 sm:justify-start">
        <GameTile name="chess" href="chess" complete={true} />
        <GameTile name="snake" href="snake" complete={false} />
        <GameTile name="sudoku" href="sudoku" complete={false} />
        <GameTile name="2048" href="2048" complete={false} />
        <GameTile name="tic-tac-toe" href="tic-tac-toe" complete={false} />
      </div>
    </>
  );
};

const GameTile = ({
  name,
  href,
  complete,
}: {
  name: string;
  href: string;
  complete: boolean;
}) => {
  return (
    <Link href={`/games/${href}`}>
      <div
        className={`hard-shadow flex cursor-pointer flex-col items-center justify-center rounded-xl border-2  border-[#000] bg-white  p-5 ${
          !complete ? "blur" : ""
        } md:p-7`}
      >
        <h3 className="text-2xl font-extrabold text-[#000]">{name}</h3>
      </div>
    </Link>
  );
};

export default Party;
