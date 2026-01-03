import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Search, 
  ChevronDown, 
  Bot, 
  FileText, 
  Rocket,
  Globe,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CreateAgentSection = () => {
  const [agentDescription, setAgentDescription] = useState("");
  const [agentName, setAgentName] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-4 Turbo");
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("AI Agent");

  const models = [
    "GPT-4 Turbo",
    "GPT-4",
    "GPT-3.5 Turbo",
    "Claude 3 Opus",
    "Claude 3 Sonnet",
    "Gemini Pro",
  ];

  const modes = [
    "AI Agent",
    "Image to Agent",
    "Text to Agent",
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Colorful Vibrant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0b2e] to-[#0f0517]" />
      
      {/* Colorful Animated Gradient Orbs */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.25) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 20%, rgba(34, 211, 238, 0.3) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.25) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.25) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional Colorful Layers */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15), transparent), radial-gradient(ellipse at bottom right, rgba(34, 211, 238, 0.15), transparent)",
            "radial-gradient(ellipse at top right, rgba(236, 72, 153, 0.15), transparent), radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.15), transparent)",
            "radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15), transparent), radial-gradient(ellipse at bottom right, rgba(34, 211, 238, 0.15), transparent)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Create Custom AI Agents with{" "}
            <span className="gradient-text">Multi-Flow Intelligence</span>{" "}
            for Any Use Case
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build intelligent agents tailored to your specific needs
          </p>
        </motion.div>

        {/* Main Card - Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative group">
            {/* Colorful Outer Glow */}
            <motion.div
              className="absolute -inset-2 rounded-3xl blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(34, 211, 238, 0.3), transparent)',
                  'radial-gradient(circle, rgba(34, 211, 238, 0.4), rgba(236, 72, 153, 0.3), transparent)',
                  'radial-gradient(circle, rgba(236, 72, 153, 0.4), rgba(168, 85, 247, 0.3), transparent)',
                  'radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(34, 211, 238, 0.3), transparent)',
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Main card container - Clean Design */}
            <div className="relative bg-card/30 backdrop-blur-xl border-2 border-primary/20 rounded-3xl p-6 lg:p-8 overflow-hidden shadow-lg shadow-primary/5">
              {/* Subtle Animated Border Gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.4), hsl(var(--primary) / 0.3))',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Inner Background */}
              <div className="absolute inset-[2px] rounded-3xl bg-card/30 backdrop-blur-xl" />
              
              <div className="relative z-10">
            {/* Top Section - Textarea */}
            <div className="mb-6">
              <textarea
                value={agentDescription}
                onChange={(e) => setAgentDescription(e.target.value)}
                placeholder="Describe agent or use URL"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none relative z-10"
              />
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
              {/* Mode Selector */}
              <DropdownMenu open={isModeOpen} onOpenChange={setIsModeOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 border border-border/50 text-foreground text-sm transition-colors">
                    <Bot className="w-4 h-4" />
                    <span>{selectedMode}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {modes.map((mode) => (
                    <DropdownMenuItem
                      key={mode}
                      onClick={() => {
                        setSelectedMode(mode);
                        setIsModeOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {mode}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Model Selector */}
              <DropdownMenu open={isModelOpen} onOpenChange={setIsModelOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 border border-border/50 text-foreground text-sm transition-colors">
                    <Sparkles className="w-4 h-4" />
                    <span>{selectedModel}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {models.map((model) => (
                    <DropdownMenuItem
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {model}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Divider */}
              <div className="h-6 w-px bg-border/50" />

              {/* Web Search Toggle - Icon Only */}
              <button
                onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
                  webSearchEnabled
                    ? "bg-primary/10 border-primary/50 text-primary"
                    : "bg-secondary/50 border-border/50 text-foreground hover:bg-secondary/70"
                }`}
                title="Web Search"
              >
                <Globe className="w-4 h-4" />
              </button>

              {/* Upload File */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 border border-border/50 text-foreground text-sm transition-colors">
                <FileText className="w-4 h-4" />
                <span>Upload File</span>
              </button>

              {/* Agent Name Input */}
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Agent Name"
                className="px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm min-w-[120px]"
              />
              
              {/* Deploy Button - Right Side */}
              <Button
                variant="hero"
                size="lg"
                className="ml-auto gap-2 px-6"
                disabled={!agentDescription.trim() || !agentName.trim()}
              >
                <Rocket className="w-4 h-4" />
                Deploy
              </Button>
            </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreateAgentSection;

