import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockSessionWithNoUser } from "@/mocks/testMocks";
import Navigation from "@/modules/header/Navigation";

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
        <Navigation />
      </SessionProvider>
    );

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Serials/)).toBeInTheDocument();
  });
});
