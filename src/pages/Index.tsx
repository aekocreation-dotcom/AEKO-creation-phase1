import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ModelsSection from "@/components/ModelsSection";
import UseCasesSection from "@/components/UseCasesSection";
import DevelopersSection from "@/components/DevelopersSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ModelsSection />
      <UseCasesSection />
      <DevelopersSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
