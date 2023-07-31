import { render, screen } from "@testing-library/react";

import ReadMore from "@/components/ReadMore";
import * as hook from "@/components/ReadMore/hooks/useReadMore";
import {
  DEFAULT_READ_LESS_TEXT,
  DEFAULT_READ_MORE_TEXT,
  DEFAULT_READ_MORE_TEXT_LIMIT,
} from "@/types/constants";

jest.mock("@/components/ReadMore/hooks/useReadMore");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const mockDefaultText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit illo labore nesciunt explicabo tempore, sed recusandae nisi ipsum quia id obcaecati voluptas saepe cum molestiae a! Repudiandae alias dolor odit!";

const mockLongText = `${mockDefaultText} Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam, optio est quia eveniet quisquam nostrum, asperiores aspernatur quidem corporis recusandae obcaecati laborum quaerat! Vero quia eius voluptas placeat ex? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus aliquid sequi error dolores repudiandae placeat doloremque harum quas quisquam. Dolores ipsum officia quibusdam? Perspiciatis necessitatibus dignissimos animi ratione debitis nihil.`;
const mockTruncatedText = "Test truncated text";
const mockOnToggleReadMoreButton = jest.fn();

describe("ReadMore", () => {
  const readMoreComponent = ({
    text,
    limit = DEFAULT_READ_MORE_TEXT_LIMIT,
    readLessText = DEFAULT_READ_LESS_TEXT,
    readMoreText = DEFAULT_READ_MORE_TEXT,
  }: {
    text: string;
    limit?: number;
    readLessText?: string;
    readMoreText?: string;
  }) =>
    render(
      <ReadMore
        limit={limit}
        readLessText={readLessText}
        readMoreText={readMoreText}
        text={text}
      />
    );

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should render component without crashing", () => {
    jest.spyOn(hook, "useReadMore").mockImplementation(() => ({
      isReadMore: false,
      truncatedLongText: mockTruncatedText,
      onToggleReadMoreButton: () => mockOnToggleReadMoreButton,
    }));

    readMoreComponent({
      text: mockDefaultText,
      readMoreText: DEFAULT_READ_MORE_TEXT,
    });

    expect(screen.getByText(mockDefaultText)).toBeInTheDocument();
  });

  it("should display the full text when text is short", () => {
    render(<ReadMore text={mockDefaultText} />);

    const displayedText = screen.getByText(mockDefaultText);
    expect(displayedText).toBeInTheDocument();
  });

  it("Should render Read More text when text is too long", () => {
    jest.spyOn(hook, "useReadMore").mockImplementation(() => ({
      isReadMore: false,
      truncatedLongText: mockTruncatedText,
      onToggleReadMoreButton: () => mockOnToggleReadMoreButton,
    }));

    readMoreComponent({ text: mockLongText, limit: 500 });

    expect(screen.getByText(mockTruncatedText)).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_READ_MORE_TEXT)).toBeInTheDocument();
  });

  it("Should render Show Less text when isReadMore is true", () => {
    jest.spyOn(hook, "useReadMore").mockImplementation(() => ({
      isReadMore: true,
      truncatedLongText: mockTruncatedText,
      onToggleReadMoreButton: () => mockOnToggleReadMoreButton,
    }));

    readMoreComponent({ text: mockLongText, limit: 500 });

    expect(screen.getByText(mockLongText)).toBeInTheDocument();
    expect(screen.getByText("Show Less")).toBeInTheDocument();
  });
});
