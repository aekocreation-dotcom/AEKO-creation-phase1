import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  RefreshCw,
  MessageSquare,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  X,
  Loader2,
  Image as ImageIcon,
  Video,
  Layout,
  Infinity,
  Maximize2,
  Square,
  PenTool,
  Mountain,
  Sparkles,
} from "lucide-react";
import { llmAPI } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  responseTime?: string;
}

const creativeTools = [
  { id: "image", label: "Image", icon: ImageIcon, color: "from-purple-500 to-pink-500" },
  { id: "video", label: "Video", icon: Video, color: "from-blue-500 to-cyan-500" },
  { id: "blueprints", label: "Blueprints", icon: Layout, color: "from-green-500 to-emerald-500", isNew: true },
  { id: "flow-state", label: "Flow State", icon: Infinity, color: "from-orange-500 to-red-500" },
  { id: "upscaler", label: "Upscaler", icon: Maximize2, color: "from-pink-500 to-rose-500" },
  { id: "canvas", label: "Canvas", icon: Square, color: "from-indigo-500 to-purple-500" },
  { id: "draw", label: "Draw", icon: PenTool, color: "from-yellow-500 to-orange-500" },
];

const AgentLLMPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Background images array - looping through different images
  const backgroundImages = [
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80', // Waterfalls with turquoise pool - cascading waterfalls into crystal clear turquoise water
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Tropical seascape with longtail boat at sunset - tropical waters with limestone cliffs
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80', // Japanese-style landscape with red sky and moon - dramatic sunset landscape
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80', // African savanna sunset scene - acacia trees at sunset
  ];

  // Preload background images
  useEffect(() => {
    backgroundImages.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  // Loop through background images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % backgroundImages.length;
        return nextIndex;
      });
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const queryText = input.trim();
    setInput("");
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const response = await llmAPI.chat(queryText, {
        max_tokens: 2000,
        temperature: 0.7,
      });

      const endTime = Date.now();
      const responseTime = ((endTime - startTime) / 1000).toFixed(1);

      if (response.success && response.data) {
        let assistantContent = "";

        if (response.data.choices && Array.isArray(response.data.choices) && response.data.choices[0]) {
          assistantContent = response.data.choices[0].message?.content || 
                            response.data.choices[0].text || 
                            response.data.choices[0].content || "";
        } else if (response.data.message) {
          assistantContent = typeof response.data.message === 'string' 
            ? response.data.message 
            : response.data.message.content || "";
        } else if (response.data.content) {
          assistantContent = response.data.content;
        } else if (response.data.text) {
          assistantContent = response.data.text;
        } else if (response.data.response) {
          assistantContent = response.data.response;
        } else if (typeof response.data === "string") {
          assistantContent = response.data;
        } else {
          assistantContent = JSON.stringify(response.data, null, 2);
        }

        if (!assistantContent.trim()) {
          throw new Error("Received empty response from AI");
        }

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: assistantContent,
          timestamp: new Date(),
          responseTime: `${responseTime}s`,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(response.message || "Failed to get response");
      }
    } catch (error: any) {
      console.error("LLM API error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error: ${error.message || "Failed to get response. Please try again."}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error(error.message || "Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Handle query parameter from home page
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setInput(query);
      setSearchParams({});
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        handleSend();
      }, 300);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <TooltipProvider>
      <div className="absolute inset-0 flex flex-col bg-background overflow-hidden">
        {/* Looping Background Images - Always visible with fallback */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Fallback background color */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0b2e] to-[#0f0517]" />
          
          {backgroundImages.map((imageUrl, index) => (
            <motion.div
              key={`bg-${index}-${imageUrl}`}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              initial={{ opacity: index === 0 ? 0.7 : 0 }}
              animate={{
                opacity: currentBgIndex === index ? 0.7 : 0,
                scale: currentBgIndex === index ? 1.02 : 1,
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `url('${imageUrl}')`,
                filter: 'blur(0px)',
                zIndex: currentBgIndex === index ? 1 : 0,
                willChange: 'opacity',
              }}
              onError={(e) => {
                console.error(`Failed to load background image ${index}:`, imageUrl);
              }}
            />
          ))}
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/10 pointer-events-none" style={{ zIndex: 2 }} />
        
        {/* Content */}
        <div className="relative flex flex-col flex-1 w-full overflow-y-auto" style={{ zIndex: 10 }}>
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl space-y-8"
              >
                {/* Title */}
                <motion.h1
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-center"
                >
                  Let's Create
                </motion.h1>

                {/* Prompt Input Area */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="relative flex-1 w-full" style={{ borderRadius: '16px' }}>
                    {/* Rich Rainbow Animated Gradient Border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        padding: '2px',
                        background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899, #F472B6, #3B82F6, #22D3EE, #22C55E, #FACC15, #EC4899, #7C3AED)',
                        backgroundSize: '300% 300%',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    
                    {/* Outer Glow Effect - Rainbow */}
                    <motion.div
                      className="absolute -inset-1 rounded-2xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4), rgba(34, 211, 238, 0.4), rgba(34, 197, 94, 0.4), rgba(250, 204, 21, 0.4))',
                        filter: 'blur(10px)',
                      }}
                    />
                    
                    {/* Inner Background */}
                    <div className="relative flex items-center bg-[#1a1f3a]/90 backdrop-blur-md rounded-2xl shadow-xl min-h-[56px]" style={{ borderRadius: '14px' }}>
                      {/* Inner Glow on Focus */}
                      {input && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))',
                            boxShadow: 'inset 0 0 25px rgba(139, 92, 246, 0.3)',
                          }}
                        />
                      )}
                      
                      {/* Mountain Icon */}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex-shrink-0">
                        <Mountain className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      {/* Textarea */}
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a prompt..."
                        rows={1}
                        className="w-full pl-12 pr-14 py-4 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none resize-none transition-all relative z-10 overflow-y-auto"
                        style={{ 
                          minHeight: "56px",
                          maxHeight: "120px",
                        }}
                      />
                      
                      {/* Send Button - Properly Aligned */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0">
                        <motion.button
                          onClick={handleSend}
                          disabled={!input.trim() || isLoading}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                          {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Send className="w-5 h-5" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Creative Tools */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-6 flex-wrap"
                >
                  {creativeTools.map((tool) => (
                    <Tooltip key={tool.id}>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveTool(tool.id);
                            toast.info(`${tool.label} tool selected`);
                          }}
                          className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all cursor-pointer group ${
                            activeTool === tool.id ? "border-primary shadow-lg shadow-primary/20" : ""
                          }`}
                        >
                          {tool.isNew && (
                            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
                              NEW
                            </span>
                          )}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                            <tool.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{tool.label}</span>
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tool.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <div className="w-full max-w-4xl space-y-6 py-8">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 items-start ${
                      message.role === "user" ? "justify-end flex-row-reverse" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-5 py-4 shadow-sm max-w-[80%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-card border border-border/50 text-foreground"
                      }`}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words m-0">
                          {message.content}
                        </p>
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSend()}
                              className="p-1.5 hover:bg-secondary/50 rounded-md transition-colors"
                              title="Regenerate"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                            <button
                              onClick={() => copyToClipboard(message.content)}
                              className="p-1.5 hover:bg-secondary/50 rounded-md transition-colors"
                              title="Copy"
                            >
                              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                            <button
                              className="p-1.5 hover:bg-secondary/50 rounded-md transition-colors"
                              title="Share"
                            >
                              <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                            <button
                              className="p-1.5 hover:bg-secondary/50 rounded-md transition-colors"
                              title="Like"
                            >
                              <ThumbsUp className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                            <button
                              className="p-1.5 hover:bg-secondary/50 rounded-md transition-colors"
                              title="Dislike"
                            >
                              <ThumbsDown className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                            <button
                              className="p-1.5 hover:bg-secondary/50 rounded-md transition-colors"
                              title="More"
                            >
                              <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                          </div>
                          {message.responseTime && (
                            <span className="text-xs text-muted-foreground/70 font-medium">
                              {message.responseTime}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-semibold text-primary">U</span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area - Shown when messages exist */}
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 bg-background/95 backdrop-blur-xl border-t border-border/50 p-4"
            >
              <div className="max-w-4xl mx-auto">
                <div className="relative flex-1 w-full" style={{ borderRadius: '16px' }}>
                  {/* Rich Rainbow Animated Gradient Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      padding: '2px',
                      background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899, #F472B6, #3B82F6, #22D3EE, #22C55E, #FACC15, #EC4899, #7C3AED)',
                      backgroundSize: '300% 300%',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Outer Glow Effect - Rainbow */}
                  <motion.div
                    className="absolute -inset-1 rounded-2xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4), rgba(34, 211, 238, 0.4), rgba(34, 197, 94, 0.4), rgba(250, 204, 21, 0.4))',
                      filter: 'blur(10px)',
                    }}
                  />
                  
                  {/* Inner Background */}
                  <div className="relative flex items-center bg-[#1a1f3a]/90 backdrop-blur-md rounded-2xl shadow-xl min-h-[48px]" style={{ borderRadius: '14px' }}>
                    {/* Inner Glow on Focus */}
                    {input && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))',
                          boxShadow: 'inset 0 0 25px rgba(139, 92, 246, 0.3)',
                        }}
                      />
                    )}
                    
                    {/* Mountain Icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex-shrink-0">
                      <Mountain className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    {/* Textarea */}
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a prompt..."
                      rows={1}
                      className="w-full pl-12 pr-14 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none resize-none transition-all relative z-10 overflow-y-auto"
                      style={{ 
                        minHeight: "48px",
                        maxHeight: "120px",
                      }}
                    />
                    
                    {/* Send Button - Properly Aligned */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex-shrink-0">
                      <motion.button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AgentLLMPage;
