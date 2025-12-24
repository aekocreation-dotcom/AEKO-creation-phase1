import { motion } from "framer-motion";
import { 
  Sparkles, 
  Image, 
  Video, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const quickActions = [
  { icon: MessageSquare, label: "Chat Agent", path: "/dashboard/tools", color: "from-blue-500 to-cyan-500" },
  { icon: Image, label: "Generate Image", path: "/dashboard/tools", color: "from-purple-500 to-pink-500" },
  { icon: Video, label: "Create Video", path: "/dashboard/tools", color: "from-orange-500 to-red-500" },
];

const recentGenerations = [
  { type: "image", prompt: "Futuristic cityscape at sunset", time: "2 min ago" },
  { type: "chat", prompt: "Explain quantum computing", time: "15 min ago" },
  { type: "image", prompt: "Abstract digital art with neon colors", time: "1 hour ago" },
  { type: "video", prompt: "Cinematic ocean waves", time: "3 hours ago" },
];

const stats = [
  { label: "Generations Today", value: "24", change: "+12%", icon: Sparkles },
  { label: "Credits Used", value: "2,549", change: "51%", icon: Zap },
  { label: "This Week", value: "156", change: "+8%", icon: TrendingUp },
];

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            What would you like to create today?
          </p>
        </div>
        <Link to="/dashboard/tools">
          <Button variant="hero" className="gap-2">
            <Sparkles className="w-4 h-4" />
            New Creation
          </Button>
        </Link>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.path}>
              <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {action.label}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-primary mb-1">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Recent Generations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Generations</h2>
          <Link to="/dashboard/feed" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {recentGenerations.map((gen, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                gen.type === "image" ? "bg-purple-500/20 text-purple-400" :
                gen.type === "video" ? "bg-orange-500/20 text-orange-400" :
                "bg-blue-500/20 text-blue-400"
              }`}>
                {gen.type === "image" ? <Image className="w-5 h-5" /> :
                 gen.type === "video" ? <Video className="w-5 h-5" /> :
                 <MessageSquare className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {gen.prompt}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{gen.time}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
