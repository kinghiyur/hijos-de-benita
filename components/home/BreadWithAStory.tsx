import { Container } from "../ui/Container";

/**
 * Centered editorial intro — Poilane-style breathing room over a dark canvas.
 */
export function BreadWithAStory() {
  return (
    <section id="about" className="py-32 md:py-40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mx-auto max-w-2xl text-h2 font-semibold text-cream md:text-h1">
            A quiet bakery. A lot of intention.
          </h2>
          <p className="mt-6 text-body leading-[1.6] text-cream/70">
            We bake once a week. Small batches, real sourdough, pre-order only.
            Every loaf traces back to a single starter we&rsquo;ve been keeping alive for years. Her name is Benita.
          </p>
        </div>
      </Container>
    </section>
  );
}
