import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";

import createMockRouter from "@/mocks/createMockRouter";
import { mockSessionWithNoUser } from "@/mocks/testMocks";
import Navigation from "@/modules/header/Navigation";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

describe("Navigation", () => {
  it("Should render component without crashing", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <RouterContext.Provider
          value={createMockRouter({ asPath: AppRoutes.Profile })}
        >
          <Navigation />
        </RouterContext.Provider>
      </SessionProvider>
    );

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Movies/)).toBeInTheDocument();
    expect(screen.getByText(/Serials/)).toBeInTheDocument();
  });
});
