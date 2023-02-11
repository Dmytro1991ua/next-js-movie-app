import { render, screen } from "@testing-library/react";

import Profile from "@/pages/profile";

describe("Profile", () => {
  it("Should render component without crashing", () => {
    render(<Profile />);

    expect(screen.getByText(/Profile/)).toBeInTheDocument();
  });
});
