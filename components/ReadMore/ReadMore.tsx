import React, { FC } from "react";

import {
  DEFAULT_READ_LESS_TEXT,
  DEFAULT_READ_MORE_TEXT,
  DEFAULT_READ_MORE_TEXT_LIMIT,
} from "@/types/constants";

import { useReadMore } from "./hooks/useReadMore";

interface ReadMoreProps {
  text: string;
  limit?: number;
  className?: string;
  readMoreText?: string;
  readLessText?: string;
}

const ReadMore: FC<ReadMoreProps> = ({
  text,
  limit = DEFAULT_READ_MORE_TEXT_LIMIT,
  className,
  readLessText = DEFAULT_READ_LESS_TEXT,
  readMoreText = DEFAULT_READ_MORE_TEXT,
}) => {
  const { isReadMore, truncatedLongText, onToggleReadMoreButton } = useReadMore(
    { text, limit }
  );

  return (
    <div className={className}>
      {text.length < limit ? (
        text
      ) : (
        <p>
          {isReadMore ? text : truncatedLongText}
          <span
            className="text-mantis cursor-pointer font-bold"
            onClick={onToggleReadMoreButton}
          >
            {isReadMore ? readLessText : readMoreText}
          </span>
        </p>
      )}
    </div>
  );
};

export default ReadMore;
