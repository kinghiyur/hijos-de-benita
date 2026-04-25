interface MediaPlaceholderProps {
  /** Optional video src — if provided, renders an autoplaying muted loop */
  videoSrc?: string;
  /** Optional poster/still image src */
  imageSrc?: string;
  /** Aspect ratio CSS, e.g. "16/9", "4/5", "1/1" */
  aspect?: string;
  /** Label shown on the placeholder block when no media is provided */
  label?: string;
  /** Tailwind classes for additional sizing/positioning */
  className?: string;
  /** Object-fit override; defaults to cover */
  fit?: "cover" | "contain";
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Drop-in slot for hero footage and bread cards.
 *
 * Swap-in workflow:
 *   <MediaPlaceholder videoSrc="/videos/hero.mp4" imageSrc="/images/hero.jpg" />
 *
 * - With `videoSrc`: renders <video autoplay muted loop playsInline> — Human Race style
 * - With only `imageSrc`: renders a still image
 * - With neither: renders a labeled dark block so the layout reads at wireframe stage
 */
export function MediaPlaceholder({
  videoSrc,
  imageSrc,
  aspect = "16/9",
  label = "Picture",
  className = "",
  fit = "cover",
  alt = "",
}: MediaPlaceholderProps) {
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  return (
    <div
      className={`relative w-full overflow-hidden bg-bark/60 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {videoSrc ? (
        <video
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          poster={imageSrc}
          aria-label={alt}
        />
      ) : imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cream/30 text-sm">{label}</span>
        </div>
      )}
    </div>
  );
}
