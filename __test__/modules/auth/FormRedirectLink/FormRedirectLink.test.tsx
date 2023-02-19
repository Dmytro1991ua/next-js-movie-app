import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockSessionWithNoUser } from "@/mocks/testMocks";
import FormRedirectLink from "@/modules/auth/components/FormRedirectLink";
import { AppRoutes } from "@/types/enums";

describe("FormRedirectLink", () => {
  it("Should render component without crashing", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <FormRedirectLink
          route={AppRoutes.SignIn}
          title="Test Redirection link text"
        />
      </SessionProvider>
    );

    const link = screen.getByRole("link");

    expect(screen.getByText(/Test Redirection link text/)).toBeInTheDocument();
    expect(link).toHaveAttribute("href", AppRoutes.SignIn);
  });
});
