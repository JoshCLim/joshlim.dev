import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    AOS.init();
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
