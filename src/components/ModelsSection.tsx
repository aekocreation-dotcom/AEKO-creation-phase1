import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Star, Sparkles, Clock } from "lucide-react";

const models = [
  {
    name: "Stable Diffusion XL",
    description: "High-quality image generation with exceptional detail",
    tags: ["Fast", "Realistic"],
    featured: false,
  },
  {
    name: "FLUX Pro",
    description: "Next-gen model for stunning photorealistic outputs",
    tags: ["Photorealistic", "Premium"],
    featured: true,
  },
  {
    name: "Anime Diffusion",
    description: "Perfect for anime and manga-style illustrations",
    tags: ["Anime", "Fast"],
    featured: false,
  },
  {
    name: "Creative Mix",
    description: "Artistic and creative interpretations of prompts",
    tags: ["Artistic", "Creative"],
    featured: false,
  },
  {
    name: "Cinematic AI",
    description: "Film-quality visuals with dramatic lighting",
    tags: ["Cinematic", "Premium"],
    featured: true,
  },
  {
    name: "Portrait Master",
    description: "Specialized in photorealistic human portraits",
    tags: ["Portraits", "Realistic"],
    featured: false,
  },
];

const tagIcons: Record<string, typeof Zap> = {
  Fast: Zap,
  Premium: Star,
  Photorealistic: Sparkles,
  Cinematic: Clock,
};

const ModelsSection = () => {
  return (
    <section id="models" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

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
            Powered by <span className="gradient-text">50+ AI Models</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access the world's best AI models for image and video generation
          </p>
        </motion.div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card-glow p-6 relative overflow-hidden group ${
                model.featured ? "ring-1 ring-primary/50" : ""
              }`}
            >
              {/* Featured badge */}
              {model.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full">
                    Featured
                  </span>
                </div>
              )}

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {model.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {model.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {model.tags.map((tag) => {
                  const Icon = tagIcons[tag] || Sparkles;
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-secondary/50 text-muted-foreground rounded-md border border-border/50"
                    >
                      <Icon className="w-3 h-3" />
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Try button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:border-primary/50 transition-colors"
              >
                Try Model
              </Button>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="glass" size="lg">
            View All Models
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ModelsSection;
