import { render, screen } from "@testing-library/react";

import SignUp from "@/modules/auth/SignUp";

describe("SignIn Page", () => {
  it("Should render component without crashing", () => {
    render(<SignUp />);

    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
  });
});
