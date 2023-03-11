import React, { FC } from "react";

import useScrollPosition from "@/hooks/useScrollPosition";
import { DEFAULT_SCROLL_POSITION_THRESHOLD } from "@/types/constants";
import { classNames } from "@/utils/utils";

import Logo from "./Logo";
import Navigation from "./Navigation";

const Header: FC = () => {
  const scrollPosition = useScrollPosition();

  return (
    <header
      className={classNames(
        scrollPosition > DEFAULT_SCROLL_POSITION_THRESHOLD
          ? "header-on-scroll"
          : "border-0	border-transparent",
        "header"
      )}
    >
      <Logo />
      <Navigation />
    </header>
  );
};

export default Header;
