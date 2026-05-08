"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../ui/Container";
import { EyebrowLabel } from "../ui/EyebrowLabel";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

// Placeholder copy — varied lengths so the deck doesn't feel like a uniform
// run of generic blurbs.
const testimonials: Testimonial[] = [
  {
    quote: "Best sourdough I've had outside of San Francisco.",
    name: "Customer Name",
    location: "Burlington, ON",
  },
  {
    quote:
      "Place holder text here saying how good the bread is blah blah blah blah blah blah blah blah.",
    name: "Customer Name",
    location: "Oakville, ON",
  },
  {
    quote: "Crust like glass. Crumb like a cloud.",
    name: "Customer Name",
    location: "Hamilton, ON",
  },
  {
    quote:
      "Saturday pickup is the highlight of my week now. The whole house smells like a bakery for hours.",
    name: "Customer Name",
    location: "Burlington, ON",
  },
  {
    quote: "Place holder text. Real one is coming.",
    name: "Customer Name",
    location: "Toronto, ON",
  },
  {
    quote:
      "Worth every minute of the drive. The seeded loaf changed how I think about toast.",
    name: "Customer Name",
    location: "Mississauga, ON",
  },
  {
    quote: "I'm never buying grocery-store bread again.",
    name: "Customer Name",
    location: "Burlington, ON",
  },
  {
    quote:
      "You can taste that someone actually cared. That's hard to find these days.",
    name: "Customer Name",
    location: "Waterdown, ON",
  },
  {
    quote: "Tangy, chewy, perfect.",
    name: "Customer Name",
    location: "Oakville, ON",
  },
  {
    quote:
      "My abuela called it the closest thing to her own bread back home. That's the highest compliment I can give.",
    name: "Customer Name",
    location: "Toronto, ON",
  },
];

const noteVariants = [
  { paper: "bg-cream", ink: "text-bark" },
  { paper: "bg-wheat", ink: "text-bark" },
];

const ADVANCE_MS = 3500;

// Visual stack depth — only this many notes peek out behind the active one.
// Anything deeper is rendered fully transparent (still in DOM so transitions
// run when it cycles up).
const STACK_DEPTH = 3;

// Min horizontal delta (in CSS px) to count as a swipe-advance gesture, plus
// the cooldown between gestures so a single Mac trackpad two-finger flick
// only advances one card.
const SWIPE_THRESHOLD = 24;
const SWIPE_COOLDOWN_MS = 350;

/**
 * Stack-of-post-its testimonials. One note is active at the front, two peek
 * out behind it for depth, and the deck auto-advances every ADVANCE_MS.
 *
 *  - Two-finger horizontal swipe on a Mac trackpad scrolls through the deck.
 *  - Click anywhere on the stack to advance manually.
 *  - Hover pauses auto-advance so you can read a long quote.
 *  - prefers-reduced-motion holds the first note, no auto-cycle.
 *
 * Implementation: every note is rendered absolutely in the same slot. Each
 * card's transform is computed from its offset from `active` — front, behind
 * 1, behind 2, leaving (just got dismissed), or hidden. Tailwind's
 * `transition` shorthand animates rotate / scale / translate / opacity, so
 * the offset change between renders looks like the card sliding through the
 * deck.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Cooldown bookkeeping for the wheel handler — refs not state so we don't
  // re-render the whole stack on every wheel tick.
  const lastSwipeRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const goNext = () =>
    setActive((prev) => (prev + 1) % testimonials.length);
  const goPrev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  /**
   * Trackpad two-finger horizontal swipe → advance/retreat. Attached as a
   * native (non-passive) listener so we can preventDefault — otherwise
   * Safari/Chrome can hijack the gesture for back-navigation on the History
   * stack. We accumulate deltaX across consecutive events so a slow drag
   * still counts once it crosses the threshold, then apply a cooldown so a
   * fast flick that fires many wheel events in a row still only moves one
   * card.
   *
   * Vertical-dominant gestures fall through (no preventDefault) so the user
   * can still scroll the page when their swipe is mostly up/down.
   */
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastSwipeRef.current < SWIPE_COOLDOWN_MS) return;

      wheelAccumRef.current += e.deltaX;
      if (Math.abs(wheelAccumRef.current) >= SWIPE_THRESHOLD) {
        // Capture direction *before* resetting the ref. setActive's updater
        // runs after this synchronous block, so reading the ref inside the
        // updater would always see 0 (closure-over-ref pitfall).
        const dir = wheelAccumRef.current > 0 ? 1 : -1;
        lastSwipeRef.current = now;
        wheelAccumRef.current = 0;
        setActive((prev) =>
          (prev + dir + testimonials.length) % testimonials.length,
        );
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <EyebrowLabel>Testimonials</EyebrowLabel>

        <div
          ref={stackRef}
          className="relative mx-auto mt-16 aspect-[5/6] w-full max-w-sm cursor-pointer select-none touch-pan-y"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={goNext}
          role="button"
          tabIndex={0}
          aria-label="Next testimonial"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goNext();
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              goPrev();
            }
          }}
        >
          {testimonials.map((t, i) => {
            const offset =
              (i - active + testimonials.length) % testimonials.length;
            const v = noteVariants[i % noteVariants.length];

            // Per-offset transform/opacity. "leaving" is the slot a card
            // lands in just after it was the active one — animates up and
            // out so the dismissal reads. Anything beyond that is held in a
            // hidden state behind the deck.
            let rotate = 0;
            let translateY = 0;
            let scale = 1;
            let opacity = 0;

            if (offset === 0) {
              rotate = 0;
              translateY = 0;
              scale = 1;
              opacity = 1;
            } else if (offset === 1) {
              rotate = 3;
              translateY = 10;
              scale = 0.96;
              opacity = 0.85;
            } else if (offset === 2) {
              rotate = -2;
              translateY = 18;
              scale = 0.92;
              opacity = 0.55;
            } else if (offset === testimonials.length - 1) {
              // The note that was active on the previous tick — fly it up
              // and out so the swap reads as a dismissal.
              rotate = -10;
              translateY = -60;
              scale = 0.96;
              opacity = 0;
            } else {
              // Deeper behind the deck — held in place hidden so it can
              // transition into offset 2 next cycle.
              rotate = 0;
              translateY = 24;
              scale = 0.9;
              opacity = 0;
            }

            const isFront = offset === 0;

            return (
              <article
                key={i}
                aria-hidden={!isFront}
                className={`absolute inset-0 flex flex-col px-7 py-9 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition duration-700 ease-out ${v.paper} ${v.ink}`}
                style={{
                  zIndex:
                    offset < STACK_DEPTH ? STACK_DEPTH - offset : 0,
                  transform: `rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`,
                  opacity,
                }}
              >
                {/* Pin dot, only on the active card so behind-cards stay
                    visually quiet. */}
                {isFront && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bark shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  />
                )}

                <p className="text-body leading-[1.55]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto pt-6">
                  <p className="text-small font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-caption text-bark/65">
                    {t.location}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Progress indicators — small dots, current one filled. Click to
            jump to a specific note. */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-cream"
                  : "w-1.5 bg-cream/30 hover:bg-cream/60"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
