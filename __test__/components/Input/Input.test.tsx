import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import Input from "@/components/Input";
import { mockSessionWithNoUser } from "@/mocks/testMocks";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Label", () => {
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

  it("Should have general styles applied", () => {
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
        <Input error errorText="Test Error Message" />
      </SessionProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "bg-errorBg text-white border-2 border-tomato placeholder-errorText focus:border-errorBg border-2 border-solid"
    );
    expect(screen.getByText(/Test Error Message/)).toBeInTheDocument();
  });

  it("Should have disabled styles applied", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input disabled />
      </SessionProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "cursor-not-allowed bg-gray95 shadow-inner opacity-50"
    );
  });

  it("Should have label if it has been provided", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Input label="Test Label" />
      </SessionProvider>
    );

    expect(screen.getByText(/Test Label/)).toBeInTheDocument();
  });
});
