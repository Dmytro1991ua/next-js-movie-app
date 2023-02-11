import { render, screen } from "@testing-library/react";

import Movies from "@/modules/movies";

describe("Movies", () => {
  it("Should render component without crashing", () => {
    render(<Movies />);

    expect(screen.getByText(/Movies/)).toBeInTheDocument();
  });
});
