import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import Label from "@/components/Label";
import { mockSessionWithNoUser } from "@/mocks/testMocks";

describe("Label", () => {
  it("Should render component without crashing ", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Label>Test Label</Label>
      </SessionProvider>
    );

    expect(screen.getByText(/Test Label/)).toBeInTheDocument();
  });
});
