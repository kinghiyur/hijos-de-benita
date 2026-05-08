"use client";

import { useState } from "react";
import { EyebrowLabel } from "../ui/EyebrowLabel";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Orders open every Wednesday on the website. Choose your bread, complete checkout, and you're set for that week's bake. Quantities are limited — order early.",
  },
  {
    q: "When and where do I pick up?",
    a: "Pickup is Saturday in Burlington, Ontario. You'll receive the exact time window and address by email once your order is confirmed.",
  },
  {
    q: "What if I miss the Wednesday window?",
    a: "Orders close when we sell out or by end of day Friday. If you missed it, follow us to get notified when the next week opens.",
  },
  {
    q: "Is this real sourdough?",
    a: "Yes. Every loaf is made with our live starter — her name is Benita. No commercial yeast, no additives, no shortcuts.",
  },
  {
    q: "What are the ingredients?",
    a: "Flour, water, salt, and Benita. That's it.",
  },
  {
    q: "How long does the bread last?",
    a: "Best within 3 days. Store wrapped in a cloth or paper bag — never plastic. It also freezes well; slice before freezing.",
  },
  {
    q: "Do you deliver?",
    a: "Not yet. Pickup only for now in Burlington, Ontario.",
  },
  {
    q: "Do you accommodate allergies?",
    a: "Our breads contain gluten and are baked in a home kitchen. Not suitable for those with celiac disease or severe gluten intolerance.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6 md:px-10 lg:px-16 md:py-28">
      <EyebrowLabel>FAQ</EyebrowLabel>
      <h2 className="mt-3 text-[2rem] font-extrabold tracking-[-0.015em] text-ink md:text-[2.75rem]">
        Questions? We have answers.
      </h2>

      <div className="mt-10">
        {faqs.map((faq, i) => (
          <div key={i} className="border-t border-ink/10">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-[15px] font-semibold text-ink">{faq.q}</span>
              <span className="flex-shrink-0 text-ink/40 text-[20px] leading-none">
                {open === i ? "−" : "+"}
              </span>
            </button>

            {open === i && (
              <p className="pb-5 text-[13px] leading-[1.7] text-ink/55 max-w-2xl">
                {faq.a}
              </p>
            )}
          </div>
        ))}
        <div className="border-t border-ink/10" />
      </div>
    </section>
  );
}
