"use client";

import { useEffect, useRef, useState } from "react";

export interface MontageClip {
  /** Path to web-ready MP4 in /public, e.g. "/videos/amanzando2.mp4" */
  src: string;
  /** Optional poster JPG for first paint, e.g. "/posters/amanzando2.jpg" */
  poster?: string;
  /** Optional per-clip hold override (ms). Falls back to component-level holdMs. */
  holdMs?: number;
}

interface CrossfadeMontageProps {
  clips: MontageClip[];
  /**
   * How long each clip "owns" the screen before the next clip's setActive fires, ms.
   * Must satisfy holdMs + fadeMs <= clip natural duration to avoid a visible loop.
   * Default 4000ms pairs with 1000ms fade for 5s-encoded clips.
   */
  holdMs?: number;
  /** Crossfade duration, ms (default 1000) */
  fadeMs?: number;
  /** Object-fit override; defaults to cover */
  fit?: "cover" | "contain";
  className?: string;
}

/**
 * Stacks N muted videos absolutely and crossfades through them on a timer.
 * Inspired by humanrace.com — a quiet, continuous montage that anchors the page.
 *
 * Lifecycle (per clip turn):
 *  1. The clip is pre-rolled `fadeMs + 100ms` BEFORE it becomes active so it has
 *     buffer/decode runway. Pre-roll seeks to 0 and starts playback.
 *  2. setActive fires, CSS opacity transitions handle the crossfade.
 *  3. After fade-out completes (`fadeMs + 50ms` after a clip stops being active),
 *     the clip is paused and rewound to 0, ready for its next turn.
 *
 *  - `loop` is intentionally NOT set on the videos. With `holdMs + fadeMs ≤
 *    clip duration`, each clip plays through cleanly without a visible wrap-around.
 *  - The active branch never touches currentTime — pre-roll owns the seek.
 *    (Previously this caused a backward jump as clips faded in.)
 *  - Honors `prefers-reduced-motion`: holds the first clip, no cycling.
 */
export function CrossfadeMontage({
  clips,
  holdMs = 4000,
  fadeMs = 1000,
  fit = "cover",
  className = "",
}: CrossfadeMontageProps) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (clips.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const current = videoRefs.current[active];

    // Kick off the active clip if it isn't running yet (covers initial mount and
    // any race where pre-roll hasn't fired). Subsequent activations rely on
    // pre-roll having already started playback so we don't disturb currentTime.
    if (current && current.paused) {
      current.play().catch(() => {
        /* autoplay may need a user gesture; the poster will hold until then */
      });
    }

    if (reduce || clips.length === 1) {
      isFirstRun.current = false;
      return;
    }

    const next = (active + 1) % clips.length;
    const prev = (active - 1 + clips.length) % clips.length;
    const activeHold = clips[active]?.holdMs ?? holdMs;

    // Pre-roll the next clip a hair before the crossfade kicks in so it's
    // already producing frames when its opacity hits 1.
    const prerollMs = Math.max(0, activeHold - fadeMs - 100);
    const prerollT = setTimeout(() => {
      const nextEl = videoRefs.current[next];
      if (nextEl) {
        nextEl.currentTime = 0;
        nextEl.play().catch(() => {});
      }
    }, prerollMs);

    const advanceT = setTimeout(() => setActive(next), activeHold);

    // Once the previously-active clip has finished fading out, pause and rewind
    // it so it's clean for the next time around the carousel. Skip on the very
    // first mount (no clip was previously playing).
    let cleanupT: ReturnType<typeof setTimeout> | undefined;
    if (!isFirstRun.current) {
      cleanupT = setTimeout(() => {
        const prevEl = videoRefs.current[prev];
        if (prevEl) {
          prevEl.pause();
          prevEl.currentTime = 0;
        }
      }, fadeMs + 50);
    }

    isFirstRun.current = false;

    return () => {
      clearTimeout(prerollT);
      clearTimeout(advanceT);
      if (cleanupT) clearTimeout(cleanupT);
    };
  }, [active, clips, holdMs, fadeMs]);

  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  return (
    <div className={`absolute inset-0 ${className}`}>
      {clips.map((clip, i) => (
        <video
          key={clip.src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={clip.src}
          poster={clip.poster}
          // Only the first clip autoplays on mount; mobile Safari treats the
          // attribute as a stronger signal than a programmatic play() and is
          // more reliable for first-frame paint. Subsequent clips are kicked
          // off by the pre-roll timer in the effect above.
          autoPlay={i === 0}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          style={{
            opacity: i === active ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
