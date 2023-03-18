import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import React, { FC } from "react";

import useScrollPosition from "@/hooks/useScrollPosition";

import Actions from "./Actions";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header: FC = () => {
  const { isHeaderScrolled } = useScrollPosition();
  const { data: session } = useSession();

  return (
    <header
      className={clsx("header", [
        isHeaderScrolled
          ? "header-on-scroll"
          : "border-0	border-transparent py-4",
      ])}
      data-testId="header"
    >
      <Logo />
      {session?.user && <Navigation />}
      <Actions />
    </header>
  );
};

export default Header;
