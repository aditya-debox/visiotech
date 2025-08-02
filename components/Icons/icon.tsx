import { color } from "framer-motion";
import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
  isBlack?: boolean;
}

const Icon: React.FC<IconProps> = ({
  height,
  width,
  className,
  isBlack = true,
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 79 86"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <rect
        width="56.8588"
        height="17.9933"
        fill={`${isBlack ? "black" : "white"}`}
      />
      <rect
        x="51.1016"
        y="67.2949"
        width="32.0322"
        height="17.9933"
        transform="rotate(-89.8293 51.1016 67.2949)"
        fill={`${isBlack ? "black" : "white"}`}
      />
      <rect
        x="0.360352"
        y="54.3397"
        width="78.2251"
        height="17.9933"
        transform="rotate(-43.8564 0.360352 54.3397)"
        fill={`${isBlack ? "black" : "white"}`}
      />
    </svg>
  );
};

export default Icon;
