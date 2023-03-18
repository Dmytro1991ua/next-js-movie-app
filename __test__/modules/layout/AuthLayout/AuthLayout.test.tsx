import { screen } from "@testing-library/react";

import { mockSessionWithNoUser, withSessionProvider } from "@/mocks/testMocks";
import AuthLayout from "@/modules/layout/AuthLayout/AuthLayout";

import SignInImage from "../../../public/assets/auth-layout/sign-in-bg.jpg";

describe("AuthLayout", () => {
  it("Should render component without crashing ", () => {
    withSessionProvider({
      session: mockSessionWithNoUser,
      component: <AuthLayout image={SignInImage} layout="fill" />,
    });

    expect(screen.getByTestId("image")).toBeInTheDocument();
  });
});
