"use client";

import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { AddToBagButton } from "../cart/AddToBagButton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  videoSrc?: string;
  imageSrc?: string;
  hoverPlay?: boolean;
  badge?: string;
}

const products: Product[] = [
  {
    id: "seedless",
    name: "Seedless Sourdough",
    description:
      "Our classic. Open crumb, blistered crust, deeply tangy. Made with just flour, water, salt, and Benita.",
    price: 12,
    videoSrc: "/videos/benita1.mp4",
    imageSrc: "/posters/benita1.jpg",
    hoverPlay: true,
    badge: "Best seller",
  },
  {
    id: "seeded",
    name: "Seeded Sourdough",
    description:
      "Everything the seedless is, plus a seed crust that adds crunch and a deep, nutty aroma.",
    price: 12,
    imageSrc: "/images/breads/seeded.jpg",
  },
  {
    id: "cutting-board",
    name: "Cutting Board",
    description:
      "Handcrafted end-grain board. Big enough for a full loaf, beautiful enough to leave on the counter.",
    price: 45,
  },
  {
    id: "bread-bag",
    name: "Bread Bag",
    description:
      "Custom branded linen bag. Keeps your loaf fresh longer than plastic ever could.",
    price: 8,
  },
];

function formatPrice(price: number) {
  return `$${price}`;
}

export function ShopGrid() {
  return (
    <section className="px-6 md:px-10 lg:px-16 pb-10">
      <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-2">
        {products.map((product) => (
          <article key={product.id} className="flex flex-col">
            {/* Card */}
            <div className="relative rounded-[14px] bg-paper border border-[0.3px] border-black/[0.13] p-[6px]">
              <MediaPlaceholder
                videoSrc={product.videoSrc}
                imageSrc={product.imageSrc}
                aspect="4/3"
                alt={product.name}
                fit="cover"
                hoverPlay={product.hoverPlay}
                className="overflow-hidden rounded-[10px] bg-ink/[0.04]"
              />

              {/* Badge label */}
              {product.badge && (
                <span className="absolute top-4 left-4 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-paper">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info below card */}
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[16px] font-semibold text-ink">
                  {product.name}
                </h2>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-ink/55 max-w-xs">
                  {product.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-[15px] font-semibold text-ink">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="mt-4">
              <AddToBagButton
                item={{ id: product.id, name: product.name, price: product.price }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
