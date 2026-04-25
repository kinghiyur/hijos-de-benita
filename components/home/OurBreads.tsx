import Link from "next/link";
import { Container } from "../ui/Container";
import { EyebrowLabel } from "../ui/EyebrowLabel";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

interface Bread {
  name: string;
  description: string;
  price: string;
  /** Drop /videos/<file>.mp4 for an autoplaying clip à la Human Race */
  videoSrc?: string;
  imageSrc?: string;
}

const breads: Bread[] = [
  {
    name: "Seedless",
    description: "Classic. Open Crumb, blistered crust.",
    price: "$12",
  },
  {
    name: "Seeded",
    description: "Same base, loaded with seeds.",
    price: "$12",
  },
];

export function OurBreads() {
  return (
    <section id="menu" className="py-20 md:py-28">
      <Container>
        <EyebrowLabel>Our Breads</EyebrowLabel>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-x-10">
          {breads.map((bread) => (
            <article key={bread.name} className="group">
              {/* Product floats on a near-page-bg block — Humanrace-style, the
                  image does the work, no card chrome competing with it. */}
              <MediaPlaceholder
                videoSrc={bread.videoSrc}
                imageSrc={bread.imageSrc}
                aspect="4/3"
                label="Picture"
                fit="contain"
                className="!bg-cream/[0.03]"
              />

              <div className="border-t border-cream/15 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-body font-medium text-cream">{bread.name}</h3>
                  <span className="text-small text-cream/60">{bread.price}</span>
                </div>
                <p className="mt-1 text-caption text-cream/55">{bread.description}</p>

                {/* Hidden until card hover or keyboard focus, à la Humanrace —
                    the product reads first, the buy action surfaces only when
                    intent is signaled. We keep it in the layout flow with
                    opacity so there's no jump on reveal. */}
                <Link
                  href="#order"
                  className="pointer-events-none mt-5 flex w-full items-center justify-between rounded-full border border-cream/25 px-5 py-3 text-small text-cream opacity-0 transition-[opacity,colors] duration-200 hover:border-cream hover:bg-cream hover:text-ink group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100"
                >
                  <span>Add to Bag</span>
                  <span aria-hidden className="text-base leading-none">+</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
