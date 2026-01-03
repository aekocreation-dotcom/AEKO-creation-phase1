import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CreateAgentSection from "@/components/CreateAgentSection";
import AllModelsSection from "@/components/AllModelsSection";
import AIToolsSection from "@/components/AIToolsSection";
import LLMAgentFeaturesSection from "@/components/LLMAgentFeaturesSection";
import ImageToolsFeaturesSection from "@/components/ImageToolsFeaturesSection";
import VideoToolsFeaturesSection from "@/components/VideoToolsFeaturesSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: 'hsl(210, 20%, 98%)', color: 'hsl(222, 47%, 11%)' }}>
      <Navbar />
      <div style={{ maxWidth: '90vw', margin: '0 auto', width: '100%' }}>
        <HeroSection />
        <CreateAgentSection />
        <AllModelsSection />
        <AIToolsSection />
        <LLMAgentFeaturesSection />
        <ImageToolsFeaturesSection />
        <VideoToolsFeaturesSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
