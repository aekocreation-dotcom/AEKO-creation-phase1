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
import { authAPI } from "@/lib/api";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Dashboard" },
  { path: "/dashboard/feed", icon: Compass, label: "Feed" },
  { path: "/dashboard/support", icon: HelpCircle, label: "Support" },
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

  return (
    <div className="min-h-screen bg-background flex w-full overflow-x-hidden" style={{ maxWidth: '90vw', margin: '0 auto' }}>
      {/* Sidebar - Icon Only with Tooltips */}
      <TooltipProvider>
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-16 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center py-5 border-b border-border relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/" className="flex items-center justify-center">
                    <img 
                      src={logoDark} 
                      alt="AEKO" 
                      className="w-10 h-10 object-contain" 
                    />
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
            <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto">
              {/* 1. Dashboard */}
              {navItems.filter(item => item.path === "/dashboard").map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                          isActive
                            ? "gradient-active-nav text-foreground"
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

              {/* 2. Feed */}
              {navItems.filter(item => item.path === "/dashboard/feed").map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                          isActive
                            ? "gradient-active-nav text-foreground"
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

              {/* 3. AI Tools with Dropdown */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                        isToolsActive
                          ? "bg-pink-500/20 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                      }`}
                    >
                      <Wrench className="w-5 h-5" />
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
                                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                                    isActive
                                      ? "gradient-active-nav text-foreground"
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

              {/* 4. Agent Store */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/dashboard/agent-store"
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                      location.pathname === "/dashboard/agent-store"
                        ? "bg-pink-500/20 text-foreground"
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

              {/* 5. Support */}
              {navItems.filter(item => item.path === "/dashboard/support").map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                          isActive
                            ? "gradient-active-nav text-foreground"
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
            </nav>

            {/* Bottom Actions */}
            <div className="px-2 pb-2 space-y-1 border-t border-border/50 pt-2 mt-auto">
              {/* Theme Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all"
                    title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{theme === "dark" ? "Light Mode" : "Dark Mode"}</p>
                </TooltipContent>
              </Tooltip>

              {/* Upgrade Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/dashboard/account"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all"
                  >
                    <CreditCard className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Upgrade</p>
                </TooltipContent>
              </Tooltip>

              {/* Account Icon */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/dashboard/account"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium text-sm">
                      A
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Account</p>
                </TooltipContent>
              </Tooltip>

              {/* Logout */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
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
