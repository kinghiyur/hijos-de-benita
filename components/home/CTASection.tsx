import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function CTASection() {
  return (
    <section id="order" className="py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.875rem,3.4vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.015em] text-cream">
            Ready to taste the difference
          </h2>
          <p className="mt-4 text-[15px] text-cream/65">
            Order this week&apos;s bake before spots fill up
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="#order-form" variant="cream" size="md">
              Order Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
