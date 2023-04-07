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

  beforeEach(() => {
    jest.spyOn(hook, "useReadMore").mockImplementation(() => ({
      isReadMore: false,
      truncatedLongText: mockTruncatedText,
      onToggleReadMoreButton: () => mockOnToggleReadMoreButton,
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should render component without crashing", () => {
    readMoreComponent({
      text: mockDefaultText,
      readMoreText: DEFAULT_READ_MORE_TEXT,
    });

    expect(screen.getByText(mockDefaultText)).toBeInTheDocument();
  });

  it("Should render Read More/Show Less text when text is too long", () => {
    readMoreComponent({ text: mockLongText, limit: 500 });

    expect(screen.getByText(mockTruncatedText)).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_READ_MORE_TEXT)).toBeInTheDocument();
  });
});
