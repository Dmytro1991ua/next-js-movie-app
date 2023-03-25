import { MutableRefObject, useRef, useState } from "react";

type ReturnedHookType = {
  isActionButtonClicked: boolean;
  rowRef: MutableRefObject<HTMLDivElement | null>;
  onActionIconClick: (direction: string) => void;
};

export const useSliderActions = (): ReturnedHookType => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isActionButtonClicked, setIsActionButtonClicked] =
    useState<boolean>(false);

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

  return {
    isActionButtonClicked,
    rowRef,
    onActionIconClick,
  };
};
