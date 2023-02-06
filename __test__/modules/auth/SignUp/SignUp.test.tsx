import { render, screen } from "@testing-library/react";

import SignUp from "@/modules/auth/SignUp";

describe("SignUp", () => {
  it("Should render component without crashing", () => {
    render(<SignUp />);

    expect(screen.getByText(/Login here via Github/)).toBeInTheDocument();
    expect(screen.getByText(/Login here via Github/)).toBeInTheDocument();
    expect(screen.getByText(/Submit With Credentials/)).toBeInTheDocument();
  });
});
