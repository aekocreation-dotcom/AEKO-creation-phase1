import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Download, Filter, TrendingUp, Clock, Image, Video } from "lucide-react";

const filters = [
  { id: "all", label: "All" },
  { id: "images", label: "Images", icon: Image },
  { id: "videos", label: "Videos", icon: Video },
];

const sortOptions = [
  { id: "top", label: "Top", icon: TrendingUp },
  { id: "new", label: "New", icon: Clock },
];

const feedItems = [
  {
    id: 1,
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop",
    prompt: "Cyberpunk city with neon lights and flying cars",
    author: "creator_1",
    likes: 1234,
    comments: 56,
    model: "FLUX Pro",
  },
  {
    id: 2,
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    prompt: "Abstract digital art with flowing colors",
    author: "artist_pro",
    likes: 892,
    comments: 23,
    model: "Stable Diffusion XL",
  },
  {
    id: 3,
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    prompt: "Cinematic mountain landscape timelapse",
    author: "filmmaker",
    likes: 2341,
    comments: 89,
    model: "Runway Gen-3",
  },
  {
    id: 4,
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&h=400&fit=crop",
    prompt: "Futuristic robot portrait in studio lighting",
    author: "tech_art",
    likes: 567,
    comments: 12,
    model: "DALL-E 3",
  },
  {
    id: 5,
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop",
    prompt: "Ethereal fantasy forest with magical creatures",
    author: "fantasy_maker",
    likes: 1876,
    comments: 45,
    model: "Midjourney Style",
  },
  {
    id: 6,
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    prompt: "Portrait animation with subtle movements",
    author: "motion_artist",
    likes: 432,
    comments: 8,
    model: "Pika Labs",
  },
];

const FeedPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("top");

  const filteredItems = feedItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "images") return item.type === "image";
    if (activeFilter === "videos") return item.type === "video";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Explore
          </h1>
          <p className="text-muted-foreground">
            Discover amazing creations from the community
          </p>
        </div>
      </motion.div>

      {/* Filters & Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-4"
      >
        {/* Type Filters */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-secondary/50">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-secondary/50">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setActiveSort(option.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSort === option.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Feed Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.type === "video" && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                  Video
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Hover Actions */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-foreground line-clamp-2 mb-3">
                {item.prompt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <span className="text-xs text-muted-foreground">
                    @{item.author}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {item.comments}
                  </span>
                </div>
              </div>
              <div className="mt-2 inline-block px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground">
                {item.model}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeedPage;
