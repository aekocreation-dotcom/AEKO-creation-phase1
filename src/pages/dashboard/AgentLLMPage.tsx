import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  Paperclip,
  RefreshCw,
  MessageSquare,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Lightbulb,
  X,
  Rocket,
  ChevronDown,
  Plus,
  Bot,
  Loader2,
  Upload,
  Image as ImageIcon,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";
import { llmAPI } from "@/lib/api";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  responseTime?: string;
}

const AgentLLMPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showThinkHarder, setShowThinkHarder] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedModel, setSelectedModel] = useState<"gpt-3.5" | "gpt-4.1" | "claude">("gpt-3.5");
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [agentDescription, setAgentDescription] = useState("");
  const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: queryText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const startTime = Date.now();
      const response = await llmAPI.chat(queryText.trim());
      const responseTime = ((Date.now() - startTime) / 1000).toFixed(1);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.message || response.response || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date(),
        responseTime: `${responseTime}s`,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: error?.message || "Error: Failed to fetch response. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle query parameter from home page
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setInput(query);
      // Clear the query parameter
      setSearchParams({});
      // Auto-send the message after a short delay
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        handleSendQuery(query);
      }, 300);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
    setInput("");
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const response = await llmAPI.chat(input.trim(), {
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

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "48px";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <TooltipProvider>
    <motion.div 
      className="fixed inset-0 flex flex-col bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: '100vh' }}
    >
      {/* Background Image - Different for light/dark mode */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: theme === "light" 
            ? `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')` // Night landscape with stars, lake, and Milky Way
            : `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`, // Mountain/Moon landscape for dark mode
          opacity: theme === "light" ? 0.05 : 0.04,
          filter: 'blur(0.5px)',
        }}
      />
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        
        {/* Animated Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${startX}%`,
                top: `${startY}%`,
              }}
              animate={{
                y: [0, -30, -60, -30, 0],
                x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.5, 0.3, 0.5, 0.2],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Animated Waves */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-5"
          style={{
            background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.3))',
          }}
          animate={{
            height: ['32px', '48px', '32px'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Content with relative positioning - Full Screen */}
      <div className="relative z-10 flex flex-col" style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden', width: '100%' }}>
      {/* Header - Collapsible when input focused */}
      <motion.div 
        className="relative z-10 bg-background/80 backdrop-blur-sm flex-shrink-0"
        animate={{
          height: isInputFocused ? "0px" : "auto",
          opacity: isInputFocused ? 0 : 1,
          paddingTop: isInputFocused ? "0px" : "8px",
          paddingBottom: isInputFocused ? "0px" : "8px",
          paddingLeft: isInputFocused ? "0px" : "16px",
          paddingRight: isInputFocused ? "0px" : "16px",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-end">
          {/* Header content can be added here if needed */}
        </div>
      </motion.div>

      {/* Messages Area - Expanded when input focused - Centered Layout */}
      <motion.div 
        className="flex-1 overflow-y-auto overflow-x-hidden relative z-10"
        style={{ 
          flex: '1 1 auto',
          minHeight: 0,
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
        animate={{
          paddingTop: isInputFocused ? "8px" : "16px",
          paddingBottom: isInputFocused ? "0px" : "0px",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className={`w-full ${isInputFocused ? "space-y-4" : "space-y-6"}`} style={{ maxWidth: '768px', margin: '0 auto', paddingLeft: isInputFocused ? "16px" : "clamp(16px, 4vw, 24px)", paddingRight: isInputFocused ? "16px" : "clamp(16px, 4vw, 24px)", overflowX: 'hidden' }}>
          {messages.length === 0 ? (
            <motion.div 
              className="flex items-center justify-center h-full"
              animate={{
                scale: isInputFocused ? 0.95 : 1,
                opacity: isInputFocused ? 0.7 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center space-y-6 w-full px-4 max-w-2xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
                >
                  What do you want to create?
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg md:text-xl text-muted-foreground"
                >
                  Type your prompt - turn ideas into stunning AI visuals instantly.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-3 mt-8"
                >
                  {[
                    "Create a futuristic cityscape",
                    "Design a logo for my brand",
                    "Generate a product mockup",
                    "Write a blog post about AI",
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/50 text-sm text-foreground transition-all duration-200 hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 items-start w-full ${message.role === "user" ? "justify-end flex-row-reverse" : "justify-start"}`}
              style={{ maxWidth: '100%', overflowX: 'hidden' }}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
              )}

              <div
                className={`rounded-2xl px-5 py-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/50 text-foreground"
                }`}
                style={{ 
                  maxWidth: message.role === "user" ? "min(75%, 100%)" : "min(80%, 100%)", 
                  width: 'fit-content',
                  minWidth: 0,
                  wordWrap: "break-word", 
                  overflowWrap: "break-word",
                  overflowX: "hidden"
                }}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words m-0" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{message.content}</p>
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
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-semibold text-primary">U</span>
                </div>
              )}
            </motion.div>
            ))
          )}

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
      </motion.div>

      {/* Think Harder Banner */}
      {showThinkHarder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mx-6 mb-2"
        >
          <div className="bg-secondary rounded-full px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Think Harder</span>
            </div>
            <button
              onClick={() => setShowThinkHarder(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Input Area - Professional Design - Centered at Bottom */}
      <motion.div 
        className="relative z-10 bg-background/95 backdrop-blur-xl flex-shrink-0"
        style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', display: 'flex', justifyContent: 'center' }}
        animate={{
          paddingTop: isInputFocused ? "10px" : "14px",
          paddingBottom: isInputFocused ? "10px" : "16px",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="w-full" style={{ maxWidth: '768px', margin: '0 auto', paddingLeft: 'clamp(16px, 4vw, 24px)', paddingRight: 'clamp(16px, 4vw, 24px)', boxSizing: 'border-box' }}>
          <div className="relative w-full" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <div 
              className="relative flex items-end gap-2 bg-transparent rounded-2xl shadow-lg hover:shadow-xl transition-all"
              style={{ 
                width: '100%', 
                maxWidth: '100%', 
                boxSizing: 'border-box',
                border: '2px solid rgba(255, 255, 255, 0.9)',
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={(e) => {
                // Only blur if focus is not moving to another element in the input area
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIsInputFocused(false);
                }
              }}
            >
              {/* Animated White Light Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['-200% 0', '200% 0'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Pulsing Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Plus Icon with Agent Options Dropdown - Left Side */}
              <DropdownMenu open={isAgentMenuOpen} onOpenChange={setIsAgentMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-2.5 hover:bg-secondary/50 rounded-lg transition-colors ml-1 flex-shrink-0 border border-border/50 hover:border-primary/50"
                    title="Agent options"
                    type="button"
                    style={{ minWidth: '40px', minHeight: '40px' }}
                  >
                    <Plus className="w-5 h-5 text-foreground" strokeWidth={2} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom" className="w-80 p-0 mt-2 z-50">
                  <div className="p-4 space-y-4">
                    {/* Web Search Toggle at Top */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Web Search</span>
                      </div>
                      <Switch
                        checked={webSearchEnabled}
                        onCheckedChange={setWebSearchEnabled}
                      />
                    </div>
                    
                    <div className="border-t border-border/50" />
                    
                    {/* Describe Agent Behaviors */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Describe your agent behaviors</span>
                      </div>
                      <textarea
                        value={agentDescription}
                        onChange={(e) => setAgentDescription(e.target.value)}
                        placeholder="E.g., You are a helpful assistant that provides clear, concise answers..."
                        rows={4}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-secondary/30 border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                      />
                    </div>
                    
                    <div className="border-t border-border/50" />
                    
                    {/* Upload Options */}
                    <div className="space-y-2">
                      <DropdownMenuItem
                        onClick={() => {
                          toast.info("File upload coming soon!");
                        }}
                        className="cursor-pointer"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        <span>Upload File</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem
                        onClick={() => {
                          toast.info("Image upload coming soon!");
                        }}
                        className="cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        <span>Upload Image</span>
                      </DropdownMenuItem>
                    </div>
                    
                    <div className="border-t border-border/50" />
                    
                    {/* Model Selection Dropdown */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Select Model</label>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <button 
                            className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg bg-secondary/30 border border-border/50 text-foreground hover:bg-secondary/50 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{selectedModel === "gpt-3.5" ? "GPT-3.5" : selectedModel === "gpt-4.1" ? "GPT-4.1" : "Claude"}</span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedModel("gpt-3.5");
                            }}
                            className="cursor-pointer"
                          >
                            GPT-3.5
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedModel("gpt-4.1");
                            }}
                            className="cursor-pointer"
                          >
                            GPT-4.1
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedModel("claude");
                            }}
                            className="cursor-pointer"
                          >
                            Claude
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Done Button */}
                    <div className="pt-2 border-t border-border/50">
                      <button
                        onClick={() => {
                          setIsAgentMenuOpen(false);
                          toast.success("Agent settings saved!");
                        }}
                        className="w-full px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium text-sm"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <button 
                className="p-2.5 hover:bg-secondary/50 rounded-lg transition-colors flex-shrink-0"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="flex-1 relative min-w-0 z-10" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                {/* Mountain Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex-shrink-0">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => {
                    // Delay to allow button clicks
                    setTimeout(() => {
                      if (document.activeElement !== inputRef.current) {
                        setIsInputFocused(false);
                      }
                    }, 200);
                  }}
                  placeholder="Type a prompt..."
                  rows={1}
                  className="w-full pl-12 pr-14 py-4 bg-transparent text-white placeholder:text-white/80 focus:outline-none resize-none transition-all relative z-10 overflow-y-auto"
                  style={{ 
                    minHeight: "56px", 
                    maxHeight: "120px", 
                    width: '100%', 
                    maxWidth: '100%', 
                    boxSizing: 'border-box' 
                  }}
                />
              </div>
              <div className="flex items-center gap-1 pr-2 flex-shrink-0">
                <button 
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  title="Response mode"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Auto</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-lg transition-all shadow-sm hover:shadow-md disabled:shadow-none"
                  title="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <motion.div 
              className="flex items-center justify-center text-xs text-muted-foreground/60"
              animate={{
                height: isInputFocused ? "0px" : "auto",
                opacity: isInputFocused ? 0 : 1,
                marginTop: isInputFocused ? "0px" : "8px",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <span>AEKO can make mistakes. Check important info.</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </motion.div>
    </TooltipProvider>
  );
};

export default AgentLLMPage;

