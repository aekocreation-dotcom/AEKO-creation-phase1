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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
            opacity: 0.15,
            filter: 'blur(0.5px)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl space-y-8"
              >
                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-center"
                >
                  Let's Create
                </motion.h1>

                {/* Prompt Input Area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Mountain className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a prompt..."
                      rows={1}
                      className="w-full pl-12 pr-4 py-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none transition-all shadow-lg"
                      style={{ 
                        minHeight: "56px",
                        maxHeight: "120px",
                        boxShadow: input ? "0 0 20px rgba(139, 92, 246, 0.3)" : undefined,
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </motion.div>

                {/* Creative Tools */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
              <div className="max-w-4xl mx-auto flex items-center gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Mountain className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a prompt..."
                    rows={1}
                    className="w-full pl-12 pr-4 py-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none transition-all"
                    style={{ 
                      minHeight: "48px",
                      maxHeight: "120px",
                    }}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="lg"
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AgentLLMPage;
