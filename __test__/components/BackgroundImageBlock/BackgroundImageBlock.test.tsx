import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import BackgroundImageBlock from "@/components/BackgroundImageBlock/BackgroundImageBlock";

import SignInImage from "../../../public/assets/auth-layout/sign-in-bg.jpg";

export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: "Test user", email: "test@example.com", id: "1" },
};

describe("BackgroundImageBlock", () => {
  it("Should render component without crashing ", () => {
    render(
      <SessionProvider>
        <BackgroundImageBlock layout="fill" src={SignInImage} />
      </SessionProvider>
    );

    expect(screen.getByTestId("image")).toBeInTheDocument();
  });
});
