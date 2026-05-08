import { Wordmark } from "./Wordmark";

/**
 * Footer per the redesign — wide bread image strip pinned to the bottom
 * of the page, followed by the wordmark and a "made with <3" credit.
 */
export function Footer() {
  return (
    <footer className="mt-10 md:mt-16">
      {/* Image strip — full bleed within the page padding so it reads as a
          horizon line. Aspect is short and wide. */}
      <div className="px-6 md:px-10 lg:px-16">
        <div
          className="relative w-full overflow-hidden rounded-[14px]"
          style={{ aspectRatio: "16/3" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/breads/seedless.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-16">
        <div className="py-10 md:py-14">
          <Wordmark className="text-[12px] md:text-[13px]" />
          <p className="mt-6 text-[13px] text-ink/55">
            Made with &lt;3 in Ontario, Canada.
          </p>
        </div>
      </div>
    </footer>
  );
}
