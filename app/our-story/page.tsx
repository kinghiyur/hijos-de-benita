import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { MediaPlaceholder } from "../../components/ui/MediaPlaceholder";
import { EyebrowLabel } from "../../components/ui/EyebrowLabel";

export const metadata = {
  title: "Our Story — Los Hijos De Benita",
  description:
    "The story of Benita, our sourdough starter, and the family that bakes with her every week in Burlington, Ontario.",
};

function FullBleedCard({
  videoSrc,
  imageSrc,
  aspect = "16/7",
  alt = "",
}: {
  videoSrc?: string;
  imageSrc?: string;
  aspect?: string;
  alt?: string;
}) {
  return (
    <div className="rounded-[14px] bg-paper border border-[0.3px] border-black/[0.13] p-[6px]">
      <MediaPlaceholder
        videoSrc={videoSrc}
        imageSrc={imageSrc}
        aspect={aspect}
        alt={alt}
        className="overflow-hidden rounded-[10px]"
      />
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col">

        {/* ── Hero ── */}
        <section className="pt-4 pb-16 md:pb-20 px-6 md:px-10 lg:px-16">
          <EyebrowLabel>Our Story</EyebrowLabel>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink max-w-2xl">
            A quiet bakery.<br />A lot of intention.
          </h1>

          <div className="mt-10">
            <FullBleedCard
              videoSrc="/videos/pan.mp4"
              imageSrc="/posters/pan.jpg"
              aspect="16/7"
              alt="Fresh sourdough loaves from Los Hijos De Benita"
            />
          </div>
        </section>

        {/* ── Opening statement ── */}
        <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
          <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.3] tracking-[-0.01em] text-ink max-w-3xl">
            &ldquo;We bake once a week. Small batches, real sourdough,
            pre-order only. Every loaf traces back to a single starter
            we&rsquo;ve been keeping alive for years. Her name is Benita.&rdquo;
          </p>
        </section>

        {/* ── Benita the starter ── */}
        <section className="py-6 md:py-10 px-6 md:px-10 lg:px-16">
          <FullBleedCard
            videoSrc="/videos/benitawater.mp4"
            imageSrc="/posters/benitawater.jpg"
            aspect="16/9"
            alt="Benita, our sourdough starter"
          />
          <div className="mt-10 max-w-xl">
            <EyebrowLabel>The Starter</EyebrowLabel>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.015em] text-ink md:text-[2.75rem]">
              Meet Benita.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.65] text-ink/70">
              Every loaf begins with her. Benita is our live sourdough
              starter — a colony of wild yeast and bacteria we&rsquo;ve been
              feeding, coaxing, and baking with for years. She is the reason
              our bread tastes the way it does.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-ink/70">
              No commercial yeast. No additives. No shortcuts.
              Just flour, water, salt, and Benita.
            </p>
          </div>
        </section>

        {/* ── Divider pull quote ── */}
        <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16">
          <p className="text-[clamp(1.25rem,2.5vw,1.875rem)] font-light leading-[1.4] text-ink/60 max-w-2xl">
            The kind of bread your abuela would respect. Made with the
            patience she taught us.
          </p>
        </section>

        {/* ── The process ── */}
        <section className="py-6 md:py-10 px-6 md:px-10 lg:px-16">
          <FullBleedCard
            videoSrc="/videos/amanzando.mp4"
            imageSrc="/posters/amanzando.jpg"
            aspect="16/9"
            alt="Shaping sourdough by hand"
          />
          <div className="mt-10 max-w-xl">
            <EyebrowLabel>The Process</EyebrowLabel>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.015em] text-ink md:text-[2.75rem]">
              Made to order.<br />Every week.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.65] text-ink/70">
              Orders open every Wednesday. We bake Saturday morning.
              You pick up Saturday afternoon. That&rsquo;s the whole system.
              Nothing sits on a shelf. Nothing is made ahead of time.
            </p>
            <p className="mt-4 text-[15px] leading-[1.65] text-ink/70">
              We keep the batches small on purpose. It&rsquo;s the only way
              to give every loaf the attention it deserves.
            </p>
          </div>
        </section>

        {/* ── Philosophy image ── */}
        <section className="py-6 md:py-10 px-6 md:px-10 lg:px-16">
          <FullBleedCard
            videoSrc="/videos/remolino.mp4"
            imageSrc="/posters/remolino.jpg"
            aspect="16/7"
            alt="Sourdough crumb and crust detail"
          />
        </section>

        {/* ── Philosophy text ── */}
        <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <EyebrowLabel>Why we do it this way</EyebrowLabel>
              <h2 className="mt-4 text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.015em] text-ink md:text-[2.25rem]">
                Real bread takes real time.
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[15px] leading-[1.65] text-ink/70">
                Industrial bread is engineered to be fast — fast to make,
                fast to sell, fast to go stale. We do the opposite. Long
                fermentation, slow rises, and a process that takes two
                full days from start to finish.
              </p>
              <p className="text-[15px] leading-[1.65] text-ink/70">
                The result is bread that&rsquo;s easier to digest, richer
                in flavour, and better for you. Not as a marketing claim —
                just as a fact of how fermentation works when you let it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Founder ── */}
        <section className="py-6 md:py-10 px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
            <FullBleedCard
              imageSrc="/posters/pan.jpg"
              aspect="4/5"
              alt="Demian Rebollo Von Duben, founder"
            />
            <div className="flex flex-col justify-center">
              <EyebrowLabel>The Baker</EyebrowLabel>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.015em] text-ink md:text-[2.5rem]">
                Demian Rebollo<br />Von Duben
              </h2>
              <p className="mt-6 text-[15px] leading-[1.65] text-ink/70">
                Demian started baking sourdough the way most people do —
                during a pandemic, with too much time and a YouTube rabbit
                hole. What began as a hobby became an obsession, and what
                became an obsession became a bakery.
              </p>
              <p className="mt-4 text-[15px] leading-[1.65] text-ink/70">
                He bakes out of Burlington, Ontario, with his family.
                Benita has been with him since the beginning.
              </p>
            </div>
          </div>
        </section>

        {/* ── Closing video ── */}
        <section className="py-6 pb-20 md:pb-28 px-6 md:px-10 lg:px-16">
          <FullBleedCard
            videoSrc="/videos/details2.mp4"
            imageSrc="/posters/details2.jpg"
            aspect="16/6"
            alt="Sourdough loaves ready for pickup"
          />
        </section>

      </main>

      <Footer />
    </>
  );
}
