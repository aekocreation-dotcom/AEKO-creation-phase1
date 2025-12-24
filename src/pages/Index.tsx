import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AskMeAnythingSection from "@/components/AskMeAnythingSection";
import PlaygroundSection from "@/components/PlaygroundSection";
import EveryCreatorSection from "@/components/EveryCreatorSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AskMeAnythingSection />
      <PlaygroundSection />
      <EveryCreatorSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
