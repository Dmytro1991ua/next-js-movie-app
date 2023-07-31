import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import Input from "@/components/Input";
import { mockSessionWithNoUser } from "@/mocks/testMocks";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Input", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input />
      </SessionProvider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should have normal styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input />
      </SessionProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "bg-mantis placeholder-white text-white border-2 border-mantisDarker focus:border-mantisDarker border-2 border-solid"
    );
  });

  it("Should have error styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input error />
      </SessionProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "bg-errorBg border-2 border-tomato !placeholder-errorText focus:border-errorBg"
    );
  });

  it("Should have disabled styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input disabled />
      </SessionProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("pointer-events-none shadow-inner opacity-50");
  });

  it("Should have label if it has been provided", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input label="Test Label" />
      </SessionProvider>
    );

    expect(screen.getByText(/Test Label/)).toBeInTheDocument();
  });

  it("Should add to label '*' sign if field is required", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input required label="Test Label" />
      </SessionProvider>
    );

    const label = screen.getByText(/Test Label/);

    expect(label.textContent).toEqual("Test Label *");
  });

  it("should apply base styles to input if isBaseInput prop is true", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input isBaseInput required label="Test Label" />
      </SessionProvider>
    );

    const mockOutput =
      "rounded-lg border-transparent flex-1 appearance-none border py-2 px-2 shadow-sm text-base focus:outline-none focus:ring-black bg-mantis placeholder-white text-white border-2 border-mantisDarker focus:border-mantisDarker border-2 border-solid border-transparent flex-1 appearance-none border py-2 px-2 shadow-sm text-base focus:outline-none focus:ring-black bg-white text-darkBlue !placeholder-darkBlue border-2 border-solid border-mantis !focus:border-mantisDarker w-fit";

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(mockOutput);
  });
});
