import { motion } from "framer-motion";
import {
  ImageIcon,
  Palette,
  Video,
  Film,
  Zap,
  Code,
} from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Text-to-Image",
    description:
      "Generate stunning images from text descriptions using state-of-the-art AI models.",
  },
  {
    icon: Palette,
    title: "Image-to-Image",
    description:
      "Transform existing images with AI-powered style transfer and modifications.",
  },
  {
    icon: Video,
    title: "Image-to-Video",
    description:
      "Bring your images to life with smooth, cinematic video animations.",
  },
  {
    icon: Film,
    title: "Text-to-Video",
    description:
      "Create videos directly from text prompts with advanced AI generation.",
  },
  {
    icon: Zap,
    title: "Upscale & Enhance",
    description:
      "Enhance resolution and quality of any image with AI-powered upscaling.",
  },
  {
    icon: Code,
    title: "API for Developers",
    description:
      "Integrate AI generation into your apps with our powerful REST API.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Create</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools designed for creators, designers, and developers
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-glow p-6 lg:p-8 group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
