import { Container } from "../ui/Container";
import { EyebrowLabel } from "../ui/EyebrowLabel";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

/**
 * "Our Mission" — two-column editorial block.
 *
 *  Left:  eyebrow, two-line headline, supporting paragraph, signature.
 *  Right: rounded portrait-style image (placeholder until Ruy's shoot).
 */
export function BreadWithAStory() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* Left column — copy */}
          <div>
            <EyebrowLabel>Our Mission</EyebrowLabel>

            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.015em] text-ink md:text-[2.75rem]">
              A quiet bakery.
              <br />
              A lot of intention.
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-[1.6] text-ink/70">
              We bake once a week. Small batches, real sourdough, pre-order
              only. Every loaf traces back to a single starter we&rsquo;ve been
              keeping alive for years.
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-[1.6] text-ink">
              Her name is <span className="font-semibold">Benita</span>.
            </p>
          </div>

          {/* Right column — image */}
          <div className="rounded-[14px] bg-paper border border-[0.3px] border-black/[0.13] p-[6px]">
            <MediaPlaceholder
              imageSrc="/posters/pan.jpg"
              aspect="4/5"
              fit="cover"
              alt="Hands holding a paper bag from Los Hijos De Benita"
              className="overflow-hidden rounded-[10px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
