import { render, screen } from "@testing-library/react";

import SignUpPage from "@/pages/auth/sign-up";

describe("SignIn Page", () => {
  it("Should render component without crashing", () => {
    render(<SignUpPage />);

    expect(screen.getByText(/Login here via Github/)).toBeInTheDocument();
    expect(screen.getByText(/Login here via Github/)).toBeInTheDocument();
    expect(screen.getByText(/Submit With Credentials/)).toBeInTheDocument();
  });
});
