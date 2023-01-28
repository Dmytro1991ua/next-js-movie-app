import "@/styles/globals.css";
import "@/styles/overrides/toast.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={1500}
        closeOnClick={false}
        hideProgressBar={true}
        position="top-center"
      />
    </>
  );
};

export default App;
