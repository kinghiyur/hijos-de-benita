import { EyebrowLabel } from "../ui/EyebrowLabel";

const steps = [
  {
    number: "01",
    title: "Pre-order online",
    description: "Every Wednesday we open orders for the week's bake. Pick your bread before we sell out.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4 L6 4 L9 18 L22 18" />
        <path d="M7 8 L23 8 L21 16 L9 16 Z" />
        <circle cx="11" cy="22" r="1.8" />
        <circle cx="20" cy="22" r="1.8" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We bake fresh",
    description: "Saturday morning. Small batches, real sourdough. Every loaf made to order — nothing sits on a shelf.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18 Q4 10 14 10 Q24 10 24 18 L24 22 L4 22 Z" />
        <path d="M8 15 Q14 12 20 15" />
        <path d="M9 18.5 Q14 16 19 18.5" opacity="0.5" />
        <path d="M10 7.5 Q9 5.5 10 3.5" opacity="0.45" />
        <path d="M14 6.5 Q13 4.5 14 2.5" opacity="0.45" />
        <path d="M18 7.5 Q17 5.5 18 3.5" opacity="0.45" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Pick up Saturday",
    description: "Collect at our door. Still warm.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18 Q5 15 8 15 L13 15 Q14 15 14 16 L14 20" />
        <path d="M23 18 Q23 15 20 15 L15 15 Q14 15 14 16 L14 20" />
        <path d="M5 18 Q5 22 9 23 L19 23 Q23 22 23 18" />
        <rect x="9" y="7" width="10" height="9" rx="2" />
        <path d="M9 11.5 L19 11.5" opacity="0.4" />
        <path d="M14 3 L14 6.5" opacity="0.5" />
        <path d="M12 5 L14 7 L16 5" opacity="0.5" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="px-6 md:px-10 lg:px-16">
        <EyebrowLabel>How it works</EyebrowLabel>
        <h2 className="mt-3 text-[2rem] font-extrabold tracking-[-0.015em] text-ink md:text-[2.75rem]">
          Fresh bread, every week.
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 px-6 md:gap-5 md:px-10 lg:px-16">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col">
            <div className="rounded-[14px] bg-paper border border-[0.3px] border-black/[0.13] p-[6px]">
              <div className="overflow-hidden rounded-[10px] bg-ink/[0.04] aspect-[4/3] flex items-center justify-center text-ink/50">
                {step.icon}
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-ink/30 uppercase">
                {step.number}
              </span>
              <h3 className="mt-2 text-[15px] font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-1 text-[12px] leading-[1.65] text-ink/55">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
