import { useCallback, useMemo, useState } from "react";

import { getNavigationLinks } from "../header.configs";

type ReturnedHookType = {
  links: JSX.Element[];
  isMobileMenuShown: boolean;
  onToggleMobileNavigation: () => void;
};

export const useNavigationState = (): ReturnedHookType => {
  const links = useMemo(() => getNavigationLinks(), []);

  const [isMobileMenuShown, setIsMobileMenuShown] = useState<boolean>(false);

  const onToggleMobileNavigation = useCallback(
    () => setIsMobileMenuShown((current) => !current),
    []
  );

  return {
    links,
    isMobileMenuShown,
    onToggleMobileNavigation,
  };
};
