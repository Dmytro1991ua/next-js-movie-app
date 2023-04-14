import { useRouter } from "next/router";
import { MutableRefObject, useRef, useState } from "react";

import { SeeMoreRoutes } from "@/types/enums";

type HookProps = {
  seeMoreRoute?: SeeMoreRoutes;
};

type ReturnedHookType = {
  isActionButtonClicked: boolean;
  rowRef: MutableRefObject<HTMLDivElement | null>;
  onActionIconClick: (direction: string) => void;
  onRedirectToSeeMorePage: () => void;
};

export const useSliderActions = ({
  seeMoreRoute,
}: HookProps): ReturnedHookType => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isActionButtonClicked, setIsActionButtonClicked] =
    useState<boolean>(false);

  const router = useRouter();

  const onActionIconClick = (direction: string) => {
    setIsActionButtonClicked(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const onRedirectToSeeMorePage = () => {
    seeMoreRoute && router.push(seeMoreRoute);
  };

  return {
    isActionButtonClicked,
    rowRef,
    onActionIconClick,
    onRedirectToSeeMorePage,
  };
};
