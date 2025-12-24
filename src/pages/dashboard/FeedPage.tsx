import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Image, Video, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import FeedCard, { FeedItem } from "@/components/feed/FeedCard";
import ReelsViewer from "@/components/feed/ReelsViewer";
import CommentsSheet from "@/components/feed/CommentsSheet";
import ShareSheet from "@/components/feed/ShareSheet";
import StoriesBar from "@/components/feed/StoriesBar";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const filters = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "images", label: "Images", icon: Image },
  { id: "videos", label: "Reels", icon: Video },
];

const sortOptions = [
  { id: "top", label: "Top", icon: TrendingUp },
  { id: "new", label: "New", icon: Clock },
];

const generateMockItems = (startId: number, count: number): FeedItem[] => {
  const models = ["FLUX Pro", "Stable Diffusion XL", "DALL-E 3", "Midjourney Style", "Runway Gen-3", "Pika Labs"];
  const prompts = [
    "Cyberpunk city with neon lights and flying cars at sunset",
    "Abstract digital art with flowing colors and geometric shapes",
    "Cinematic mountain landscape with dramatic lighting",
    "Futuristic robot portrait in studio lighting with reflections",
    "Ethereal fantasy forest with magical creatures and glowing plants",
    "Portrait animation with subtle movements and emotion",
    "Surreal underwater world with bioluminescent creatures",
    "Steampunk airship flying through clouds at golden hour",
    "Minimalist Japanese garden with cherry blossoms",
    "Cosmic nebula with vibrant colors and stars",
  ];
  const usernames = ["creator_1", "artist_pro", "filmmaker", "tech_art", "fantasy_maker", "motion_artist", "ai_wizard", "pixel_master"];
  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
  ];
  const images = [
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600",
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600",
    "https://images.unsplash.com/photo-1604076913837-52ab5f6a3b5e?w=600",
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    const isVideo = Math.random() > 0.7;
    const randomUser = Math.floor(Math.random() * usernames.length);
    const randomAvatar = Math.floor(Math.random() * avatars.length);
    const randomImage = Math.floor(Math.random() * images.length);
    const randomPrompt = Math.floor(Math.random() * prompts.length);
    const randomModel = Math.floor(Math.random() * models.length);
    
    const hoursAgo = Math.floor(Math.random() * 168); // up to 7 days
    const createdAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();
    
    return {
      id,
      type: isVideo ? "video" : "image",
      mediaUrl: images[randomImage],
      thumbnailUrl: isVideo ? images[randomImage] : undefined,
      prompt: prompts[randomPrompt],
      author: {
        username: usernames[randomUser],
        avatar: avatars[randomAvatar],
        verified: Math.random() > 0.7,
      },
      likes: Math.floor(Math.random() * 10000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      shares: Math.floor(Math.random() * 200) + 5,
      saves: Math.floor(Math.random() * 1000) + 20,
      model: models[randomModel],
      createdAt,
      isLiked: false,
      isSaved: false,
      isFollowing: Math.random() > 0.6,
    };
  });
};

const FeedPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("top");
  const [items, setItems] = useState<FeedItem[]>(() => generateMockItems(1, 9));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Modal states
  const [reelsOpen, setReelsOpen] = useState(false);
  const [reelsIndex, setReelsIndex] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsItemId, setCommentsItemId] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareItemId, setShareItemId] = useState(0);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newItems = generateMockItems(items.length + 1, 6);
      setItems(prev => [...prev, ...newItems]);
      setIsLoading(false);
      
      // Stop after 50 items for demo
      if (items.length >= 50) {
        setHasMore(false);
      }
    }, 1000);
  }, [items.length, isLoading, hasMore]);

  const loadMoreRef = useInfiniteScroll(loadMore);

  const filteredItems = items.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "images") return item.type === "image";
    if (activeFilter === "videos") return item.type === "video";
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (activeSort === "top") {
      return b.likes - a.likes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleLike = (id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newIsLiked = !item.isLiked;
        if (newIsLiked) {
          toast.success("Added to your likes!");
        }
        return {
          ...item,
          isLiked: newIsLiked,
          likes: newIsLiked ? item.likes + 1 : item.likes - 1
        };
      }
      return item;
    }));
  };

  const handleSave = (id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newIsSaved = !item.isSaved;
        toast.success(newIsSaved ? "Saved to collection!" : "Removed from collection");
        return {
          ...item,
          isSaved: newIsSaved,
          saves: newIsSaved ? item.saves + 1 : item.saves - 1
        };
      }
      return item;
    }));
  };

  const handleShare = (id: number) => {
    setShareItemId(id);
    setShareOpen(true);
  };

  const handleFollow = (id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        toast.success(`Following @${item.author.username}`);
        return { ...item, isFollowing: true };
      }
      return item;
    }));
  };

  const handleOpenComments = (id: number) => {
    setCommentsItemId(id);
    setCommentsOpen(true);
  };

  const handleOpenReels = (id: number) => {
    const videoItems = items.filter(item => item.type === "video");
    const index = videoItems.findIndex(item => item.id === id);
    if (index !== -1) {
      setReelsIndex(index);
      setReelsOpen(true);
    }
  };

  const videoItems = items.filter(item => item.type === "video");

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
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

      {/* Stories */}
      <StoriesBar />

      {/* Filters & Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-4"
      >
        {/* Type Filters */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setActiveSort(option.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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

      {/* Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {sortedItems.map((item, idx) => (
          <FeedCard
            key={item.id}
            item={item}
            onLike={handleLike}
            onSave={handleSave}
            onShare={handleShare}
            onFollow={handleFollow}
            onOpenComments={handleOpenComments}
            onOpenReels={handleOpenReels}
          />
        ))}

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="py-8 flex justify-center">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading more...</span>
            </div>
          )}
          {!hasMore && (
            <p className="text-muted-foreground text-sm">You've seen it all! 🎉</p>
          )}
        </div>
      </motion.div>

      {/* Reels Viewer */}
      <ReelsViewer
        items={videoItems}
        initialIndex={reelsIndex}
        isOpen={reelsOpen}
        onClose={() => setReelsOpen(false)}
        onLike={handleLike}
        onSave={handleSave}
        onShare={handleShare}
        onOpenComments={handleOpenComments}
      />

      {/* Comments Sheet */}
      <CommentsSheet
        isOpen={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        itemId={commentsItemId}
      />

      {/* Share Sheet */}
      <ShareSheet
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        itemId={shareItemId}
      />
    </div>
  );
};

export default FeedPage;
