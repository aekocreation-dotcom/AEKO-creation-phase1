import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Image, Video, Loader2, Sparkles, Heart, Compass } from "lucide-react";
import { toast } from "sonner";
import { FeedItem } from "@/components/feed/FeedCard";
import MasonryCard from "@/components/feed/MasonryCard";
import ImageDetailModal from "@/components/feed/ImageDetailModal";
import ReelsViewer from "@/components/feed/ReelsViewer";
import CommentsSheet from "@/components/feed/CommentsSheet";
import ShareSheet from "@/components/feed/ShareSheet";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const filters = [
  { id: "styles", label: "Styles", icon: Sparkles },
  { id: "images", label: "Images", icon: Image },
  { id: "videos", label: "Videos", icon: Video },
];

const sortOptions = [
  { id: "top", label: "Top Day", icon: TrendingUp },
  { id: "likes", label: "Likes", icon: Heart },
];

const generateMockItems = (startId: number, count: number): FeedItem[] => {
  // ...no change...
  const models = [
    "FLUX Pro",
    "Stable Diffusion XL",
    "DALL-E 3",
    "Midjourney Style",
    "Runway Gen-3",
    "Pika Labs",
  ];
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
    "Hyper realistic portrait of a woman with freckles, dramatic lighting",
    "Van Gogh style eye with swirling colors and dramatic waves",
    "Black horse rearing on red background, magazine cover style",
    "Athletic woman running in urban environment, fitness magazine",
    "Vintage interior room with afternoon sunlight streaming through windows",
    "Two monkeys having a conversation, photorealistic animal portrait",
  ];
  const usernames = [
    "creator_1",
    "artist_pro",
    "filmmaker",
    "tech_art",
    "fantasy_maker",
    "motion_artist",
    "ai_wizard",
    "pixel_master",
    "onboku",
    "atreyu77",
    "visual_dreams",
  ];
  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
  ];
  const images = [
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800",
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800",
    "https://images.unsplash.com/photo-1604076913837-52ab5f6a3b5e?w=800",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    const isVideo = Math.random() > 0.8;
    const randomUser = Math.floor(Math.random() * usernames.length);
    const randomAvatar = Math.floor(Math.random() * avatars.length);
    const randomImage = Math.floor(Math.random() * images.length);
    const randomPrompt = Math.floor(Math.random() * prompts.length);
    const randomModel = Math.floor(Math.random() * models.length);

    const hoursAgo = Math.floor(Math.random() * 168);
    const createdAt = new Date(
      Date.now() - hoursAgo * 60 * 60 * 1000
    ).toISOString();

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
  const [activeFilter, setActiveFilter] = useState("styles");
  const [activeSort, setActiveSort] = useState("top");
  const [items, setItems] = useState<FeedItem[]>(() =>
    generateMockItems(1, 20)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // Modal states
  const [reelsOpen, setReelsOpen] = useState(false);
  const [reelsIndex, setReelsIndex] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsItemId, setCommentsItemId] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareItemId, setShareItemId] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const newItems = generateMockItems(items.length + 1, 12);
      setItems((prev) => [...prev, ...newItems]);
      setIsLoading(false);

      if (items.length >= 80) {
        setHasMore(false);
      }
    }, 1000);
  }, [items.length, isLoading, hasMore]);

  const loadMoreRef = useInfiniteScroll(loadMore);

  const filteredItems = items.filter((item) => {
    if (activeFilter === "styles") return true;
    if (activeFilter === "images") return item.type === "image";
    if (activeFilter === "videos") return item.type === "video";
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (activeSort === "top") {
      return b.likes - a.likes;
    }
    if (activeSort === "likes") {
      return b.likes - a.likes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleLike = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newIsLiked = !item.isLiked;
          if (newIsLiked) {
            toast.success("Added to your likes!");
          }
          return {
            ...item,
            isLiked: newIsLiked,
            likes: newIsLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleSave = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newIsSaved = !item.isSaved;
          toast.success(
            newIsSaved ? "Saved to collection!" : "Removed from collection"
          );
          return {
            ...item,
            isSaved: newIsSaved,
            saves: newIsSaved ? item.saves + 1 : item.saves - 1,
          };
        }
        return item;
      })
    );
  };

  const handleShare = (id: number) => {
    setShareItemId(id);
    setShareOpen(true);
  };

  const handleFollow = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          toast.success(`Following @${item.author.username}`);
          return { ...item, isFollowing: true };
        }
        return item;
      })
    );
  };

  const handleOpenComments = (id: number) => {
    setCommentsItemId(id);
    setCommentsOpen(true);
  };

  const handleOpenReels = (id: number) => {
    const videoItems = items.filter((item) => item.type === "video");
    const index = videoItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      setReelsIndex(index);
      setReelsOpen(true);
    }
  };

  const handleOpenDetail = (id: number) => {
    setSelectedItemId(id);
    setDetailModalOpen(true);
  };

  const handlePrevDetail = () => {
    const imageItems = sortedItems.filter((item) => item.type === "image");
    const currentImageIndex = imageItems.findIndex(
      (item) => item.id === selectedItemId
    );
    if (currentImageIndex > 0) {
      setSelectedItemId(imageItems[currentImageIndex - 1].id);
    }
  };

  const handleNextDetail = () => {
    const imageItems = sortedItems.filter((item) => item.type === "image");
    const currentImageIndex = imageItems.findIndex(
      (item) => item.id === selectedItemId
    );
    if (currentImageIndex < imageItems.length - 1) {
      setSelectedItemId(imageItems[currentImageIndex + 1].id);
    }
  };

  const selectedItem =
    items.find((item) => item.id === selectedItemId) || null;
  const imageItems = sortedItems.filter((item) => item.type === "image");
  const currentImageIndex = imageItems.findIndex(
    (item) => item.id === selectedItemId
  );
  const videoItems = items.filter((item) => item.type === "video");

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Matching Midjourney Layout */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border -mx-2 lg:-mx-4 px-3 lg:px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Compass Icon */}
          <div className="flex items-center gap-3">
            <Compass className="w-4 h-4 text-red-500" />
            
            {/* Center: Sort Options */}
            <div className="flex items-center gap-1.5">
              {sortOptions.map((option) => {
                return (
                  <button
                    key={option.id}
                    onClick={() => setActiveSort(option.id)}
                    className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                      activeSort === option.id
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={activeSort === option.id}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Filter Options */}
          <div className="flex items-center gap-1.5">
            {filters.map((filter) => {
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? "bg-red-500 text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                  aria-pressed={activeFilter === filter.id}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Masonry Grid - With Borders and Better Spacing */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        className="pt-4 px-2 sm:px-4 lg:px-6"
      >
        <div className="w-full max-w-[1920px] mx-auto">
          <div
            className="
              gap-3 sm:gap-4 grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              2xl:grid-cols-7
              "
          >
            {sortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className="flex flex-col min-w-0 break-inside-avoid"
              >
                <MasonryCard
                  item={item}
                  onLike={handleLike}
                  onSave={handleSave}
                  onShare={handleShare}
                  onOpenComments={handleOpenComments}
                  onOpenReels={handleOpenReels}
                  onClick={handleOpenDetail}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Infinite scroll trigger */}
        <div
          ref={loadMoreRef}
          className="py-6 flex justify-center items-center min-h-12"
        >
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-medium">Loading more...</span>
            </div>
          )}
          {!hasMore && (
            <p className="text-muted-foreground text-xs font-medium px-2 text-center">
              You've seen it all! 🎉
            </p>
          )}
        </div>
      </motion.main>

      {/* Image Detail Modal */}
      <ImageDetailModal
        isOpen={detailModalOpen}
        item={selectedItem}
        onClose={() => setDetailModalOpen(false)}
        onLike={handleLike}
        onSave={handleSave}
        onShare={handleShare}
        onOpenComments={handleOpenComments}
        onPrev={handlePrevDetail}
        onNext={handleNextDetail}
        hasPrev={currentImageIndex > 0}
        hasNext={currentImageIndex < imageItems.length - 1}
      />

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
