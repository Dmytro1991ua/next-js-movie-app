import { render, screen } from "@testing-library/react";

import ProfilePage from "@/pages/profile/index";

describe("Profile Page", () => {
  it("Should render component without crashing", () => {
    render(<ProfilePage />);

    expect(screen.getByText(/Profile/)).toBeInTheDocument();
  });
});
