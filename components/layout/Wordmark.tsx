interface WordmarkProps {
  className?: string;
}

/**
 * "LOS HIJOS DE BENITA" wordmark.
 *
 * The wireframe uses a stencil/wood-type display face that wasn't shipped
 * with the brand fonts. Until the final logo asset (SVG) is dropped in,
 * we render with Söhne Fett uppercase, tight tracking, two-line stack —
 * matches the layout of the Figma comp and is a one-line swap when the
 * real wordmark arrives:
 *
 *   <Image src="/brand/wordmark.svg" alt="Los Hijos De Benita" ... />
 */
export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span
      className={`block font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-cream ${className}`}
      aria-label="Los Hijos De Benita"
    >
      <span className="block">Los Hijos</span>
      <span className="block">De Benita</span>
    </span>
  );
}
