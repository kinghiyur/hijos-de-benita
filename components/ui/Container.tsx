import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}

/**
 * Editorial-feel container — wide gutters, generous max width.
 * Mirrors the breathing room from Poilane/Human Race references.
 */
export function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={`w-full px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </Tag>
  );
}
