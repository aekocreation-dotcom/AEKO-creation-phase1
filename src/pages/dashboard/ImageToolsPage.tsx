import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  ArrowLeftRight,
  Maximize2,
  Paperclip,
  Settings2,
  Zap,
  Loader2,
  Sparkles,
  ChevronDown,
  Download,
  Share2,
  Copy,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const imageTools = [
  { id: "text-to-image", label: "Text to Image", icon: Image, color: "from-purple-500 to-pink-500", description: "Generate images from text descriptions" },
  { id: "image-to-image", label: "Image to Image", icon: ArrowLeftRight, color: "from-green-500 to-emerald-500", description: "Transform existing images" },
  { id: "upscale", label: "Upscale", icon: Maximize2, color: "from-pink-500 to-rose-500", description: "Enhance image resolution" },
];

const imageModels = [
  { id: "flux", name: "FLUX Pro", icon: "✨", description: "High-quality realistic images" },
  { id: "sdxl", name: "Stable Diffusion XL", icon: "🎨", description: "Creative and artistic styles" },
  { id: "dalle", name: "DALL-E 3", icon: "🖼️", description: "Photorealistic and detailed" },
];

const ImageToolsPage = () => {
  const [activeTool, setActiveTool] = useState("text-to-image");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(imageModels[0]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedImage("https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="absolute inset-0 flex flex-col relative overflow-y-auto">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Image Tools</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Create stunning images with AI-powered generation</p>
        </motion.div>

        {/* Tool Selection */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {imageTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTool(tool.id)}
                className={`flex flex-col sm:flex-row items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap min-w-fit ${
                  isActive
                    ? `bg-gradient-to-r ${tool.color} text-white shadow-lg`
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="text-left">
                  <span className="text-sm font-medium block">{tool.label}</span>
                  <span className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'} hidden sm:block`}>{tool.description}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Main Tool Interface */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Left: Input Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card rounded-2xl p-4 sm:p-6">
              {/* Model Selector */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="relative w-full sm:w-auto">
                  <button
                    onClick={() => setIsModelOpen(!isModelOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors w-full sm:w-auto"
                  >
                    <span className="text-lg">{selectedModel.icon}</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedModel.name}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ml-auto ${isModelOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isModelOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-full sm:w-64 rounded-lg bg-card border border-border shadow-xl z-20"
                      >
                        {imageModels.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model);
                              setIsModelOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors first:rounded-t-lg last:rounded-b-lg text-left"
                          >
                            <span className="text-xl">{model.icon}</span>
                            <div>
                              <span className="text-sm font-medium text-foreground block">{model.name}</span>
                              <span className="text-xs text-muted-foreground">{model.description}</span>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center ${
                    showAdvanced ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Settings2 className="w-4 h-4" />
                  <span className="text-sm">Advanced</span>
                </button>
              </div>

              {/* Prompt Input */}
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                placeholder="Describe what you want to create... (Ctrl+Enter to generate)"
                className="w-full h-32 sm:h-40 bg-secondary/30 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base disabled:opacity-50 transition-all"
              />

              {/* Advanced Settings */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-border/50 mt-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Steps</label>
                        <input
                          type="number"
                          defaultValue={30}
                          className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Guidance</label>
                        <input
                          type="number"
                          step="0.5"
                          defaultValue={7.5}
                          className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Seed</label>
                        <input
                          type="number"
                          defaultValue={-1}
                          className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-border/50 mt-4">
                <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground">
                  <Paperclip className="w-4 h-4" />
                  <span className="text-sm">Attach Image</span>
                </button>

                <Button
                  variant="hero"
                  size="lg"
                  className="gap-2 w-full sm:w-auto"
                  disabled={isLoading || !prompt.trim()}
                  onClick={handleGenerate}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Output Preview */}
          <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col min-h-[300px] sm:min-h-[400px] max-h-[600px]">
            <AnimatePresence mode="wait">
              {generatedImage ? (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col h-full"
                >
                  <div className="relative rounded-xl overflow-hidden mb-4 flex-1 bg-secondary/30">
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Ready to Create
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Enter a prompt and click Generate to see your AI creation appear here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Prompt Library */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Prompt Ideas
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Cyberpunk cityscape at night",
              "Portrait in studio lighting",
              "Abstract digital art",
              "Fantasy landscape",
              "Product mockup render",
              "Anime character design",
            ].map((idea) => (
              <motion.button
                key={idea}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPrompt(idea)}
                className="px-4 py-2 rounded-full bg-secondary/30 hover:bg-secondary/50 border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-all"
              >
                {idea}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageToolsPage;
