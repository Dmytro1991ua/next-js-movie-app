import "@/styles/globals.css";
import "@/styles/overrides/toast.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={1500}
        closeOnClick={false}
        hideProgressBar={true}
        position="top-center"
      />
    </SessionProvider>
  );
};

export default App;
