import React, { FC, useMemo } from "react";

import Actions from "../../Actions";
import { getNavigationLinks } from "../../header.configs";

interface MobileNavigationProps {
  isVisible?: boolean;
}

const MobileNavigation: FC<MobileNavigationProps> = ({ isVisible = false }) => {
  const links = useMemo(() => getNavigationLinks(true), []);

  return (
    <>
      {isVisible && (
        <section
          className="navigation-mobile-dropdown"
          data-testId="mobile-navigation"
        >
          <ul className="flex flex-col gap-4 px-2 mb-4">{links}</ul>
          <div className="flex justify-center">
            <Actions isMobileScreen />
          </div>
        </section>
      )}
    </>
  );
};

export default MobileNavigation;
