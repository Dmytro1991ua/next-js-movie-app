import { screen } from "@testing-library/react";

import { mockSessionWithNoUser, withSessionProvider } from "@/mocks/testMocks";
import FormRedirectLink from "@/modules/auth/components/FormRedirectLink";
import { AppRoutes } from "@/types/enums";

describe("FormRedirectLink", () => {
  it("Should render component without crashing", () => {
    withSessionProvider({
      session: mockSessionWithNoUser,
      component: (
        <FormRedirectLink
          route={AppRoutes.SignIn}
          title="Test Redirection link text"
        />
      ),
    });

    const link = screen.getByRole("link");

    expect(screen.getByText(/Test Redirection link text/)).toBeInTheDocument();
    expect(link).toHaveAttribute("href", AppRoutes.SignIn);
  });
});
