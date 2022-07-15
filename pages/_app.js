import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <AnimatePresence exitBeforeEnter>
          <Header>
            <Component {...pageProps} />
          </Header>
        </AnimatePresence>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
