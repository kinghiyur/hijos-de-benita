import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { MediaPlaceholder } from "../../components/ui/MediaPlaceholder";
import { EyebrowLabel } from "../../components/ui/EyebrowLabel";
import { ShopGrid } from "../../components/shop/ShopGrid";

export const metadata = {
  title: "Shop — Los Hijos De Benita",
  description:
    "Order this week's bake. Seedless and Seeded sourdough, plus bread bags and cutting boards — all made with intention in Burlington, Ontario.",
};

export default function ShopPage() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col">

        {/* ── Page title ── */}
        <section className="pt-4 pb-10 px-6 md:px-10 lg:px-16">
          <EyebrowLabel>Shop</EyebrowLabel>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink">
            The Goods.
          </h1>
        </section>

        {/* ── Hero strip ── */}
        <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-20 relative">
          <div className="relative rounded-[14px] bg-paper border border-[0.3px] border-black/[0.13] p-[6px]">
            <MediaPlaceholder
              videoSrc="/videos/amanzando2.mp4"
              imageSrc="/posters/amanzando2.jpg"
              aspect="16/5"
              alt="Fresh sourdough loaves from Los Hijos De Benita"
              className="overflow-hidden rounded-[10px]"
            />

            {/* Benita badge — floating bottom-right corner of the card */}
            <div
              className="absolute bottom-8 right-8 h-24 w-24 md:h-32 md:w-32 opacity-90 animate-spin"
              style={{ animationDuration: "24s" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/benita-badge.svg"
                alt="Los Hijos De Benita"
                className="h-full w-full"
              />
            </div>
          </div>
        </section>

        {/* ── Pre-order notice ── */}
        <section className="px-6 md:px-10 lg:px-16 pb-10">
          <p className="text-[13px] text-ink/50 uppercase tracking-[0.15em]">
            Orders open every Wednesday &mdash; quantities are limited
          </p>
        </section>

        {/* ── Product grid ── */}
        <ShopGrid />

        {/* ── Closing strip ── */}
        <section className="px-6 md:px-10 lg:px-16 pt-10 pb-20 md:pb-28">
          <div className="rounded-[14px] bg-paper border border-[0.3px] border-black/[0.13] p-[6px]">
            <MediaPlaceholder
              videoSrc="/videos/details5.mp4"
              imageSrc="/posters/details5.jpg"
              aspect="16/5"
              alt="Sourdough crust detail"
              className="overflow-hidden rounded-[10px]"
            />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
