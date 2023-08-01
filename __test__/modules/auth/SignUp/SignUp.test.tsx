import { screen } from "@testing-library/react";

import { mockSessionWithNoUser, withSessionProvider } from "@/mocks/testMocks";
import SignUp from "@/modules/auth/components/SignUp";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("SignUp", () => {
  it("Should render component without crashing", () => {
    withSessionProvider({
      session: mockSessionWithNoUser,
      component: <SignUp />,
    });

    expect(screen.getByText(/Create Account/)).toBeInTheDocument();
    expect(
      screen.getByText(/Already have have an account?/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '"I am gonna make him an offer he can not refuse."" - The Godfather (1972)'
      )
    ).toBeInTheDocument();
  });
});
