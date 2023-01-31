import { render, screen } from "@testing-library/react";

import SignIn from "@/modules/auth/SignIn";

describe("SignIn Page", () => {
  it("Should render component without crashing", () => {
    render(<SignIn />);

    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.getByText(/Login here via Github/)).toBeInTheDocument();
    expect(screen.getByText(/Login here via Google/)).toBeInTheDocument();
  });
});
