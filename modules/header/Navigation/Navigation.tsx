import { clsx } from "clsx";
import React, { FC, useCallback, useMemo, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import MobileNavigation from "./MobileNavigation";
import { getNavigationLinks } from "../header.configs";

const Navigation: FC = () => {
  const links = useMemo(() => getNavigationLinks(), []);

  const [isMobileMenuShown, setIsMobileMenuShown] = useState<boolean>(false);

  const handleToggleMobileNavigation = useCallback(
    () => setIsMobileMenuShown((current) => !current),
    []
  );

  return (
    <>
      <nav className="navigation">
        <ul className="flex items-center space-x-6">{links}</ul>
      </nav>
      <nav className="w-[50%] ml-auto sm:w-[35%]">
        <ul
          className="navigation-mobile-menu"
          onClick={handleToggleMobileNavigation}
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
