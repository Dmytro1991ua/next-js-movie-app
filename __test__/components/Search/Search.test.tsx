import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Search from "@/components/Search";
import * as utils from "@/components/Search/hooks/useSearchMovieOrSerialState";
import { DEFAULT_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const mockSearchTerm = "test_input_value";
const onSetNewSearchTermMock = jest.fn();
const onHandleFormSubmitMock = jest.fn();

const defaultProps = {
  searchPath: AppRoutes.SearchMovies,
  isDetailsPage: false,
};

describe("Search", () => {
  beforeEach(() => {
    jest.spyOn(utils, "useSearchMovieOrSerialState").mockImplementation(() => ({
      searchTerm: mockSearchTerm,
      isButtonDisabled: false,
      onSetNewSearchTerm: onSetNewSearchTermMock,
      onHandleFormSubmit: onHandleFormSubmitMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render component without crashing with default placeholder", () => {
    render(<Search {...defaultProps} />);

    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(DEFAULT_SEARCH_INPUT_PLACEHOLDER)
    ).toBeInTheDocument();
    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });

  it("should call onChange handler on input while typing in it", async () => {
    render(<Search {...defaultProps} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, mockSearchTerm);

    expect(input).toHaveValue(mockSearchTerm);

    await waitFor(() => expect(onSetNewSearchTermMock).toHaveBeenCalled());
  });

  it("should submit form on Enter key press", async () => {
    render(<Search {...defaultProps} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, `${mockSearchTerm}{enter}`);

    expect(input).toHaveValue(mockSearchTerm);

    await waitFor(() => expect(onHandleFormSubmitMock).toHaveBeenCalled());
  });

  it("should submit form on button click", async () => {
    render(<Search {...defaultProps} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByText(/Search/);

    await userEvent.type(input, mockSearchTerm);
    await userEvent.click(button);

    await waitFor(() => expect(onHandleFormSubmitMock).toHaveBeenCalled());
  });
});
