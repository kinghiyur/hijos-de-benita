import { Container } from "../ui/Container";
import { EyebrowLabel } from "../ui/EyebrowLabel";

interface Step {
  number: string;
  title: string;
  detail: string;
}

const steps: Step[] = [
  { number: "01", title: "Browse", detail: "See what's baking this week" },
  { number: "02", title: "Order", detail: "By Wednesday midnight" },
  { number: "03", title: "We bake", detail: "By Wednesday midnight" },
  { number: "04", title: "Pickup", detail: "Saturday, still warm" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <Container>
        <EyebrowLabel>How it Works</EyebrowLabel>

        <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-md bg-bark/40 p-6 md:p-7"
            >
              <p className="text-[13px] font-semibold tracking-[0.04em] text-cream/40">
                {step.number}
              </p>
              <p className="mt-8 text-[16px] font-semibold text-cream">{step.title}</p>
              <p className="mt-1 text-[13px] text-cream/55">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
