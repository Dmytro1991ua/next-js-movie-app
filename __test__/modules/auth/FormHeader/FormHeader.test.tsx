import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockSessionWithNoUser } from "@/mocks/testMocks";
import FormHeader from "@/modules/auth/components/FormHeader";

describe("FormHeader", () => {
  it("Should render component without crashing", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <FormHeader title="Test Title" />
      </SessionProvider>
    );

    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
  });

  it("Should render subtitle if it has been provided", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <FormHeader subtitle="Test Subtitle" title="Test Title" />
      </SessionProvider>
    );

    expect(screen.getByText(/Test Subtitle/)).toBeInTheDocument();
  });
});
