import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import Button from "@/components/Button";
import { ButtonVariant } from "@/components/Button/Button.types";
import { mockSessionWithNoUser } from "@/mocks/testMocks";

describe("Button", () => {
  it("Should render component without crashing", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Button>Test Button</Button>
      </SessionProvider>
    );

    expect(screen.getByText(/Test Button/)).toBeInTheDocument();
  });

  it("Should have primary styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Button variant={"primary" as ButtonVariant} />
      </SessionProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "focus:outline-none transition ease-in-out duration-300 rounded-lg bg-mantis hover:bg-mantisDarker text-white focus:ring-2 focus:ring-mantisDarker focus:ring-opacity-50 lg:bg-mantisDarker lg:hover:bg-mantis px-4 py-2 w-fit"
    );
  });

  it("Should have secondary styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Button variant={"secondary" as ButtonVariant} />
      </SessionProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "bg-lighterBlue hover:bg-blue focus:ring-2 focus:ring-lighterBlue"
    );
  });

  it("Should have tertiary styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Button variant={"tertiary" as ButtonVariant} />
      </SessionProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "bg-lightPurple hover:bg-darkPurple focus:ring-2 focus:ring-lightPurple"
    );
  });

  it("Should have danger styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Button variant={"danger" as ButtonVariant} />
      </SessionProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "bg-tomato text-errorText border-2 border-tomato placeholder-errorText hover:bg-errorBg"
    );
  });

  it("Should have disabled styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Button disabled />
      </SessionProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("pointer-events-none shadow-inner opacity-50");
  });

  it("Should apply a full width for a button if it is provided", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Button fullWidth />
      </SessionProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("w-full");
  });
});
