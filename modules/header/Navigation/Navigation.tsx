import { clsx } from "clsx";
import React, { FC } from "react";
import { BsChevronDown } from "react-icons/bs";

import MobileNavigation from "./MobileNavigation";
import { useNavigationState } from "../hooks/useNavigationState";

const Navigation: FC = () => {
  const { links, isMobileMenuShown, onToggleMobileNavigation } =
    useNavigationState();

  return (
    <>
      <nav className="navigation" data-testId="navigation">
        <ul className="flex items-center space-x-6">{links}</ul>
      </nav>
      <nav className="w-[50%] ml-auto sm:w-[35%]">
        <ul
          className="navigation-mobile-menu"
          onClick={onToggleMobileNavigation}
        >
          <span className="mr-2">Browse</span>
          <BsChevronDown
            className={clsx("transition", [
              isMobileMenuShown ? "rotate-180" : "rotate-0",
            ])}
          />
          <MobileNavigation isVisible={isMobileMenuShown} />
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
