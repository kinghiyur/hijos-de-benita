"use client";

import { useRef } from "react";

interface MediaPlaceholderProps {
  videoSrc?: string;
  imageSrc?: string;
  aspect?: string;
  label?: string;
  className?: string;
  fit?: "cover" | "contain";
  alt?: string;
  /** If true, video is paused until hovered */
  hoverPlay?: boolean;
}

export function MediaPlaceholder({
  videoSrc,
  imageSrc,
  aspect = "16/9",
  label = "Picture",
  className = "",
  fit = "cover",
  alt = "",
  hoverPlay = false,
}: MediaPlaceholderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-ink/5 ${className}`}
      style={{ aspectRatio: aspect }}
      onMouseEnter={hoverPlay && videoSrc ? handleMouseEnter : undefined}
      onMouseLeave={hoverPlay && videoSrc ? handleMouseLeave : undefined}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          src={videoSrc}
          autoPlay={!hoverPlay}
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
          <span className="text-ink/30 text-sm">{label}</span>
        </div>
      )}
    </div>
  );
}
