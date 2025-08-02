import React from "react";
import type { JSX } from "react";

const Heading = ({
  children,
  align = "center",
  color = "black",
  className = "",
  size = "8xl",
  as = "h2",
}: {
  children: React.ReactNode;
  align?: string;
  color?: string;
  className?: string;
  size?: string;
  as?: keyof JSX.IntrinsicElements;
}) => {
  const Tag = as; // Dynamically set the heading tag

  return (
    <Tag
      className={`text-4xl lg:text-${size} uppercase font-extrabold font-primary text-${align} text-${color} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Heading;
