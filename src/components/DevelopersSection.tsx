import { motion } from "framer-motion";
import { Terminal, Zap, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const DevelopersSection = () => {
  const codeSnippet = `const response = await fetch('https://api.aeko.ai/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'flux-pro',
    prompt: 'A futuristic city at sunset',
    size: '1024x1024'
  })
});

const { image_url } = await response.json();`;

  return (
    <section id="developers" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Built for Creators.{" "}
              <span className="gradient-text">Loved by Developers.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Integrate AI generation into your applications with our powerful
              REST API. Fast inference, simple authentication, and scalable
              infrastructure.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Terminal, text: "REST API" },
                { icon: Zap, text: "Fast Inference" },
                { icon: Server, text: "99.9% Uptime" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg">
                View API Docs
              </Button>
              <Button variant="outline" size="lg">
                Get API Key
              </Button>
            </div>
          </motion.div>

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">
                  api-example.js
                </span>
              </div>

              {/* Code content */}
              <div className="p-4 lg:p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                  <code className="text-muted-foreground">
                    {codeSnippet.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="select-none text-muted-foreground/40 mr-4 w-6 text-right">
                          {i + 1}
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /(const|await|fetch)/g,
                                '<span class="text-accent">$1</span>'
                              )
                              .replace(
                                /('.*?')/g,
                                '<span class="text-green-400">$1</span>'
                              )
                              .replace(
                                /(method|headers|body|model|prompt|size)/g,
                                '<span class="text-primary">$1</span>'
                              ),
                          }}
                        />
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DevelopersSection;
