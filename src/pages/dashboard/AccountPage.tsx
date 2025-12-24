import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Key, 
  CreditCard, 
  Shield, 
  Bell, 
  Download,
  Copy,
  Eye,
  EyeOff,
  Check,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AccountPage = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText("ak_live_xxxxxxxxxxxxxxxxxxxx");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Account Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile, subscription, and preferences
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">Profile</h2>
        
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
              A
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>

          {/* Form */}
          <div className="flex-1 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue="Alex Creator"
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue="@alexcreator"
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="alex@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="hero" size="sm">Save Changes</Button>
          </div>
        </div>
      </motion.div>

      {/* Subscription Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">Subscription</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-primary/10 border border-primary/30 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-semibold text-foreground">Standard Plan</span>
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">Active</span>
            </div>
            <p className="text-sm text-muted-foreground">
              $45/month • Renews on Jan 15, 2025
            </p>
          </div>
          <Button variant="outline">Manage Plan</Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-secondary/30">
            <div className="text-2xl font-bold text-foreground">2,450</div>
            <div className="text-sm text-muted-foreground">Credits Remaining</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30">
            <div className="text-2xl font-bold text-foreground">87,432</div>
            <div className="text-sm text-muted-foreground">LLM Questions Left</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30">
            <div className="text-2xl font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Generations This Month</div>
          </div>
        </div>
      </motion.div>

      {/* API Keys Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">API Keys</h2>
        
        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
          <Key className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1 font-mono text-sm text-foreground overflow-hidden">
            {showApiKey ? "ak_live_xxxxxxxxxxxxxxxxxxxx" : "ak_live_••••••••••••••••••••"}
          </div>
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={copyApiKey}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <Button variant="outline" size="sm" className="mt-4">
          Generate New Key
        </Button>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">Billing History</h2>
        
        <div className="space-y-3">
          {[
            { date: "Dec 15, 2024", amount: "$45.00", status: "Paid" },
            { date: "Nov 15, 2024", amount: "$45.00", status: "Paid" },
            { date: "Oct 15, 2024", amount: "$45.00", status: "Paid" },
          ].map((invoice, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">{invoice.date}</div>
                  <div className="text-xs text-muted-foreground">Standard Plan</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">{invoice.amount}</span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                  {invoice.status}
                </span>
                <Download className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AccountPage;
