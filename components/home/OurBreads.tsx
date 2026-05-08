"use client";

import { useState } from "react";
import { EyebrowLabel } from "../ui/EyebrowLabel";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { Button } from "../ui/Button";
import { AddToBagButton } from "../cart/AddToBagButton";

interface Bread {
  id: string;
  name: string;
  description: string;
  price: number;
  videoSrc?: string;
  imageSrc?: string;
  hoverPlay?: boolean;
}

const pages: Bread[][] = [
  [
    {
      id: "seedless",
      name: "Seedless",
      description: "Classic. Open Crumb. Blistered Crust",
      price: 12,
      videoSrc: "/videos/benita1.mp4",
      imageSrc: "/posters/benita1.jpg",
      hoverPlay: true,
    },
    {
      id: "seeded",
      name: "Seeded",
      description: "Nutty. Open Crumb. Seeded Crust",
      price: 12,
      imageSrc: "/images/breads/seeded.jpg",
    },
    { id: "cutting-board", name: "Cutting Board", description: "Handcrafted. End Grain. Made to Last.", price: 45 },
    { id: "bread-bag", name: "Bread Bag", description: "Custom Branded. Keeps Bread Fresh.", price: 8 },
  ],
];

export function OurBreads() {
  const [page, setPage] = useState(0);
  const currentBreads = pages[page];
  const isFirst = page === 0;
  const isLast = page === pages.length - 1;

  return (
    <section id="menu" className="py-20 px-6 md:px-10 lg:px-16 md:py-24">
        <EyebrowLabel>Products</EyebrowLabel>

        <div className="mt-3 flex items-end justify-between gap-6">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.015em] text-ink md:text-[2.75rem]">
            Our Breads.
          </h2>

          <div className="flex items-center gap-2">
            <CarouselButton direction="prev" disabled={isFirst} onClick={() => setPage((p) => p - 1)} />
            <CarouselButton direction="next" disabled={isLast} onClick={() => setPage((p) => p + 1)} />
            <Button href="#menu" variant="cream" size="sm" className="ml-1">
              See All
            </Button>
          </div>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto md:gap-5 -mr-6 md:-mr-10 lg:-mr-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {currentBreads.map((bread) => (
            <article key={bread.id} className="flex flex-col flex-shrink-0 w-[80vw] md:w-[45%] lg:w-[27%]">
              <div className="rounded-[14px] bg-paper border border-[0.3px] border-black/[0.13] p-[6px]">
                <MediaPlaceholder
                  videoSrc={bread.videoSrc}
                  imageSrc={bread.imageSrc}
                  aspect="4/3"
                  label=""
                  fit="cover"
                  hoverPlay={bread.hoverPlay}
                  className="overflow-hidden rounded-[10px] bg-ink/8"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-[15px] font-semibold text-ink">{bread.name}</h3>
                <p className="mt-1 text-[12px] text-ink/55">{bread.description}</p>
                <div className="mt-3">
                  <AddToBagButton item={{ id: bread.id, name: bread.name, price: bread.price }} />
                </div>
              </div>
            </article>
          ))}
        </div>
    </section>
  );
}

interface CarouselButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function CarouselButton({ direction, disabled, onClick }: CarouselButtonProps) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "Previous breads" : "Next breads"}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        style={{ transform: isPrev ? "scaleX(-1)" : undefined }}
      >
        <path d="M2 7h10M8 3l4 4-4 4" />
      </svg>
    </button>
  );
}
