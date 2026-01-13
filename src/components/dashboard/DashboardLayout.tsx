
import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  User,
  Wrench,
  HelpCircle,
  Menu,
  X,
  LogOut,
  CreditCard,
  ChevronDown,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Sun,
  Moon,
  Store,
  Library,
  Settings,
  Coins,
  Star,
} from "lucide-react";
import logoDark from "@/assets/ChatGPT Image Dec 25, 2025, 03_45_44 PM.png";
// import logoLight from "@/assets/ak-logo.png"; // Uncomment when you add the AK logo file
import { Button } from "@/components/ui/button";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Home" },
  { path: "/dashboard/feed", icon: Library, label: "Library" },
];

const toolsSubItems = [
  { path: "/dashboard/tools/agent", icon: MessageSquare, label: "Agent LLM" },
  { path: "/dashboard/tools/image", icon: ImageIcon, label: "Image" },
  { path: "/dashboard/tools/video", icon: Video, label: "Video" },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const isToolsActive = location.pathname.startsWith("/dashboard/tools");
  // Auto-open dropdown if on tools page
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(isToolsActive);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update dropdown state when location changes
  useEffect(() => {
    if (isToolsActive) {
      setToolsDropdownOpen(true);
    }
  }, [isToolsActive]);

  // Scroll to top and ensure content visibility on route change
  useEffect(() => {
    // Scroll main content area to top
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
    // Force a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    // Clear auth state (localStorage) and redirect to landing page
    authAPI.logout();
    toast.success("You have been logged out");
    // Force a full page reload to ensure clean state
    window.location.href = "/";
  };

  const user = authAPI.getCurrentUser();
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="h-screen bg-background flex w-full overflow-hidden">
      {/* Sidebar - Redesigned with Labels */}
      <TooltipProvider>
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-16 backdrop-blur-xl transform transition-transform duration-300 lg:translate-x-0 rounded-r-2xl ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            borderRadius: '16px',
          }}
        >
          {/* Animated Gradient Border */}
          <motion.div
            className="absolute inset-0 rounded-r-2xl pointer-events-none"
            style={{
              padding: '1.5px',
              background: 'linear-gradient(135deg, #7C3AED, #3B82F6, #22D3EE, #22C55E, #FACC15, #EC4899)',
              backgroundSize: '200% 200%',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* Background */}
          <div
            className="absolute inset-[1.5px] rounded-r-2xl bg-[#12162A] backdrop-blur-xl"
            style={{
              borderRadius: '14px',
            }}
          />
          <div className="flex flex-col h-full relative z-10">
            {/* Logo/Avatar */}
            <div className="flex items-center justify-center py-5 border-b border-border/50 relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/" className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center ring-2 ring-white">
                      <img 
                        src={logoDark} 
                        alt="AEKO" 
                        className="w-10 h-10 object-contain" 
                      />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>AEKO</p>
                </TooltipContent>
              </Tooltip>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation - Icon Only with Tooltips */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path === "/dashboard" && location.pathname === "/dashboard");
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all group ${
                          isActive
                            ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                        }`}
                      >
                        {/* Glow effect for active items */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-sm -z-10"
                            animate={{
                              opacity: [0.5, 0.8, 0.5],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-lg' : ''}`} />
                        </motion.div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}

              {/* AI Tools with Dropdown */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                      className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all group ${
                        isToolsActive
                          ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                      }`}
                    >
                      {/* Glow effect for active items */}
                      {isToolsActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-sm -z-10"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        <MessageSquare className={`w-5 h-5 ${isToolsActive ? 'drop-shadow-lg' : ''}`} />
                        {/* Star Icon Badge */}
                        <motion.div
                          className="absolute -top-1 -right-1"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 drop-shadow-md" />
                        </motion.div>
                      </motion.div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>AI Tools</p>
                  </TooltipContent>
                </Tooltip>
                <AnimatePresence>
                  {toolsDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-1"
                    >
                      <div className="pl-0 mt-1 space-y-1">
                        {toolsSubItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path;
                          return (
                            <Tooltip key={item.path}>
                              <TooltipTrigger asChild>
                                <Link
                                  to={item.path}
                                  onClick={() => {
                                    setSidebarOpen(false);
                                  }}
                                  className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all group ${
                                    isActive
                                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20"
                                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                                  }`}
                                >
                                  {/* Glow effect for active items */}
                                  {isActive && (
                                    <motion.div
                                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-sm -z-10"
                                      animate={{
                                        opacity: [0.5, 0.8, 0.5],
                                        scale: [1, 1.1, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    />
                                  )}
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Icon className={`w-4 h-4 ${isActive ? 'drop-shadow-lg' : ''}`} />
                                  </motion.div>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>{item.label}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Agent Store */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/dashboard/agent-store"
                    onClick={() => setSidebarOpen(false)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all group ${
                      location.pathname === "/dashboard/agent-store"
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    {/* Glow effect for active items */}
                    {location.pathname === "/dashboard/agent-store" && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-sm -z-10"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Store className={`w-5 h-5 ${location.pathname === "/dashboard/agent-store" ? 'drop-shadow-lg' : ''}`} />
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Agent Store</p>
                </TooltipContent>
              </Tooltip>

              {/* Divider */}
              <div className="h-px bg-border/50 my-2" />

              {/* Settings */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/dashboard/account"
                    onClick={() => setSidebarOpen(false)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all group ${
                      location.pathname === "/dashboard/account"
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    {/* Glow effect for active items */}
                    {location.pathname === "/dashboard/account" && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-sm -z-10"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Settings className={`w-5 h-5 ${location.pathname === "/dashboard/account" ? 'drop-shadow-lg' : ''}`} />
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </nav>

            {/* Bottom Section */}
            <div className="px-2 pb-2 space-y-1 border-t border-border/50 pt-2 mt-auto">
              {/* Currency Display */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer group"
                  >
                    <div className="relative">
                      {/* Animated gradient coins */}
                      <motion.div
                        className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-card"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 border-2 border-card"
                        animate={{
                          rotate: [360, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Coins className="w-4 h-4 text-foreground relative z-10 drop-shadow-md group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>142 Credits</p>
                </TooltipContent>
              </Tooltip>

              {/* Upgrade Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/dashboard/account"
                      onClick={() => setSidebarOpen(false)}
                      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all shadow-lg hover:shadow-xl overflow-hidden group"
                    >
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          backgroundSize: '200% 100%',
                        }}
                      />
                      <CreditCard className="w-5 h-5 relative z-10 drop-shadow-lg" />
                    </Link>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Upgrade</p>
                </TooltipContent>
              </Tooltip>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-secondary/30 transition-all group"
                      >
                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-xs shadow-lg ring-2 ring-purple-500/30">
                          {userInitial}
                        </div>
                      </motion.button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Account</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/account" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>
      </TooltipProvider>

      {/* Main Content */}
      <div className="flex-1 lg:ml-16 overflow-x-hidden flex flex-col h-screen">
        {/* Mobile Menu Button - Floating */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-card border border-border shadow-lg text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Content */}
        <main className="p-1 lg:p-2 flex-1 flex flex-col relative overflow-hidden" key={location.pathname}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
