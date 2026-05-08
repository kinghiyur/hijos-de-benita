import { Header } from "../components/layout/Header";
import { Hero } from "../components/home/Hero";
import { OurBreads } from "../components/home/OurBreads";
import { HowItWorks } from "../components/home/HowItWorks";
import { BreadWithAStory } from "../components/home/BreadWithAStory";
import { Testimonials } from "../components/home/Testimonials";
import { Faq } from "../components/home/Faq";
import { CTASection } from "../components/home/CTASection";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <OurBreads />
        <HowItWorks />
        <BreadWithAStory />
        <Testimonials />
        <Faq />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
