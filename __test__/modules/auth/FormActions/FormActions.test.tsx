import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockSessionWithNoUser } from "@/mocks/testMocks";
import FormActions from "@/modules/auth/components/FormActions";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("FormActions", () => {
  it("Should render component without crashing and disable primary button", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <FormActions
          isDisabled={true}
          route={AppRoutes.Movies}
          title="Test Button"
        />
      </SessionProvider>
    );

    const button = screen.getByText("Sign-In with Credentials");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("pointer-events-none shadow-inner opacity-50");
  });
});
