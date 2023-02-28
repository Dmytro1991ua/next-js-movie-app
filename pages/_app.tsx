import "@/styles/globals.css";
import "@/styles/overrides/toast.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

import MainLayout from "@/modules/layout/MainLayout";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
  dehydratedState: DehydratedState;
}>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
          <ToastContainer
            autoClose={1500}
            closeOnClick={false}
            hideProgressBar={true}
            position="top-center"
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
