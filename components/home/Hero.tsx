import { CrossfadeMontage, type MontageClip } from "../ui/CrossfadeMontage";

// Hero montage — keeps the existing video loop running inside the new
// contained banner. Order: water → kneading 2 → kneading → swirl → bread.
// First clip gets a shorter dwell so first paint doesn't linger.
const heroClips: MontageClip[] = [
  { src: "/videos/pan.mp4", poster: "/posters/pan.jpg", holdMs: 2500 },
  { src: "/videos/amanzando2.mp4", poster: "/posters/amanzando2.jpg" },
  { src: "/videos/amanzando.mp4", poster: "/posters/amanzando.jpg" },
  { src: "/videos/remolino.mp4", poster: "/posters/remolino.jpg" },
  { src: "/videos/benitawater.mp4", poster: "/posters/benitawater.jpg" },
];

/**
 * Contained banner hero — rounded rectangle with the video montage filling
 * it, white headline anchored bottom-left over a gradient. Sits in normal
 * page flow below the Header (no longer full-viewport).
 */
export function Hero() {
  return (
    <section className="px-6 md:px-10 lg:px-16">
      <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[20px] bg-ink">
        <CrossfadeMontage clips={heroClips} holdMs={3800} fadeMs={1000} />

        {/* Bottom-left dark gradient anchors the headline against busy
            footage without darkening the whole frame. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/75 via-ink/20 to-transparent"
        />

        <h1 className="absolute bottom-6 left-6 max-w-[20ch] text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.01em] text-paper md:bottom-10 md:left-10 md:text-[3rem] lg:bottom-12 lg:left-12 lg:text-[3.5rem]">
          The kind of bread,
          <br />
          your Abuela would respect.
        </h1>
      </div>
    </section>
  );
}
