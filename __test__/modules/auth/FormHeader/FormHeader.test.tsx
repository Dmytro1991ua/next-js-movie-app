import { screen } from "@testing-library/react";

import { mockSessionWithNoUser, withSessionProvider } from "@/mocks/testMocks";
import FormHeader from "@/modules/auth/components/FormHeader";

describe("FormHeader", () => {
  it("Should render component without crashing", () => {
    withSessionProvider({
      session: mockSessionWithNoUser,
      component: <FormHeader title="Test Title" />,
    });

    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
  });

  it("Should render subtitle if it has been provided", () => {
    withSessionProvider({
      session: mockSessionWithNoUser,
      component: <FormHeader subtitle="Test Subtitle" title="Test Title" />,
    });

    expect(screen.getByText(/Test Subtitle/)).toBeInTheDocument();
  });
});
