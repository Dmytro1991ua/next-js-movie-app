import { useEffect, useState } from "react";

import { DEFAULT_SCROLL_POSITION_THRESHOLD } from "@/types/constants";

interface ReturnedHookType {
  isHeaderScrolled: boolean;
}

export const useScrollPosition = (): ReturnedHookType => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const isHeaderScrolled = scrollPosition > DEFAULT_SCROLL_POSITION_THRESHOLD;

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return { isHeaderScrolled };
};

export default useScrollPosition;
