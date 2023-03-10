import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import BackgroundImageBlock from "@/components/BackgroundImageBlock";
import { mockSessionWithNoUser } from "@/mocks/testMocks";

import SignInImage from "../../../public/assets/auth-layout/sign-in-bg.jpg";

describe("BackgroundImageBlock", () => {
  it("Should render component without crashing ", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <BackgroundImageBlock layout="fill" src={SignInImage} />
      </SessionProvider>
    );

    expect(screen.getByTestId("image")).toBeInTheDocument();
  });
});
