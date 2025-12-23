import { motion } from "framer-motion";
import {
  Youtube,
  Instagram,
  ShoppingBag,
  Paintbrush,
  Users,
  Megaphone,
} from "lucide-react";

const useCases = [
  {
    icon: Youtube,
    title: "YouTube Thumbnails",
    description: "Eye-catching thumbnails that boost click-through rates",
  },
  {
    icon: Instagram,
    title: "Instagram Reels",
    description: "Stunning visuals for social media content",
  },
  {
    icon: ShoppingBag,
    title: "Product Mockups",
    description: "Professional product visuals without a photoshoot",
  },
  {
    icon: Paintbrush,
    title: "Concept Art",
    description: "Rapid visualization of creative ideas",
  },
  {
    icon: Users,
    title: "AI Avatars",
    description: "Unique profile pictures and digital personas",
  },
  {
    icon: Megaphone,
    title: "Marketing Creatives",
    description: "Ad visuals and campaign assets at scale",
  },
];

const UseCasesSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built for <span className="gradient-text">Every Creator</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From content creators to marketers, AEKO powers visual creation
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card-glow p-4 lg:p-6 text-center group cursor-pointer"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                {useCase.title}
              </h3>
              <p className="text-xs text-muted-foreground hidden lg:block">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
