import { render, screen } from "@testing-library/react";

import SignInPage from "@/pages/auth/sign-in";

describe("SignIn Page", () => {
  it("Should render component without crashing", () => {
    render(<SignInPage />);

    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.getByText(/Login here via Github/)).toBeInTheDocument();
    expect(screen.getByText(/Login here via Google/)).toBeInTheDocument();
  });
});
