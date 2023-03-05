import "@/styles/globals.css";
import "@/styles/overrides/toast.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

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

import { MainLayout } from "@/modules/layout";
import ProtectedRoutes from "@/modules/routes/ProtectedRoutes";
import { protectedRoutes } from "@/types/constants";

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
          <ProtectedRoutes protectedRoutes={protectedRoutes}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ProtectedRoutes>
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
