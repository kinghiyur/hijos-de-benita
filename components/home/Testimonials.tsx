import { Container } from "../ui/Container";
import { EyebrowLabel } from "../ui/EyebrowLabel";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Place holder text here saying how good the bread is blah blah blah",
    name: "Customer Name",
    location: "Burlington, ON",
  },
  {
    quote: "Place holder text here saying how good the bread is blah blah blah",
    name: "Customer Name",
    location: "Oakville, ON",
  },
  {
    quote: "Place holder text here saying how good the bread is blah blah blah",
    name: "Customer Name",
    location: "Hamilton, ON",
  },
];

/**
 * Horizontal scroll on mobile, 2-up on md, 3-up on lg.
 * The wireframe hints at overflow-style cards extending past the viewport.
 */
export function Testimonials() {
  return (
    <section className="border-t border-cream/10 py-20 md:py-28">
      <Container>
        <EyebrowLabel>Testimonials</EyebrowLabel>

        <div className="mt-8 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <ul className="flex gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <li
                key={i}
                className="min-w-[280px] flex-1 rounded-md bg-bark/40 p-7 md:min-w-0"
              >
                <p className="text-[14px] leading-[1.55] text-cream/75">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8">
                  <p className="text-[14px] font-semibold text-cream">{t.name}</p>
                  <p className="mt-1 text-[12px] text-cream/50">{t.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
