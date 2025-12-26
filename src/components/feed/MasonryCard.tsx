import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Play, Download, Copy, Bookmark
} from "lucide-react";
import { toast } from "sonner";
import { FeedItem } from "./FeedCard";

interface MasonryCardProps {
  item: FeedItem;
  onLike: (id: number) => void;
  onSave: (id: number) => void;
  onShare: (id: number) => void;
  onOpenComments: (id: number) => void;
  onOpenReels?: (id: number) => void;
  onClick: (id: number) => void;
}

const MasonryCard = ({ 
  item, 
  onLike, 
  onSave, 
  onShare, 
  onOpenComments,
  onOpenReels,
  onClick
}: MasonryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isLiked) {
      onLike(item.id);
    }
    setShowLikeAnimation(true);
    setTimeout(() => setShowLikeAnimation(false), 1000);
  };

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.prompt);
    toast.success("Prompt copied!");
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Download started!");
  };

  const handleClick = () => {
    if (item.type === "video") {
      onOpenReels?.(item.id);
    } else {
      onClick(item.id);
    }
  };

  // Random aspect ratio for masonry effect
  const aspectRatios = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[2/3]'];
  const aspectRatio = aspectRatios[item.id % aspectRatios.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className={`relative ${aspectRatio} overflow-hidden bg-secondary`}>
        <img
          src={item.thumbnailUrl || item.mediaUrl}
          alt={item.prompt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Video indicator */}
        {item.type === "video" && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 text-foreground ml-0.5" />
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            >
              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                {/* Author info */}
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={item.author.avatar} 
                    alt={item.author.username}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover ring-1 ring-border"
                  />
                  <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                    {item.author.username}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onLike(item.id); }}
                      className="p-1.5 sm:p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          item.isLiked ? 'text-red-500 fill-red-500' : 'text-foreground'
                        }`} 
                      />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSave(item.id); }}
                      className="p-1.5 sm:p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Bookmark 
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          item.isSaved ? 'text-foreground fill-foreground' : 'text-foreground'
                        }`} 
                      />
                    </button>
                    <button 
                      onClick={handleCopyPrompt}
                      className="p-1.5 sm:p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="p-1.5 sm:p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Double tap heart animation */}
        <AnimatePresence>
          {showLikeAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 fill-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MasonryCard;
