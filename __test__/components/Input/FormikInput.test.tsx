import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import FormikInput from "@/components/Input/FormikInput";
import { mockField, mockMeta, mockSessionWithNoUser } from "@/mocks/testMocks";
import { SIGN_IN_FORM_INITIAL_VALUE } from "@/modules/auth/components/SignIn/SignIn.schema";

import { withFormikWrapper } from "./../../../mocks/testMocks";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useField: jest.fn(() => {
    return [
      mockField,
      { ...mockMeta, touched: true, error: "Test Error Message" },
    ];
  }),
}));

const defaultProps = {
  name: "Test Field",
  placeholder: "Test input placeholder",
};

describe("FormikInput", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        {withFormikWrapper(
          <FormikInput {...defaultProps} />,
          SIGN_IN_FORM_INITIAL_VALUE
        )}
      </SessionProvider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should have error styles applied", async () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        {withFormikWrapper(
          <FormikInput {...defaultProps} error />,
          SIGN_IN_FORM_INITIAL_VALUE
        )}
      </SessionProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "bg-errorBg border-2 border-tomato !placeholder-errorText focus:border-errorBg"
    );

    const errorMessage = await screen.findByText(/Test Error Message/);
    expect(errorMessage).toBeInTheDocument();
  });
});
