import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out AEKO",
    features: [
      "50 generations/month",
      "Standard resolution",
      "Community models",
      "Basic support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Creator",
    price: "$19",
    period: "/month",
    description: "For content creators and designers",
    features: [
      "500 generations/month",
      "HD resolution",
      "All AI models",
      "Priority support",
      "Commercial license",
      "API access",
    ],
    cta: "Start Creating",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For teams and power users",
    features: [
      "Unlimited generations",
      "4K resolution",
      "All AI models + beta",
      "24/7 Priority support",
      "Commercial license",
      "Full API access",
      "Team collaboration",
    ],
    cta: "Go Pro",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

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
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more power
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                plan.highlighted
                  ? "glass-card border-primary/50 ring-1 ring-primary/30"
                  : "glass-card"
              }`}
            >
              {/* Highlighted badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? "hero" : "outline"}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
