import { render, screen } from "@testing-library/react";

import MoviesPage from "@/pages/movies/index";

describe("MoviesPage Page", () => {
  it("Should render component without crashing", () => {
    render(<MoviesPage />);

    expect(screen.getByText(/Movies/)).toBeInTheDocument();
  });
});
