import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "cream" | "bark" | "outline" | "ghost";
type Size = "sm" | "md";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface AnchorProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

type Props = AnchorProps | ButtonProps;

const variantClasses: Record<Variant, string> = {
  // Filled ink — primary CTA on the light page (Order Now, See All).
  // Variant name kept as `cream` for compatibility with existing call sites;
  // the visual is now ink-fill / paper-text.
  cream:
    "bg-ink text-paper hover:bg-bark hover:text-paper",
  // Filled bark — alternate dark variant
  bark:
    "bg-bark text-paper hover:bg-ink hover:text-paper",
  // Outline — used over imagery (e.g. on hero) so still references cream
  outline:
    "border border-paper/70 text-paper hover:bg-paper hover:text-ink",
  // Ghost — quiet link-style on light bg
  ghost:
    "text-ink/70 hover:text-ink",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-7 px-3 text-[10px] tracking-[0.16em]",
  md: "h-10 px-5 text-[11px] tracking-[0.18em]",
};

/**
 * Pill button per brand system — all-caps Söhne Halbfett, generous tracking.
 * Renders as an <a> when href is provided, otherwise <button>.
 */
export function Button(props: Props) {
  const {
    children,
    variant = "cream",
    size = "md",
    className = "",
  } = props;

  const classes = [
    "inline-flex items-center justify-center rounded-full uppercase",
    "font-semibold transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(" ");

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
