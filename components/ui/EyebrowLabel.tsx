import { type ReactNode } from "react";

interface EyebrowLabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase section label — "OUR BREADS", "HOW IT WORKS", "TESTIMONIALS".
 */
export function EyebrowLabel({ children, className = "" }: EyebrowLabelProps) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55 ${className}`}
    >
      {children}
    </p>
  );
}
