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
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground ml-0.5" />
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
              <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2">
                {/* Author info */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <img 
                    src={item.author.avatar} 
                    alt={item.author.username}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-1 ring-border"
                  />
                  <span className="text-xs font-medium text-foreground truncate">
                    {item.author.username}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onLike(item.id); }}
                      className="p-1 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Heart 
                        className={`w-3 h-3 ${
                          item.isLiked ? 'text-red-500 fill-red-500' : 'text-foreground'
                        }`} 
                      />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSave(item.id); }}
                      className="p-1 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Bookmark 
                        className={`w-3 h-3 ${
                          item.isSaved ? 'text-foreground fill-foreground' : 'text-foreground'
                        }`} 
                      />
                    </button>
                    <button 
                      onClick={handleCopyPrompt}
                      className="p-1 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Copy className="w-3 h-3 text-foreground" />
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="p-1 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Download className="w-3 h-3 text-foreground" />
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
