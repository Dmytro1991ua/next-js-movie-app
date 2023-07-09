import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useRedirectStatus = (): boolean => {
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsRedirecting(true);
    };

    const handleRouteChangeComplete = () => {
      setIsRedirecting(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      setIsRedirecting(false);
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return isRedirecting;
};
