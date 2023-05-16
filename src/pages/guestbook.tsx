import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Tilt from "react-parallax-tilt";

import { Divider } from "~/components/divider";
import { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { Send } from "iconoir-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Quotebar } from "~/components/quotebar";
import { LoadingSpinner } from "~/components/loading";
dayjs.extend(relativeTime);

const GuestBook: NextPage = () => {
  return (
    <>
      <Head>
        <title>Guestbook | joshlim.dev</title>
        {/* <meta name="description" content="Generated by create-t3-app" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className=" flex min-h-screen flex-row items-center justify-center gap-5 overflow-hidden bg-gradient-to-b from-[#000328] to-[#00286c] text-white">
        <Tilt
          tiltReverse={true}
          glareEnable={true}
          tiltMaxAngleX={2}
          tiltMaxAngleY={2}
          glareMaxOpacity={0.3}
          glarePosition={"all"}
          glareColor={"#777"}
          className="overflow-visible"
          glareBorderRadius={"1.5rem"}
        >
          <div className="container flex max-w-2xl flex-col items-center justify-center gap-4 overflow-visible rounded-3xl border border-white bg-white/10 p-12 backdrop-blur">
            <NamedWelcome />
            <h1 className="text-center text-5xl font-extrabold text-[#eee]">
              share some thoughts.
            </h1>
            <Divider />
            <CreateMessageWizard />
          </div>
        </Tilt>
        <MessageFeed />
      </main>
      <Quotebar
        quote={
          "Within our collective streams of consciousness, lies the power to shape extraordinary realities. — ChatGPT"
        }
      />
    </>
  );
};

const MessageFeed = () => {
  const { data: messages } = api.guestbook.getAllMessages.useQuery();

  if (!messages || messages.length === 0)
    return (
      <div className="no-scrollbar flex h-96 flex-col items-center justify-center gap-5 overflow-scroll rounded-3xl bg-white/10 p-10">
        No Posts!
      </div>
    );

  return (
    <div
      className="no-scrollbar flex h-96 flex-col gap-5 overflow-scroll"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, black 80%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
      }}
    >
      {messages?.map((message) => (
        <Tilt
          key={message.id}
          tiltEnable={false}
          glareEnable={true}
          glareBorderRadius={"1.5rem"}
          glareMaxOpacity={0.3}
          glarePosition={"all"}
          glareColor={"#777"}
        >
          <div className="text-md flex max-w-sm flex-col  gap-1 rounded-3xl border-[#aaa] bg-white/10 p-5 font-light">
            <p className="m-0  text-start font-light">
              {message.content ?? "[your message here]"}
            </p>
            <p className="text-gray m-0 text-end text-sm font-light">
              <Image
                src={message.authorPic}
                alt={`${message.authorName}'s profile picture`}
                width={20}
                height={20}
                className="mr-2 inline rounded-full"
              />
              <span>{`${message.authorName ?? "Unknown"}`}</span>
              <span>{" • "}</span>
              <span>{dayjs(message.createdAt).fromNow()}</span>
            </p>
          </div>
        </Tilt>
      ))}
    </div>
  );
};

const CreateMessageWizard: React.FC = () => {
  const { data: sessionData } = useSession();

  const ctx = api.useContext();

  const [message, setMessage] = useState("");

  const { mutate, isLoading: isPosting } =
    api.guestbook.createMessage.useMutation({
      onSuccess: () => {
        setMessage("");
        void toast.success("Posted!");
        void ctx.guestbook.getAllMessages.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0]);
        } else if (e.message) {
          toast.error(e.message);
        } else {
          toast.error("Failed to post! Please try again later.");
        }
      },
    });

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {sessionData && (
        <div className="flex flex-row">
          <input
            className=" w-96 rounded-3xl bg-white/10 p-6 text-[#eee] outline-none focus:border-transparent focus:ring-2 focus:ring-[#eee]"
            placeholder="say something"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") mutate({ content: message });
            }}
          />
          {!isPosting && (
            <button
              className="-ml-16 rounded-r-3xl bg-white/5 p-5"
              onClick={() => mutate({ content: message })}
            >
              <Send />
            </button>
          )}
          {!!isPosting && (
            <button className="-ml-16 rounded-r-3xl bg-white/5 p-5">
              <LoadingSpinner size={24} />
            </button>
          )}
        </div>
      )}
      <div className="flex w-full flex-row items-center justify-center">
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "sign out" : "sign in"}
        </button>
      </div>
    </div>
  );
};

const NamedWelcome: React.FC = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user === undefined)
    return (
      <p className="m-0 text-xl italic text-[#aaa]">Please login to post</p>
    );

  return (
    <p className="m-0 text-xl font-light text-white">
      welcome,
      <span className="font-normal italic">{` ${
        sessionData.user.name ?? "[your name here]"
      }`}</span>
    </p>
  );
};

export default GuestBook;
