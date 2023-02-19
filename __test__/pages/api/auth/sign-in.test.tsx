import { render, screen } from "@testing-library/react";

import SignInPage from "@/pages/auth/sign-in";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("SignIn Page", () => {
  it("Should render component without crashing", () => {
    render(<SignInPage />);

    expect(screen.getByText(/Sign-In with Credentials/)).toBeInTheDocument();
    expect(screen.getByText(/Sign-In with Github/)).toBeInTheDocument();
    expect(screen.getByText(/Sign-In with Google/)).toBeInTheDocument();
    expect(screen.getByText(/Do not have an account?/)).toBeInTheDocument();
    expect(
      screen.getByText(
        '"Frankly, my dear, I don not give a damn." - Gone with the Wind (1939)'
      )
    ).toBeInTheDocument();
  });
});
