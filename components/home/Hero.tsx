import { Header } from "../layout/Header";
import { Button } from "../ui/Button";
import { CrossfadeMontage, type MontageClip } from "../ui/CrossfadeMontage";

// Hero montage — Human Race-style stacked clips, crossfaded into one another.
// Order paces the eye: water → kneading 2 → kneading → swirl → bread.
// benitawater opens the cycle and gets a shorter dwell so the montage doesn't
// linger on the same shot the user just saw on first paint.
const heroClips: MontageClip[] = [
  { src: "/videos/benitawater.mp4", poster: "/posters/benitawater.jpg", holdMs: 2500 },
  { src: "/videos/amanzando2.mp4", poster: "/posters/amanzando2.jpg" },
  { src: "/videos/amanzando.mp4", poster: "/posters/amanzando.jpg" },
  { src: "/videos/remolino.mp4", poster: "/posters/remolino.jpg" },
  { src: "/videos/pan.mp4", poster: "/posters/pan.jpg" },
];

export function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <Header />

      <div className="relative h-[100svh] min-h-[640px] w-full">
        <CrossfadeMontage clips={heroClips} holdMs={3800} fadeMs={1000} />

        {/* Subtle dark gradient for legibility of overlaid type */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/40"
        />

        <div className="absolute inset-x-0 top-[30%]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-5 px-6 md:px-10 lg:px-16">
            <h1 className="max-w-[18ch] text-[2.5rem] leading-[1.1] tracking-[-0.01em] font-semibold text-cream md:text-display">
              The kind of bread your abuela would respect.
            </h1>
            <Button href="#about" variant="outline" size="sm">
              Discover
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
