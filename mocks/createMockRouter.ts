import { NextRouter } from "next/router";

import { AppRoutes } from "@/types/enums";

const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
  return {
    basePath: "",
    pathname: AppRoutes.Home,
    route: AppRoutes.Home,
    query: {},
    asPath: AppRoutes.Home,
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  };
};
export default createMockRouter;
