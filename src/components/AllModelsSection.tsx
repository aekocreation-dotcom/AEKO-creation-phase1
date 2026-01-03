import { motion } from "framer-motion";
import { Video, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AllModelsSection = () => {
  const videoModels = [
    "Pollo 2.5",
    "Veo 3",
    "Sora 2",
    "Kling AI",
    "Hailuo AI",
    "PixVerse AI",
    "Runway",
    "Vidu AI",
    "Luma AI",
    "Pika AI",
    "Seedance",
    "Wan AI",
    "Hunyuan",
  ];

  const imageModels = [
    "Nano Banana",
    "Midjourney",
    "Recraft",
    "Ideogram",
    "Stable Diffusion",
    "Flux AI",
    "Seedream",
    "Dall-E",
    "Imagen",
    "GPT-4o",
    "Flux Kontext",
    "Qwen Image",
    "Wan AI",
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            ALL the Great AI Video & Image Models in ONE Place!
          </h2>
        </motion.div>

        {/* Two Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* AI Video Generators Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 lg:p-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                AI Video Generators
              </h3>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              With AEKO AI video generator, you can tap into our flagship AEKO 1.6 video model and all top-tier video models in the industry, like:
            </p>

            {/* Model List */}
            <div className="space-y-3 mb-8">
              <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/80">
                {videoModels.slice(0, 8).map((model, index) => (
                  <span key={model} className="flex items-center">
                    {index > 0 && <span className="text-muted-foreground/50 mx-2">|</span>}
                    <span>{model}</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/80">
                {videoModels.slice(8).map((model, index) => (
                  <span key={model} className="flex items-center">
                    {index > 0 && <span className="text-muted-foreground/50 mx-2">|</span>}
                    <span>{model}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Button */}
            <Link to="/dashboard/tools/video">
              <Button
                variant="hero"
                size="lg"
                className="w-full group gap-2 px-8 py-6 text-lg"
              >
                AI Video Generator
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* AI Image Generators Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 lg:p-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                AI Image Generators
              </h3>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              AEKO AI image generator also allows you to choose from a selection of leading image models. They include:
            </p>

            {/* Model List */}
            <div className="space-y-3 mb-8">
              <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/80">
                {imageModels.slice(0, 7).map((model, index) => (
                  <span key={model} className="flex items-center">
                    {index > 0 && <span className="text-muted-foreground/50 mx-2">|</span>}
                    <span>{model}</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/80">
                {imageModels.slice(7).map((model, index) => (
                  <span key={model} className="flex items-center">
                    {index > 0 && <span className="text-muted-foreground/50 mx-2">|</span>}
                    <span>{model}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Button */}
            <Link to="/dashboard/tools/image">
              <Button
                variant="hero"
                size="lg"
                className="w-full group gap-2 px-8 py-6 text-lg"
              >
                AI Image Generator
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AllModelsSection;






