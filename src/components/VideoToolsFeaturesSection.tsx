import { motion } from "framer-motion";
import { Video, Film, Sparkles, Zap, Play } from "lucide-react";
import { useState } from "react";

const videoFeatures = [
  {
    id: "video-generator",
    title: "AI Video Generator",
    views: "3.2M",
    hot: true,
    description: "Create videos from text prompts",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "text-to-video",
    title: "Text to Video AI",
    views: "2.8M",
    hot: true,
    description: "Transform text into stunning videos",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "video-editor",
    title: "AI Video Editor",
    views: "1.5M",
    hot: true,
    description: "Edit videos with AI assistance",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "video-enhancer",
    title: "AI Video Enhancer",
    views: "1.2M",
    hot: false,
    description: "Enhance video quality and resolution",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "video-extender",
    title: "AI Video Extender",
    views: "980K",
    hot: false,
    description: "Extend video duration seamlessly",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    id: "video-to-video",
    title: "Video to Video AI",
    views: "1.8M",
    hot: true,
    description: "Transform videos with AI",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "music-video",
    title: "AI Music Video Generator",
    views: "1.4M",
    hot: true,
    description: "Create music videos automatically",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "video-shorts",
    title: "AI Shorts",
    views: "1.6M",
    hot: true,
    description: "Generate short-form video content",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "mimic-motion",
    title: "Mimic Motion",
    views: "890K",
    hot: false,
    description: "Replicate motion patterns in videos",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const VideoToolsFeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");

  const displayedFeatures = activeTab === "popular" 
    ? videoFeatures.filter(f => f.hot)
    : videoFeatures;

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden w-full">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background w-full" />

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
            Video Tools <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI video generation and editing capabilities
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary/70"
            }`}
          >
            All Tools
          </button>
          <button
            onClick={() => setActiveTab("popular")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "popular"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary/70"
            }`}
          >
            Popular
          </button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {displayedFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Card Image/Icon Area */}
              <div className={`relative h-48 bg-gradient-to-br ${feature.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                <Video className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform relative z-10" />
                
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                
                {/* Labels */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  {feature.hot && (
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                      Hot
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                    {feature.views}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {feature.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoToolsFeaturesSection;

