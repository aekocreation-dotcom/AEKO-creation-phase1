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

  const handleLogout = () => {
    // Clear auth state (localStorage) and redirect to landing page
    authAPI.logout();
    toast.success("You have been logged out");
    navigate("/");
  };

  const user = authAPI.getCurrentUser();
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-background flex w-full overflow-x-hidden">
      {/* Sidebar - Redesigned with Labels */}
      <TooltipProvider>
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-16 bg-card/95 backdrop-blur-xl border-r border-border/50 transform transition-transform duration-300 lg:translate-x-0 rounded-r-2xl ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
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
                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                          isActive
                            ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
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
                      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                        isToolsActive
                          ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                      }`}
                    >
                      <MessageSquare className="w-5 h-5" />
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
                                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                                    isActive
                                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30"
                                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
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
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      location.pathname === "/dashboard/agent-store"
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <Store className="w-5 h-5" />
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
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      location.pathname === "/dashboard/account"
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-foreground ring-2 ring-purple-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <Settings className="w-5 h-5" />
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl">
                    <div className="relative">
                      <div className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-card" />
                      <div className="absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 border-2 border-card" />
                      <Coins className="w-4 h-4 text-foreground relative z-10" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>142 Credits</p>
                </TooltipContent>
              </Tooltip>

              {/* Upgrade Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/dashboard/account"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all shadow-lg hover:shadow-xl"
                  >
                    <CreditCard className="w-5 h-5" />
                  </Link>
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
                      <button className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-secondary/30 transition-all">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-xs">
                          {userInitial}
                        </div>
                      </button>
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
      <div className="flex-1 lg:ml-16 overflow-x-hidden">
        {/* Mobile Menu Button - Floating */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-card border border-border shadow-lg text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Content */}
        <main className="p-1 lg:p-2">
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
