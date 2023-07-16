import React, { FC } from "react";

interface LoaderProps {
  height?: number;
  width?: number;
  circleColor?: string;
  pathColor?: string;
}

const Loader: FC<LoaderProps> = ({
  height = 2.25,
  width = 2.25,
  circleColor = "currentColor",
  pathColor = "currentColor",
}) => {
  const customDimensions = {
    height: `${height}rem`,
    width: `${width}rem`,
  };

  return (
    <svg
      className="animate-spin"
      data-testid="button-loader"
      fill="none"
      style={customDimensions}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke={circleColor}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z"
        fill={pathColor}
      />
    </svg>
  );
};

export default Loader;
