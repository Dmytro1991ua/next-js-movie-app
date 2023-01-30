import { render, screen } from "@testing-library/react";

import SignIn from "@/modules/auth/SignIn";

describe("SignIn", () => {
  it("Should render component without crashing", () => {
    render(<SignIn />);

    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.getByText(/Login here/)).toBeInTheDocument();
  });
});