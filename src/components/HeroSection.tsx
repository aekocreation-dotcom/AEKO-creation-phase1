import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const HeroSection = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim()) {
      // Navigate to agent page with the query
      navigate(`/dashboard/tools/agent?q=${encodeURIComponent(input.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 z-20">
      {/* Astronaut Image Background */}
      <div className="absolute inset-0 z-0 bg-background">
        {/* Base image - Replace URL with your astronaut/flower image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80')`,
          }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        
        {/* Flowing highlight animations */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Additional flowing highlights */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Pink/purple flower highlights */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 40%), radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 40%)",
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Star field effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${startX}%`,
                  top: `${startY}%`,
                  boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, 0.8)`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-[1] opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">
              Powered by GPT-4, FLUX & Stable Diffusion
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Chat Smarter. Create Faster.{" "}
            <span className="gradient-text">Powered by AI.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            All-in-one AI platform for chat, images, and videos — powered by the
            world's best models.
          </motion.p>

          {/* GPT Textbox */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8 max-w-xl mx-auto"
          >
            <div className="relative">
              <div className="flex items-end gap-2 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
                <div className="flex-1 relative min-w-0 pl-4">
                  {!input && (
                    <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
                      <span className="text-base leading-relaxed font-semibold gradient-text">
                        Ask Me Anything
                      </span>
                    </div>
                  )}
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder=""
                    rows={1}
                    className="w-full px-2 py-3 bg-transparent text-foreground focus:outline-none resize-none overflow-hidden text-sm leading-relaxed"
                    style={{ minHeight: "52px", maxHeight: "200px" }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className="p-2.5 mr-2 mb-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3 CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/dashboard/tools">
              <Button variant="hero" size="xl" className="group gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat Agent
              </Button>
            </Link>
            <Link to="/dashboard/tools">
              <Button variant="hero" size="xl" className="group gap-2">
                <Image className="w-5 h-5" />
                Image
              </Button>
            </Link>
            <Link to="/dashboard/tools">
              <Button variant="hero" size="xl" className="group gap-2">
                <Video className="w-5 h-5" />
                Video
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-border/30"
          >
            {[
              { value: "5M+", label: "Generations" },
              { value: "50+", label: "AI Models" },
              { value: "200K+", label: "Creators" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
