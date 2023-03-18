import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";

import createMockRouter from "@/mocks/createMockRouter";
import { mockSessionWithNoUser } from "@/mocks/testMocks";
import GenerateMainLayoutSkeleton from "@/modules/layout/MainLayout/GenerateMainLayoutSkeleton";
import { AppRoutes } from "@/types/enums";

describe("GenerateMainLayoutSkeleton", () => {
  it("Should render component without crashing ans show SignIn skeleton based on asPath props", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <RouterContext.Provider
          value={createMockRouter({ asPath: AppRoutes.SignIn })}
        >
          <GenerateMainLayoutSkeleton asPath={AppRoutes.SignIn} />
        </RouterContext.Provider>
      </SessionProvider>
    );

    const headerSkeleton = screen.getByTestId("header-skeleton");
    const signInSkeleton = screen.getByTestId("sign-in-skeleton");

    expect(headerSkeleton).toBeInTheDocument();
    expect(signInSkeleton).toBeInTheDocument();
  });
});
