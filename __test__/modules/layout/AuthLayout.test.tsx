import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockSessionWithNoUser } from "@/mocks/testMocks";
import AuthLayout from "@/modules/layout/AuthLayout";

import SignInImage from "../../../public/assets/auth-layout/sign-in-bg.jpg";

describe("AuthLayout", () => {
  it("Should render component without crashing ", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <AuthLayout image={SignInImage} layout="fill" />
      </SessionProvider>
    );

    expect(screen.getByTestId("image")).toBeInTheDocument();
  });
});
