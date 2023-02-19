import { render, screen } from "@testing-library/react";

import SignUpPage from "@/pages/auth/sign-up";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("SignIn Page", () => {
  it("Should render component without crashing", () => {
    render(<SignUpPage />);

    expect(
      screen.getByText(/Create a new user with credentials/)
    ).toBeInTheDocument();
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
