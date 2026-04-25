import { Hero } from "../components/home/Hero";
import { BreadWithAStory } from "../components/home/BreadWithAStory";
import { OurBreads } from "../components/home/OurBreads";
import { HowItWorks } from "../components/home/HowItWorks";
import { Testimonials } from "../components/home/Testimonials";
import { CTASection } from "../components/home/CTASection";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <BreadWithAStory />
        <OurBreads />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
