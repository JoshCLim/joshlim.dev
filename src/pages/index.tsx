import { type NextPage } from "next";
import Head from "next/head";
import { Navbar } from "~/components/navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>joshlim.dev</title>
        {/* <meta name="description" content="Generated by create-t3-app" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="fixed flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar currPage="" />
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Hello, there.
        </h1>
        <p className="my-5 text-lg font-bold">
          go away ronan :) - I solved it tho you mongoose xx
        </p>
      </main>
    </>
  );
};

export default Home;
