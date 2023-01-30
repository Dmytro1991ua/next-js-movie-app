import { render, screen } from "@testing-library/react";

import Home from "@/pages/index";

describe("Home Page", () => {
  it("Should render component without crashing", () => {
    render(<Home />);

    expect(screen.getByText(/Movies/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
  });
});
